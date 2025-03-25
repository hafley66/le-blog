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
    local clazz='Path'
    # echo $yee

    if [[ $1 =~ 'DS_Store' ]]; then
      return
    fi

    if [[ -d "$filePath" ]]; then
        echo "\
import { SITEMAP } from '~/SITEMAP.deno.ts'

export const SUB = SITEMAP.subFolder('$filePath/')
" > "$filePath/SITEMAP.deno.ts"
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
                dynamicImport=", () => import('$importPath')";
                clazz='JSPath'
                ;;
            css)
                ;;
            png|jpeg|jpg|gif)
                ;;
            *)
              ;;
        esac
    fi

    echo "\
    '$relativePath': new $clazz('$relativePath', '$dirname', '$filename', '$extension'$dynamicImport),
    "
    

  # echo "\
  # '$relativePath': {
  #     'path': '$relativePath',
  #     'filename': '${filename:-null}',
  #     'dirname': '${dirname:-null}',
  #     'super_extension': '${super_extension:-null}',
  #     'extension': '${extension:-null}',
  #     'importPath': '$importPath',
  #     $readSync
  #     $dynamicImport
  #     $linkTag
  #     $publicPath
  #     $markdownDemo
  #     $frontendDemo
  # },
  # "
}


prevString=""
_.watch.sitemap.check() {
  filesString=$(find ${1:-src} \
    -not -path '*/temp/*' \
    -not -name '*.vite.html' \
    -not -name '*DS_store*' \
    -not -name '*SITEMAP.deno*' \
    \( -name '*.ts' \
    -o -name '*.js' \
    -o -name '*.jsx' \
    -o -name '*.tsx' \
    -o -name '*.md' \
    -o -name '*.css' \
    -o -name '*.html' \
    -o -name '*.json' \
    -o -name '*.jsonc' \
    -o -name '*.mts' \
    -o -name '*.jpg' \
    -o -name '*.png' \
    -o -name '*.svg' \
    -o -name '*.gif' \
    -o -name '*.mp4' \
    -o -name '*.sh' \
    -o -name '*.bash' \
    -o -d \
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

import {Path, JSPath, SITEMAP_PART} from './lib/path_helpers.deno.ts';
      export const FS = {
      $stringBuilder
      } as const;

export type FILESYSTEM = typeof FS;
export type FILESYSTEM = typeof FS
export const SITEMAP = new SITEMAP_PART<FILESYSTEM>(FS)

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


