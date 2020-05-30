const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '..', 'extracted');

function restoreExtracted() {
  // Remove existing .png files
  fs.readdirSync(`${folder}`).forEach((file) => {
    if (path.extname(file) === '.png') {
      fs.unlinkSync(`${folder}/${file}`);
    }
  });

  // Move .png files to backup folder
  fs.readdirSync(`${folder}---backup`).forEach((file) => {
    if (path.extname(file) === '.png') {
      fs.renameSync(
        `${folder}---backup/${file}`,
        `${folder}/${file}`,
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
    }
  });

  // Delete backup folder
  fs.rmdirSync(`${folder}---backup`);
}

module.exports = restoreExtracted;
