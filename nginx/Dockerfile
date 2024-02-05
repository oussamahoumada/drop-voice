FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./SSL-cert/_.drop-app.fr_ssl_certificate_INTERMEDIATE.pem /etc/nginx/_.drop-app.fr_ssl_certificate_INTERMEDIATE.pem
COPY ./SSL-cert/_.drop-app.fr_private_key.pem /etc/nginx/_.drop-app.fr_private_key.pem
COPY ./SSL-cert/drop-app.fr_ssl_certificate.pem /etc/nginx/drop-app.fr_ssl_certificate.pem

COPY --from=build /dist/src/app/dist/my-docker-angular-app /usr/share/nginx/h