#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )


_.watch.sitemap.get_file_metadata() {
    it="$(pwd)"
    local filePath="$1"
    local relativePath="${filePath#*}"  # Assume relative to current directory
    # local rootPath="${filePath#*}"
    local filename=""
    local dirname=""
    local extension=""
    local super_extension=""
    local importPath=""
    local readSync=""
    local dynamicImport=""
    local publicPath=""
    local linkTag=""

    local yee=$(pwd)
    local markdownDemo=""
    local frontendDemo=""
    # echo $yee

    if [[ -d "$filePath" ]]; then
        return
    else
        isDirectory=false
        filename=$(basename -- "$filePath")
        dirname=$(dirname -- "$filePath")
        extension="${filename##*.}"
        super_extension="${filename#*.}"
        importPath="${relativePath/src/'~'}"
        publicPath="/${relativePath/src\//}"
        readSync="readSync: () => readFileSync('$filePath').toString(),"

        case "$extension" in
            ts|tsx|js|jsx)
                dynamicImport="dynamicImport: () => import('$importPath'),";
                linkTag="linkTag: () => \"<script type='module' src='$publicPath'></script>\",";
                markdownDemo="markdownDemo: (diffName = '$filename') => \
\`
~~~$extension
// @@filename \${diffName}
// @eval
\${readFileSync('$filePath').toString()}
~~~


<script type='module' src='$publicPath' demo-for='$filename'></script>


\`,";
                frontendDemo="frontendDemo: (diffName = '$filename') => \
\`
~~~$extension
// @@filename \${diffName}
// @@src $publicPath
\${readFileSync('$filePath').toString()}
~~~


<script type='module' src='$publicPath' demo-for='$filename'></script>


\`,";
                publicPath="publicPath: '${publicPath}',";
                ;;
            css)
                linkTag="linkTag: () => \"<link rel='stylesheet' href='$publicPath'/>\",";
                publicPath="publicPath: '${publicPath}',";
                ;;
            png|jpeg|jpg|gif)
                linkTag="imgTag: (alt: string) => \`<img alt=\"\${alt}\" src='$publicPath' />\`,";
                publicPath="publicPath: '${publicPath}',";
                ;;
            *)
              publicPath="public: '${publicPath}',";
              ;;
        esac
    fi

        
    echo "\
  '$relativePath': {
      'path': '$relativePath',
      'filename': '${filename:-null}',
      'dirname': '${dirname:-null}',
      'super_extension': '${super_extension:-null}',
      'extension': '${extension:-null}',
      'importPath': '$importPath',
      $readSync
      $dynamicImport
      $linkTag
      $publicPath
      $markdownDemo
      $frontendDemo
  },
  "
}


prevString=""
_.watch.sitemap.check() {
  filesString=$(find ${1:-src} \
    -not -path '*/temp/*' \
    -not -name '*.vite.html' \
    \( -name '*.ts' \
    -o -name '*.js' \
    -o -name '*.jsx' \
    -o -name '*.tsx' \
    -o -name '*.md' \
    -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.jsonc' -o -name '*.mts' -o -name '*.jpg' -o -name '*.png' -o -name '*.svg' -o -name '*.gif' -o -name '*.mp4' -o -name '*.sh' -o -name '*.bash' \
    \) )  # Get the list of files


  if [[ "$prevString" != "$filesString" ]]; then
      echo "Buildiong"
      stringBuilder=""
      finale=""
      echo "A-${#stringBuilder}"
      while IFS= read -r file; do
          stringBuilder+=$'\n'"$(_.watch.sitemap.get_file_metadata $file)"
      done <<< "$filesString"
      echo "B-${#stringBuilder}"

      finale+="\

import { readFileSync } from 'node:fs';

      type Imploder<T> = T[keyof T];

      export const FS = {
      $stringBuilder
      } as const;

      export type FILESYSTEM = typeof FS;

      export const SITEMAP = {
      startsWith: <T extends string>(it: T) => (
        Object.entries(FS).filter(([k, v]) => k.startsWith(it)).map(i => i[1])
      ) as unknown as Imploder<
        {
          [
            K in keyof FILESYSTEM as K extends \`\${T}\${string}\` ? K : never
          ]: FILESYSTEM[K];
        }
      >[],
      endsWith: <T extends string>(it: T) => (
        Object.entries(FS).filter(([k, v]) => k.endsWith(it)).map(i => i[1])
      ) as unknown as Imploder<
        {
          [
            K in keyof FILESYSTEM as K extends \`\${string}\${T}\` ? K : never
          ]: FILESYSTEM[K];
        }
      >[],
      includes: <T extends string>(it: T) => (
        Object.entries(FS).filter(([k, v]) => k.includes(it)).map(i => i[1])
      ) as unknown as Imploder<
        {
          [
            K in keyof FILESYSTEM as K extends \`\${string}\${T}\${string}\` ? K : never
          ]: FILESYSTEM[K];
        }
      >[],
      subFolder: <T extends string>(it: T) => {
        return Object.fromEntries(
          Object.entries(FS)
            .filter(([k, v]) => k.startsWith(it))
            .map(i => [i[0].replace(it, \"\"), i[1]] as const),
          ) as unknown as {
            [K in keyof FILESYSTEM as K extends \`\${T}\${infer U}\`
              ? U
              : never]: FILESYSTEM[K]
          }
        },
      };
      "
      # brew install flock
      stringToRender=$(echo -e "$finale" | sed '/^$/d') # Remove empty lines
      echo "Writing..."
      biome=$(realpath "$SCRIPT_DIR/../..")
      wtf=$(echo "$stringToRender" | "$biome/node_modules/.bin/biome" format --stdin-file-path=file.ts)

      flock /tmp/my.lock echo "$wtf" > src/SITEMAP.deno.ts
      prevString="$filesString"
  fi
}

_.watch.sitemap() {
  if [ -z $1 ]; then
    while true; do
      _.watch.sitemap.check
      sleep 1
    done
  fi
}


