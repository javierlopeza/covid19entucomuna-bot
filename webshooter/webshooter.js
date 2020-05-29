const captureWebsite = require('capture-website');
const sharp = require('sharp');

const now = new Date();
const secondsSinceEpoch = Math.round(now.getTime() / 1000);
const screenshotFilename = `${secondsSinceEpoch}.png`;

const width = 750;
const height = 800;

(async () => {
  await captureWebsite.file(
    'https://covid19entucomuna.cl/regiones/Maule/comunas/Teno',
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

  const resizedFilename = `${secondsSinceEpoch}-resized.png`;
  sharp(screenshotFilename)
    .extract({ left: 0, width: width * 2, top: 0, height: 975 })
    .toFile(resizedFilename, function (err) {
      if (err) {
        console.log(err);
      }
    });
})();
