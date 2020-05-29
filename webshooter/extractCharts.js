/* eslint-disable no-console */

const _ = require('lodash');
const fs = require('fs');
const { buildFilename } = require('./utils/pathBuilder');
const capture = require('./captureChart');

const communesRegions = require('../names/communes_regions_keys.json');
const completeRegions = require('../names/complete_regions.json');

function captureCommunes() {
  const delay = 3000;
  let offset = -delay;
  _.forEach(communesRegions, (region, commune) => {
    const checkPath = `./extracted/${buildFilename(region, commune)}.png`;
    if (!fs.existsSync(checkPath)) {
      // Capture
      setTimeout(() => {
        (async () => {
          console.log('Capturing:', region, commune);
          try {
            await capture(region, commune);
            console.log('Captured:', region, commune);
          } catch (err) {
            console.log(err.message);
          }
        })();
      }, delay + offset);
      offset += delay;
    } else {
      // Already captured
      console.log('Already captured:', region, commune);
    }
  });
}

function captureRegions() {
  const delay = 2000;
  let offset = -delay;
  _.forEach(completeRegions, (completeRegion, region) => {
    const checkPath = `./extracted/${buildFilename(region)}.png`;
    if (!fs.existsSync(checkPath)) {
      // Capture
      setTimeout(() => {
        (async () => {
          console.log('Capturing:', region);
          try {
            await capture(region);
            console.log('Captured:', region);
          } catch (err) {
            console.log(err.message);
          }
        })();
      }, delay + offset);
      offset += delay;
    } else {
      // Already captured
      console.log('Already captured:', region);
    }
  });
}

function captureChile() {
  const checkPath = `./extracted/${buildFilename()}.png`;
  if (!fs.existsSync(checkPath)) {
    // Capture
    (async () => {
      console.log('Capturing: Chile');
      try {
        await capture();
        console.log('Captured: Chile');
      } catch (err) {
        console.log(err.message);
      }
    })();
  } else {
    // Already captured
    console.log('Already captured: Chile');
  }
}

function captureAll() {
  captureChile();
  captureRegions();
  captureCommunes();
}

captureAll();
