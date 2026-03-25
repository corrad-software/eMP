# syntax=docker/dockerfile:1
# eMP: Laravel 13 API + Vue 3 SPA (Vite) — satu imej, Nginx + PHP-FPM
# Build: docker build -t emp .
# Build dengan URL API eksplisit: docker build --build-arg VITE_API_BASE_URL=https://emp.sena.my -t emp .

# ── Stage 1: frontend ─────────────────────────────────────────────────────
FROM node:22-alpine AS frontend

WORKDIR /app/client

COPY client/package.json client/package-lock.json ./
RUN npm ci

COPY client/ ./

# Optional: set semasa build jika API di domain lain. Kosong = same-origin (lihat client/src/env.ts)
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build

# ── Stage 2: runtime ────────────────────────────────────────────────────────
# Lock file memerlukan PHP >= 8.4 (Laravel 13 / dependencies terkini)
FROM php:8.4-fpm-alpine AS runtime

RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    linux-headers \
    $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache \
    && apk del $PHPIZE_DEPS \
    && rm -rf /tmp/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Composer (tanpa dev)
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --optimize-autoloader

# Aplikasi
COPY . .
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache \
        storage/logs storage/app/public bootstrap/cache \
    && rm -f bootstrap/cache/*.php 2>/dev/null || true

# Hasil Vite → public (bersama index.php Laravel)
COPY --from=frontend /app/client/dist/index.html /var/www/html/public/index.html
COPY --from=frontend /app/client/dist/assets /var/www/html/public/assets

RUN composer dump-autoload --optimize --classmap-authoritative --no-dev

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache

COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV PORT=80
EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
