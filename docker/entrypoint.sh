#!/bin/sh
set -e

cd /var/www/html

# Pastikan izin storage (volume mount mungkin ubah pemilik)
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
chmod -R ug+rwx storage bootstrap/cache 2>/dev/null || true

php artisan package:discover --ansi 2>/dev/null || true

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

php artisan storage:link 2>/dev/null || true

exec "$@"
