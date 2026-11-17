const https = require('https');
const fs = require('fs');

https.get('https://www.danieli-corus.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('site.html', data);
    console.log('Downloaded site.html, length:', data.length);
    
    // Check for logo links
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(data)) !== null) {
      if (/logo|danieli|brand|corus/i.test(match[0])) {
        console.log('Logo match:', match[0]);
      }
    }
  });
}).on('error', err => console.log('Err:', err.message));
