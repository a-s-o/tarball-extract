'use strict';

const fs = require('fs');
const tar = require('tar');
const zlib = require('zlib');
const wget = require('wget');

function extractTarball (sourceFile, destination) {
   let options;
   let callback;
   if (typeof arguments[3] === 'function') {
      callback = arguments[3];
      options = arguments[2] || {};
   } else {
      callback = arguments[2] || function noop () {};
      options = {};
   }

   function callbackError (err) { callback(err); }
   function callbackNull () { callback(null); }

   const extractionOpts = {
      // num of path segments to strip from the root when extracting
      strip: options.strip || 0,
      path: destination
   };

   if (/(gz|tgz)$/i.test(sourceFile)) {
      // This file is gzipped, use zlib to deflate the stream before passing to tar.
      fs.createReadStream(sourceFile)
         .pipe(zlib.createGunzip())
         .pipe(tar.Extract(extractionOpts))
         .on('error', callbackError)
         .on('end', callbackNull);
   } else {
      // This file is not gzipped, just deflate it.
      fs.createReadStream(sourceFile)
         .pipe(tar.Extract(extractionOpts))
         .on('error', callbackError)
         .on('end', callbackNull);
   }
}

function extractTarballDownload (url, downloadFile, destination) {
   let options;
   let callback;
   if (typeof arguments[4] === 'function') {
      callback = arguments[4];
      options = arguments[3] || {};
   } else {
      callback = arguments[3] || function noop () {};
      options = {};
   }

   function extractionComplete (err) {
      callback(err, {
         url: url,
         downloadFile: downloadFile,
         destination: destination
      });
   }

   function downloadComplete (output) {
      extractTarball(output, destination, options.tar || {}, extractionComplete);
   }

   // Start download
   const download = wget.download(url, downloadFile, options.wget || {});
   download.on('error', callback);
   download.on('progress', reportProgress());
   download.on('end', downloadComplete);
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

exports.extractTarball = extractTarball;
exports.extractTarballDownload = extractTarballDownload;
