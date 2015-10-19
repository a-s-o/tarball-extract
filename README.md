tarball-extract
===============

A simple tarball download and extraction lib for node.

## Install
    > npm install tarball-extract

## extractTarball (sourceFile, destination, [options], [callback])
Extracts a tar file using **node-tar**. If the file ends in a **.tgz** or a **tar.gz** gzip will be used to deflate it before passing the stream to tar.

```javascript
const tarball = require('tarball-extract');
const archive = '/tmp/testfile.tar';
const dest = '/tmp/testfile';

tarball.extractTarball(archive, dest, function(err){
   if(err) console.log(err)
});
```

#### Options
Object containing options to be passed to the node-tar's `Extract` method. Currently supported options are:
* strip (String): Number of path segments to strip from the root when extracting (Defaults to 0)


## extractTarballDownload (url, downloadFile, destination, [options], [callback])
Download a tarball from a **url** and automatically extract it.

```javascript
const tarball = require('tarball-extract');
const url = 'http://example.com/testfile.tar.gz';
const fileName = '/tmp/testfile.tar.gz';
const extractionDest = '/tmp/testfile';


 tarball.extractTarballDownload(url , fileName, extractionDest, function(err, result) {
   console.log(err, result)
});
```

When the download is complete the callback is passed (err, info).

```javascript
{ url: 'http://example.com/testfile.tar.gz',
  downloadFile: '/tmp/testfile.tar.gz',
  destination: '/tmp/testfile' }
```

#### Options
Object containing options to be passed to either `tar` or `wget module`

Example
```javascript
options = {
   tar: { strip: 1 }, // Strip 1 path segment
   wget: {}  // See wget's npm page for options
}

```
