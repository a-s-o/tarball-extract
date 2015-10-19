'use strict';

const tarball = require('./tarball');

function testDownload () {
   const url = 'http://www.tcpdump.org/release/libpcap-1.3.0.tar.gz';
   return tarball.extractTarballDownload(
      url,
      '/tmp/libpcap-1.3.0.tar.gz',
      '/tmp/libpcap-1.3.0'
   );
}

testDownload().then((result) => console.log(result));
