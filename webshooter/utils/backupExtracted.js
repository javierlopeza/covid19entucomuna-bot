const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '..', 'extracted');

function backupExtracted() {
  // Create backup folder
  fs.mkdirSync(`${folder}---backup`);

  // Move .png files to backup folder
  fs.readdirSync(folder).forEach((file) => {
    if (path.extname(file) === '.png') {
      fs.renameSync(
        `${folder}/${file}`,
        `${folder}---backup/${file}`,
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
    }
  });
}

module.exports = backupExtracted;
