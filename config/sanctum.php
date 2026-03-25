<?php

use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Laravel\Sanctum\Http\Middleware\AuthenticateSession;

$statefulHostsFromUrl = static function (string $url): array {
    $url = trim($url);
    if ($url === '') {
        return [];
    }

    $parts = parse_url($url);
    if (empty($parts['host'])) {
        return [];
    }

    $host = $parts['host'];
    $port = isset($parts['port']) ? (int) $parts['port'] : null;

    $hosts = [$host];
    if ($port !== null && ! in_array($port, [80, 443], true)) {
        $hosts[] = "{$host}:{$port}";
    }

    return $hosts;
};

$statefulDefaults = array_values(array_unique(array_filter(array_merge(
    ['localhost', 'localhost:3000', '127.0.0.1', '127.0.0.1:8000', '::1'],
    $statefulHostsFromUrl((string) env('APP_URL', '')),
    $statefulHostsFromUrl((string) env('FRONTEND_URL', '')),
))));

$statefulFromEnv = array_filter(array_map('trim', explode(',', (string) env('SANCTUM_STATEFUL_DOMAINS', ''))));

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    | Hosts from APP_URL and FRONTEND_URL are merged automatically so deploys
    | work when SANCTUM_STATEFUL_DOMAINS is unset (e.g. Coolify + same host).
    |
    */

    'stateful' => array_values(array_unique(array_merge($statefulDefaults, $statefulFromEnv))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. This will override any values set in the token's
    | "expires_at" attribute, but first-party sessions are not affected.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Sanctum can prefix new tokens in order to take advantage of numerous
    | security scanning initiatives maintained by open source platforms
    | that notify developers if they commit tokens into repositories.
    |
    | See: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
    |
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'authenticate_session' => AuthenticateSession::class,
        'encrypt_cookies' => EncryptCookies::class,
        'validate_csrf_token' => PreventRequestForgery::class,
    ],

];
