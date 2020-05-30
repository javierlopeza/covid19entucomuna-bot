const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '..', 'screenshots');

function cleanScreenshots() {
  // Remove existing .png files
  fs.readdirSync(folder).forEach((file) => {
    if (path.extname(file) === '.png') {
      fs.unlinkSync(`${folder}/${file}`);
    }
  });
}

module.exports = cleanScreenshots;
