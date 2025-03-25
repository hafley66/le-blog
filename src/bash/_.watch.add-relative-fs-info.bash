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

        case "$extension" in
            ts|tsx|js|jsx)
                publicPath="publicPath: '${publicPath}',";
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
    -o -name 'index.render.deno.tsx' \
    -o -name 'index.render.deno.ts' \
  )


  if [[ "$prevString" != "$filesString" ]]; then
      echo "Buildiong"
      stringBuilder=""
      finale=""
      echo "A-${#stringBuilder}"
      while IFS= read -r file; do
        last_import_line=$(grep -n "^import" | tail -n 1 | cut -d: -f1)
        grep -n "const DIR"  ./src/lib/0_Layout.dual.tsx
        if [ ! $file =~ DIRNAME ]
          stringBuilder+=$'\n'"$(_.watch.sitemap.get_file_metadata $file)"

          stringToRender=$(echo -e "$finale" | sed '/^$/d') # Remove empty lines
          echo "Writing..."
          biome=$(realpath "$SCRIPT_DIR/../..")
          wtf=$(echo "$stringToRender" | "$biome/node_modules/.bin/biome" format --stdin-file-path=file.ts)

          # brew install flock # holy shit it just works(TM)
          flock /tmp/my2.lock echo "$wtf" > src/SITEMAP.deno.ts
          prevString="$filesString"
      done <<< "$filesString"
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
