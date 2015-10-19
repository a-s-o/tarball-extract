'use strict';

const Bluebird = require('bluebird');
const fs = require('fs');
const tar = require('tar');
const zlib = require('zlib');
const wget = require('wget-improved');

function extractTarball (sourceFile, destination) {
   const options = arguments[2] || {};

   const extractionOpts = {
      // num of path segments to strip from the root when extracting
      strip: options.strip || 0,
      path: destination
   };

   return new Bluebird(function exec (resolve, reject) {
      if (/(gz|tgz)$/i.test(sourceFile)) {
         // This file is gzipped, use zlib to
         // deflate the stream before passing to tar.
         fs.createReadStream(sourceFile)
            .pipe(zlib.createGunzip())
            .pipe(tar.Extract(extractionOpts))
            .on('error', reject)
            .on('end', resolve);
      } else {
         // This file is not gzipped, just deflate it.
         fs.createReadStream(sourceFile)
            .pipe(tar.Extract(extractionOpts))
            .on('error', reject)
            .on('end', resolve);
      }
   });
}

function extractTarballDownload (url, downloadFile, destinationDir) {
   const options = arguments[3] || {};

   function startExtraction () {
      return extractTarball(downloadFile, destinationDir, options.tar || {});
   }

   function startDownload (resolve, reject) {
      // Start download
      const download = wget.download(url, downloadFile, options.wget || {});
      download.on('error', reject);
      download.on('progress', reportProgress());
      download.on('end', resolve);
   }

   return new Bluebird(startDownload)
      .then(startExtraction)
      .then(() => ({
         url: url,
         downloadFile: downloadFile,
         destination: destinationDir
      }));
}

function reportProgress () {
   let previous = 0;
   return function reporter (progress) {
      const percent = parseInt(progress * 100, 10);
      if (percent === 0 || percent === 100 || percent > (previous + 5)) {
         previous = percent;
         console.log(`Downloading [${percent}%]`);
      }
   };
}

module.exports = {
   extractTarball,
   extractTarballDownload
};
