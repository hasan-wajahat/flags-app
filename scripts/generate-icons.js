const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [192, 384, 512];
const iconDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  for (const size of sizes) {
    const svgPath = path.join(iconDir, `icon-${size}x${size}.svg`);
    const pngPath = path.join(iconDir, `icon-${size}x${size}.png`);
    
    console.log(`Converting ${svgPath} to ${pngPath}`);
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`Generated ${pngPath}`);
    } catch (error) {
      console.error(`Error generating ${pngPath}:`, error);
    }
  }
}

generateIcons().catch(console.error);