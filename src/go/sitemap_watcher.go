package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/fsnotify/fsnotify"
)

// Configuration
var extensions = []string{
	"ts", "js", "jsx", "tsx", "md", "css", "html", "json", "jsonc", "mts",
	"jpg", "png", "svg", "gif", "mp4", "sh", "bash",
}

func isValidExtension(ext string) bool {
	ext = strings.TrimPrefix(ext, ".")
	for _, validExt := range extensions {
		if ext == validExt {
			return true
		}
	}
	return false
}
func generateFS(cwd, outputFilePath string) {
	// Construct the `find` command arguments
	findArgs := []string{"src"}
	for index, ext := range extensions {
		var fuckgo string = "-o"
		if index == 0 {
			fuckgo = ""
		}
		findArgs = append(findArgs, fuckgo, "-name", fmt.Sprintf("'*.%s'", ext))
	}
	findArgs = append(findArgs, "-o", "-type", "d")

	// Create the command
	cmd := exec.Command("bash", "-c", "find src -name '*.ts' -o -name '*.js' -o -name '*.jsx' -o -name '*.tsx' -o -name '*.md' -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.jsonc' -o -name '*.mts' -o -name '*.jpg' -o -name '*.png' -o -name '*.svg' -o -name '*.gif' -o -name '*.mp4' -o -name '*.sh' -o -name '*.bash' -o -type d")

	// Capture stdout and stderr
	output, err := cmd.CombinedOutput()
	fmt.Println(strings.Join(findArgs, " "))
	if err != nil {
		// fmt.Println("Error running find command:", err)
		// fmt.Println("Command output:", string(output)) // Print detailed error message
		return
	}

	// Process output
	files := strings.Split(strings.TrimSpace(string(output)), "\n")
	fmt.Println("Files found:", files) // Debugging: Print found files

	fsRecord := make(map[string]string)
	for _, filePath := range files {
		if filePath == "" {
			continue
		}
		relPath, _ := filepath.Rel(cwd, filePath)
		fsRecord[relPath] = fmt.Sprintf("<FUN>() => Deno.readTextFileSync('%s')</FUN>", filePath)
	}

	writeFSToFile(fsRecord, outputFilePath)
}

func writeFSToFile(record map[string]string, outputFilePath string) {
	// Constructing TS output
	tsContent := "export const FS = " + toJSONString(record) + " as const;\n"
	tsContent += `
export type FILESYSTEM = typeof FS;

export const SITEMAP = {
  startsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.startsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
    { [K in keyof FILESYSTEM as K extends ` + "`" + `${T}${string}` + "`" + `? K : never]: FILESYSTEM[K] }
  >[],
  endsWith: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.endsWith(it)).map(i => i[1])
  ) as unknown as Imploder<
		{ [K in keyof FILESYSTEM as K extends ` + "`" + `${string}${T}` + "`" + `? K : never]: FILESYSTEM[K] }
  >[],
  includes: <T extends string>(it: T) => (
    Object.entries(FS).filter(([k, v]) => k.includes(it)).map(i => i[1])
  ) as unknown as Imploder<
    { [K in keyof FILESYSTEM as K extends ` + "`" + `${string}${T}${string}` + "`" + `? K : never]: FILESYSTEM[K]
  >[]
};
`

	if existingData, err := os.ReadFile(outputFilePath); err == nil && string(existingData) == tsContent {
		fmt.Println("Nah, these files are the same I think")
		return
	}

	fmt.Println("Need to rewrite SITEMAP")
	_ = os.WriteFile(outputFilePath, []byte(tsContent), 0644)
}

func toJSONString(record map[string]string) string {
	var sb strings.Builder
	sb.WriteString("{\n")
	for k, v := range record {
		sb.WriteString(fmt.Sprintf("  \"%s\": \"%s\",\n", k, v))
	}
	sb.WriteString("}\n")
	return sb.String()
}

func watchSrcDir(cwd, outputFilePath string) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		fmt.Println("Error creating watcher:", err)
		return
	}
	defer watcher.Close()

	srcPath := filepath.Join(cwd, "src")
	_ = watcher.Add(srcPath)

	var mu sync.Mutex
	var lastRun time.Time

	for {
		select {
		case event, ok := <-watcher.Events:
			if !ok {
				return
			}
			if event.Op&(fsnotify.Create|fsnotify.Remove|fsnotify.Rename|fsnotify.Write) != 0 {
				if isValidExtension(filepath.Ext(event.Name)) {
					mu.Lock()
					if time.Since(lastRun) > 100*time.Millisecond {
						lastRun = time.Now()
						go generateFS(cwd, outputFilePath)
					}
					mu.Unlock()
				}
			}
		case err, ok := <-watcher.Errors:
			if !ok {
				return
			}
			fmt.Println("Watcher error:", err)
		}
	}
}

func main() {
	cwd, _ := os.Getwd()
	outputFilePath := filepath.Join(cwd, "src", "SITEMAP.deno.ts")

	go generateFS(cwd, outputFilePath)
	watchSrcDir(cwd, outputFilePath)
}
