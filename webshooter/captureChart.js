const captureWebsite = require('capture-website');
const sharp = require('sharp');
const { buildUrl, buildFilename } = require('./utils/pathBuilder');

async function capture(region, commune) {
  const width = 750;
  const height = 800;

  const url = buildUrl(region, commune);
  const screenshotFilename = `./screenshots/${buildFilename(region, commune)}.png`;

  await captureWebsite.file(
    url,
    screenshotFilename,
    {
      delay: 1,
      width,
      height,
      removeElements: [
        '#faqButton, #metricsContainer',
      ],
    }
  );

  const extractedImageFilename = `./extracted/${buildFilename(region, commune)}.png`;
  sharp(screenshotFilename)
    .extract({ left: 0, width: width * 2, top: 0, height: 975 })
    .toFile(extractedImageFilename, function (err) {
      if (err) {
        console.log(err);
      }
    });
};

module.exports = capture;
