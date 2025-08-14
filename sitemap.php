<?php
header("Content-Type: application/xml; charset=utf-8");

// Change this to your site URL
$baseUrl = "https://www.gypsy-international.com";

// Root directory to scan
$directory = __DIR__;

// Allowed file extensions
$extensions = ['html', 'php'];

// Store URLs
$urls = [];

/**
 * Get last modified date from Git commit history, fallback to filemtime
 */
function getLastModified($filePath)
{
    $lastMod = shell_exec('git log -1 --format="%ci" -- "' . addslashes($filePath) . '" 2>/dev/null');
    if ($lastMod) {
        return date('Y-m-d', strtotime(trim($lastMod)));
    }
    return date('Y-m-d', filemtime($filePath));
}

/**
 * Recursively scan directory for files with allowed extensions
 */
function scanDirForSitemap($dir, $baseUrl, $extensions, &$urls)
{
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;

        $filePath = $dir . DIRECTORY_SEPARATOR . $file;

        if (is_dir($filePath)) {
            scanDirForSitemap($filePath, $baseUrl, $extensions, $urls);
        } else {
            $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
            if (in_array($ext, $extensions)) {
                $relativePath = str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath($filePath));
                $relativePath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);

                if (stripos($relativePath, 'sitemap') === false) {
                    $urls[] = [
                        'loc' => rtrim($baseUrl, '/') . $relativePath,
                        'lastmod' => getLastModified($filePath)
                    ];
                }
            }
        }
    }
}

// Scan the root folder
scanDirForSitemap($directory, $baseUrl, $extensions, $urls);

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
