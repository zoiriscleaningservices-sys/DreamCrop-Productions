const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const dbPath = path.join(__dirname, 'locations.json');
const distPath = path.join(__dirname, 'dist');

// Read templates and DB
const templateHTML = fs.readFileSync(templatePath, 'utf8');
const locationsDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Initialize dist
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);

// Copy assets over to dist so it works as a standalone hosted folder
const srcAssets = path.join(__dirname, 'assets');
const distAssets = path.join(distPath, 'assets');
fs.cpSync(srcAssets, distAssets, { recursive: true });

// Copy the original index.html over as the root page so the base website still works!
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distPath, 'index.html'));

if (fs.existsSync(path.join(__dirname, 'CNAME'))) {
    fs.copyFileSync(path.join(__dirname, 'CNAME'), path.join(distPath, 'CNAME'));
}
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://dreamcropproductions.com/sitemap.xml`;
fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsTxt);

let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
sitemapXML += `  <url>\n    <loc>https://dreamcropproductions.com/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

const DOMAIN = "https://dreamcropproductions.com";

locationsDB.forEach(loc => {
    // Generate URL Route -> /slug_city/slug_service/index.html
    const routeDir = path.join(distPath, loc.slug_city, loc.slug_service);
    fs.mkdirSync(routeDir, { recursive: true });
    
    // Depth is 2 (e.g. /miami/video-production-agency/) relative to root.
    // So to reach root assets, we use '../..'
    const baseURL = '../..';
    
    // Perform Macro Replacements
    let outputHTML = templateHTML
        .replace(/\{\{CITY\}\}/g, loc.city)
        .replace(/\{\{STATE\}\}/g, loc.state)
        .replace(/\{\{REGION\}\}/g, loc.region)
        .replace(/\{\{LATITUDE\}\}/g, loc.latitude)
        .replace(/\{\{LONGITUDE\}\}/g, loc.longitude)
        .replace(/\{\{ZIPCODE\}\}/g, loc.zipcode)
        .replace(/\{\{SERVICE_CAPS\}\}/g, loc.service_caps)
        .replace(/\{\{SERVICE_LOWER\}\}/g, loc.service_lower)
        .replace(/\{\{BASE_URL\}\}/g, baseURL)
        .replace(/\{\{NICHE_H1\}\}/g, loc.niche_h1)
        .replace(/\{\{NICHE_DESC\}\}/g, loc.niche_desc)
        .replace(/\{\{CANONICAL_URL\}\}/g, `${DOMAIN}/${loc.slug_city}/${loc.slug_service}/`);
        
    // Write the output file
    fs.writeFileSync(path.join(routeDir, 'index.html'), outputHTML);
    
    console.log(`[GENERATED]: /${loc.slug_city}/${loc.slug_service}/`);
    
    // Append to sitemap
    sitemapXML += `  <url>\n    <loc>${DOMAIN}/${loc.slug_city}/${loc.slug_service}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
});

sitemapXML += `</urlset>`;
fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXML);
console.log(`\n[SUCCESS] Matrix Generated! ${locationsDB.length} programmatic pages built into /dist.`);
console.log(`[SUCCESS] sitemap.xml built natively.`);
