'use strict';

const tarball = require('./tarball');
const shell = require('shelljs');
const path = require('path');

const tempDir = path.resolve(process.cwd(), './tmp');

shell.mkdir(tempDir);

function testDownload () {
   const url = 'http://www.tcpdump.org/release/libpcap-1.3.0.tar.gz';
   return tarball.extractTarballDownload(
      url,
      path.join(tempDir, 'libpcap-1.3.0.tar.gz'),
      tempDir
   );
}

testDownload()
   .tap(() => shell.rm('-rf', tempDir))
   .then((result) => console.log(result));
