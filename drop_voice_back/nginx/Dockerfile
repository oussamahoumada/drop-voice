FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./SSL-cert/_.drop-app.fr_ssl_certificate_INTERMEDIATE.cer /etc/nginx/_.drop-app.fr_ssl_certificate_INTERMEDIATE.cer
COPY ./SSL-cert/_.drop-app.fr_private_key.key /etc/nginx/_.drop-app.fr_private_key.key
COPY ./SSL-cert/drop-app.fr_ssl_certificate.cer /etc/nginx/drop-app.fr_ssl_certificate.cer
