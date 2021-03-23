# Nginx as reverse proxy

Below theres an example of how the site configuration for nginx as a reverse proxy can look like:

```
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
}

server {
        listen 80;
        listen [::]:80;

        server_name spacedeck.domain.de

        return 301 https://$server_name$request_uri;
}

server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        ssl on;

        server_name                             spacedeck.domain.de;

        ssl_certificate                 /etc/ssl/spacedeck.domain.de.cer;
        ssl_certificate_key             /etc/ssl/spacedeck.domain.de.key;

        include ssl_params;

        charset utf-8;
        client_max_body_size 50m;

        add_header Content-Security-Policy "default-src https: wss:; script-src https: 'unsafe-inline' 'unsafe-eval'; style-src https: 'unsafe-inline'";
        add_header X-XSS-Protection "1; mode=block;";
        add_header Referrer-Policy "no-referrer";

        location / {
                proxy_pass http://127.0.0.1:9666;
                proxy_set_header X-Forwarded-For $remote_addr;
        }

        location /socket {
                proxy_pass http://127.0.0.1:9666;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Upgrade $http_upgrade;
                proxy_http_version 1.1;
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```
