const captureWebsite = require('capture-website');
const sharp = require('sharp');
const { buildUrl, buildFilename } = require('./pathBuilder');

async function capture(
  region,
  commune,
  width = 760,
  height = 800,
  extractHeight = 975,
  customRemoveElements,
) {
  const url = buildUrl(region, commune);
  const screenshotFilename = `./screenshots/${buildFilename(region, commune)}.png`;
  const removeElements = customRemoveElements
    ? [customRemoveElements]
    : ['#faqButton, #metricsContainer, .quarantineRibbon'];

  await captureWebsite.file(
    url,
    screenshotFilename,
    {
      delay: 2,
      width,
      height,
      removeElements,
    },
  );

  const extractedImageFilename = `./extracted/${buildFilename(region, commune)}.png`;
  sharp(screenshotFilename)
    .extract({
      left: 0, width: width * 2, top: 0, height: extractHeight,
    })
    .toFile(extractedImageFilename, (error) => {
      if (error) {
        console.log(error); // eslint-disable-line no-console
      }
    });
}

module.exports = capture;
