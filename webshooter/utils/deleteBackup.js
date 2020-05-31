const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, '..', 'extracted---backup');

function deleteBackup() {
  // Remove files
  fs.readdirSync(`${folder}`).forEach((file) => {
    fs.unlinkSync(`${folder}/${file}`);
  });

  // Delete backup folder
  fs.rmdirSync(folder);
}

module.exports = deleteBackup;
