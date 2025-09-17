<<<<<<< HEAD
<?php
header("Content-Type: application/xml; charset=utf-8");

// Change this to your site URL
$baseUrl = "https://www.gypsy-international.com";

// Store URLs
$urls = [];

/**
 * Predefined routes (clean URLs only)
 */
$routes = [
    '/'           => 'index.html',
    '/home'       => 'app/webpages/home.html',
    '/aboutUs'    => 'app/webpages/about.html',
    '/contactUs'  => 'app/webpages/contactUs.html',
    '/services'   => 'app/webpages/services.html',
    '/newupdates' => 'app/webpages/newupdates.html',
];

// Exclude unwanted pages
$exclude = ['404', 'default', 'sitedown'];

/**
 * Get last modified date from file, fallback if unavailable
 */
function getLastModified($filePath)
{
    if (!file_exists($filePath)) {
        return date('Y-m-d'); // fallback if file doesn't exist
    }
    return date('Y-m-d', filemtime($filePath));
}

// Only use predefined clean routes
foreach ($routes as $route => $filePath) {
    // Skip excluded pages
    foreach ($exclude as $skip) {
        if (stripos($route, $skip) !== false) {
            continue 2;
        }
    }

    $urls[] = [
        'loc' => rtrim($baseUrl, '/') . $route,
        'lastmod' => getLastModified($filePath)
    ];
}

// Remove duplicates
$urls = array_map("unserialize", array_unique(array_map("serialize", $urls)));

// Output XML
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($urls as $url): ?>
<url>
    <loc><?= htmlspecialchars($url['loc'], ENT_QUOTES) ?></loc>
    <lastmod><?= $url['lastmod'] ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
<?php endforeach; ?>
</urlset>
=======
<?php
header("Content-Type: application/xml; charset=utf-8");

// Change this to your site URL
$baseUrl = "https://www.gypsy-international.com";

// Store URLs
$urls = [];

/**
 * Predefined routes (clean URLs only)
 */
$routes = [
    '/'           => 'index.html',
    '/home'       => 'app/webpages/home.html',
    '/aboutUs'    => 'app/webpages/about.html',
    '/contactUs'  => 'app/webpages/contactUs.html',
    '/services'   => 'app/webpages/services.html',
    '/newupdates' => 'app/webpages/newupdates.html',
];

// Exclude unwanted pages
$exclude = ['404', 'default', 'sitedown'];

/**
 * Get last modified date from file, fallback if unavailable
 */
function getLastModified($filePath)
{
    if (!file_exists($filePath)) {
        return date('Y-m-d'); // fallback if file doesn't exist
    }
    return date('Y-m-d', filemtime($filePath));
}

// Only use predefined clean routes
foreach ($routes as $route => $filePath) {
    // Skip excluded pages
    foreach ($exclude as $skip) {
        if (stripos($route, $skip) !== false) {
            continue 2;
        }
    }

    $urls[] = [
        'loc' => rtrim($baseUrl, '/') . $route,
        'lastmod' => getLastModified($filePath)
    ];
}

// Remove duplicates
$urls = array_map("unserialize", array_unique(array_map("serialize", $urls)));

// Output XML
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($urls as $url): ?>
<url>
    <loc><?= htmlspecialchars($url['loc'], ENT_QUOTES) ?></loc>
    <lastmod><?= $url['lastmod'] ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
<?php endforeach; ?>
</urlset>
>>>>>>> a31d128d62e35c539c63cab6e6f7400cc465dd2a
