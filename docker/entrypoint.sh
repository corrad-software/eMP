#!/bin/sh
set -e

cd /var/www/html

LISTEN_PORT="${PORT:-80}"
if [ -f /etc/nginx/templates/default.conf ]; then
  mkdir -p /etc/nginx/http.d
  sed "s/__PORT__/${LISTEN_PORT}/g" /etc/nginx/templates/default.conf > /etc/nginx/http.d/default.conf
fi

# Pastikan izin storage (volume mount mungkin ubah pemilik)
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
chmod -R ug+rwx storage bootstrap/cache 2>/dev/null || true

php artisan package:discover --ansi 2>/dev/null || true

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

php artisan storage:link 2>/dev/null || true

exec "$@"
