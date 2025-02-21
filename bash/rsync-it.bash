#!/usr/bin/env bash
export LE_BLOG=~/projects/le-blog/ # christ the trailing slash is important
export LE_BLOG_TARGET=/var/www/html

_.blog.sync.watch() {
  fswatch -o $LE_BLOG | while read;
    do _.blog.sync
  done;
}

_.blog.sync() {
  rsync \
    --include index.html \
    --include dist/ \
    --include package.json \
    --include src/ \
    --include scripts/ \
    --include package-lock.json \
    --include public/ \
    --exclude node_modules/ \
    --exclude .git/ \
    --progress \
    -avz \
    $LE_BLOG root@hafley.codes:$LE_BLOG_TARGET
}
_.blog.sync.parallel() {
  (sleep 3 && echo "[1] $(ls -la)" | sed 's/^/[1] /') &
  (sleep 2 && echo "[2] $(pwd)" | sed 's/^/[2] /') &
  wait
}
