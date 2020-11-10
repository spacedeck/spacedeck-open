
# Apache as reverse proxy

Once spacedeck is running you can use Apache as a reverse proxy. For a general overview of how this works or how to configure specifics the [Apache Reverse Proxy Guide](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) provides a good reference.

If you have the required modules and ssl certificates installed skip to the site config.

# Required modules

Install `mod_rewrite`, `mod_proxy` and `mod_proxy_wstunnel`…

```
sudo a2enmod proxy rewrite proxy_wstunnel
```

# SSL certificates

Set up `certbot` frmo [letsencrypt](https://letsencrypt.org/) (if required) and get some certs…

```
sudo certbot --apache certonly -n -d space.example.net
```

# Site config

This config should work with Apache 2.4 and assumes spacedeck is running on localhost using port 9666, that `mod_rewrite`, `mod_proxy` and `mod_proxy_wstunnel` are active, and that ssl certificates have been installed with `certbot`.


```
<VirtualHost *:443>
  ServerName space.example.net
  ServerAdmin webmaster@space.example.net

  ErrorLog /var/log/apache2/spacedeck-error.log
  CustomLog /var/log/apache2/spacedeck-access.log combined

  # ssl options
  Include /etc/letsencrypt/options-ssl-apache.conf
  SSLCertificateFile /etc/letsencrypt/live/space.example.net/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/space.example.net/privkey.pem

  # proxy spacedeck
  RewriteEngine On
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)           ws://localhost:9666/$1 [P,L]
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)           http://localhost:9666/$1 [P,L]

  ProxyPassReverse / http://localhost:9666/
</VirtualHost>
```
