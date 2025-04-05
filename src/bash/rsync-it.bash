#!/usr/bin/env bash
export LE_BLOG=~/projects/le-blog/dist/
export LE_BLOG_TARGET=/var/www/html/

_.blog.sync.watch() {
  fswatch -o $LE_BLOG | while read;
    do _.blog.sync
  done;
}

_.blog.sync() {
  rsync \
    --progress \
    -avz \
    $LE_BLOG root@hafley.codes:$LE_BLOG_TARGET
}
