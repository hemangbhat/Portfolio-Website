import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';

const W = 1200, H = 630;

// Build SVG
const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="0%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#818cf8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#08080b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="100%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#08080b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#08080b"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <!-- Available badge -->
  <rect x="80" y="64" width="372" height="38" rx="19" fill="#18181c" stroke="#27272e" stroke-width="1.5"/>
  <circle cx="112" cy="83" r="6" fill="#34d399"/>
  <text x="130" y="88" font-family="Arial,sans-serif" font-size="14" fill="#a1a1aa">Available · New Delhi, India</text>

  <!-- Name -->
  <text x="80" y="202" font-family="Georgia,serif" font-size="86" font-weight="700" fill="#f4f4f5" letter-spacing="-2">Hemang Bhat</text>

  <!-- Role -->
  <text x="80" y="262" font-family="Arial,sans-serif" font-size="27" font-weight="500" fill="#818cf8">Full-Stack Developer · AI/ML Builder · DSA Enthusiast</text>

  <!-- Divider -->
  <line x1="80" y1="298" x2="580" y2="298" stroke="#27272e" stroke-width="1"/>

  <!-- Tagline line 1 -->
  <text x="80" y="348" font-family="Arial,sans-serif" font-size="21" fill="#a1a1aa">I turn ideas into working products — clean interfaces,</text>
  <!-- Tagline line 2 -->
  <text x="80" y="380" font-family="Arial,sans-serif" font-size="21" fill="#a1a1aa">scalable systems, and AI that actually ships.</text>

  <!-- Trust strip -->
  <text x="80" y="448" font-family="Arial,sans-serif" font-size="17" fill="#71717a">CSAI @ NSUT</text>
  <circle cx="208" cy="442" r="3" fill="#818cf8"/>
  <text x="224" y="448" font-family="Arial,sans-serif" font-size="17" fill="#71717a">ex-Copper Digital</text>
  <circle cx="392" cy="442" r="3" fill="#818cf8"/>
  <text x="408" y="448" font-family="Arial,sans-serif" font-size="17" fill="#71717a">250+ DSA solved</text>

  <!-- Domain -->
  <text x="1120" y="578" font-family="Arial,sans-serif" font-size="19" font-weight="600" fill="#818cf8" text-anchor="end">hemangbhat.dev</text>
</svg>`;

mkdirSync('public', { recursive: true });

const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
writeFileSync('public/og-image.png', png);
console.log('Generated public/og-image.png — ' + (png.length / 1024).toFixed(1) + ' KB');
