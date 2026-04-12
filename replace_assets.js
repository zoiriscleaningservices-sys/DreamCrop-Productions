const fs = require('fs');
let html = fs.readFileSync('template.html', 'utf8');
html = html.replace(/src="assets\//g, 'src="{{BASE_URL}}/assets/');
html = html.replace(/href="assets\//g, 'href="{{BASE_URL}}/assets/');
fs.writeFileSync('template.html', html);
