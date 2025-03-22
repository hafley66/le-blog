# brew install oxipng # lossless
# brew install pngquant # lossy

stack-overflow-homie() {
  ref="$1"
  convert -depth 24 -size 200x200 xc:red gradient:black-white \( xc:white +noise random \) +append $ref
  convert $ref $ref.ppm
  for f in {0..5}; do
    for l in {0..9}; do
        for s in {0..4}; do
          outfile="out_${f}_${l}_${s}.png"
          convert $ref -define png:compression-filter=$f -define png:compression-level=$l -define png:compression-strategy=$s "$outfile"
          size=$(OSXFileSize "$outfile")
          echo filter:$f, level:$l, strategy:$s, size:$size
          convert "$outfile" "$outfile.ppm"
          diff "$outfile.ppm" $ref.ppm
        done
    done
  done
}

oxipng -o max --strip all --recursive --dir ./temp ./src

to-webp() {
  #! /bin/bash
 
# Encode a screen recording for the web as WebM/MP4 and print the aspect-ratio
# Example usage:
# my-script.sh -i my_input -o my_output -w "1024"
 
  # Read the input args
  input="input"
  output="output"
  width="1280"
  
  while getopts ":i:o:w:" opt; do
    case $opt in
      i) input="$OPTARG"
      ;;
      o) output="$OPTARG"
      ;;
      w) width="$OPTARG"
      ;;
      \?) echo "Invalid option -$OPTARG" >&2
      ;;
    esac
  done
  
  # WebM VP9 encoding (in two pass)
  # This pass just creates a log file (ignore the warning at the end of it)
  ffmpeg -i "${input}.mov" \
    -y \
    -vf "scale=${width}:trunc(ow/a/2)*2" \
    -c:v libvpx-vp9 -pass 1 -b:v 1000K -threads 1 -speed 4 \
    -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
    -g 9999 -aq-mode 0 -an -f webm /dev/null
  # This pass uses the log file to generate output.webm
  ffmpeg -i "${input}.mov" \
    -y \
    -vf "scale=${width}:trunc(ow/a/2)*2" \
    -c:v libvpx-vp9 -pass 2 -b:v 1000K -threads 1 -speed 0 \
    -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
    -g 9999 -aq-mode 0 -c:a libopus -b:a 64k -f webm "${output}.webm"
  # Delete the generated log file
  rm ffmpeg*.log
  
  # MP4 H.264 encoding
  ffmpeg -i "${input}.mov" -vf "scale=${width}:trunc(ow/a/2)*2" -y "${output}.mp4"
  
  # Print the aspect ratio
  echo "scale=10;$( \
    ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${output}.mp4 \
    | sed -r 's/x/ \/ /g')" \
    | bc \
    | ( \
      read aspect_ratio; \
      echo -e "\nAspect ratio: ${aspect_ratio}" \
      );
}
