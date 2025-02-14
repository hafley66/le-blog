# Env
1. things i added to nginx
```nginx
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  server_name _;

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }
}

# !!!! IMPORTANT !!!!
# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#     listen 80;
#     listen [::]:80;
#
#     server_name example.com;
#
#     root /var/www/example.com;
#     index index.html;
#
#     location / {
#     try_files $uri $uri/ =404;
#     }
#}

server {
  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;
  server_name hafley.codes www.hafley.codes; # managed by Certbot
  location / {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE";
    add_header Access-Control-Allow-Headers "Authorization, Content-Type";

    # Handle preflight (OPTIONS requests)
    if ($request_method = OPTIONS) {
      return 204;
    }

    try_files $uri $uri/ =404;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/hafley.codes/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/hafley.codes/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
  if ($host = www.hafley.codes) {
    return 301 https://$host$request_uri;
  } # managed by Certbot


  if ($host = hafley.codes) {
    return 301 https://$host$request_uri;
  } # managed by Certbot


  listen 80 ;
  listen [::]:80 ;
  server_name hafley.codes www.hafley.codes;
  return 404; # managed by Certbot
}
```

2. Add certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d hafley.codes -d www.hafley.codes
```

```bash
apt-get install libnss3 \
         libnspr4 \
         libatk1.0-0t64 \
         libatk-bridge2.0-0t64 \
         libcups2t64 \
         libx11-6 \
         libxcomposite1 \
         libxdamage1 \
         libxext6 \
         libxfixes3 \
         libxrandr2 \
         libgbm1 \
         libxcb1 \
         libpango-1.0-0 \
         libcairo2 \
         libasound2t64 \
         libatspi2.0-0t64
```
