tarball-extract
===============

A simple tarball download and extraction lib for node.

## Install
    > npm install tarball-extract

## extractTarball (sourceFile, destination, [options])
Extracts a tar file using **node-tar**. If the file ends in a **.tgz** or a **tar.gz** gzip will be used to deflate it before passing the stream to tar.

```javascript
const tarball = require('tarball-extract');
const archive = '/tmp/testfile.tar';
const dest = '/tmp/testfile';

const promise = tarball.extractTarball(archive, dest);
```

#### Arguments
1. sourceFile (String) - path to a `.tar` or `.tar.gz` archive
2. destination (String) - path to target directory for extracted contents
3. options (Object) - Object containing options to be passed to the node-tar's `Extract` method. Currently supported options are:
   * [strip=0] (Number): Number of path segments to strip from the root when extracting

#### Returns

(Promise) - Resolved after successful extraction


## extractTarballDownload (url, downloadFile, destination, [options])
Download a tarball from a **url** and automatically extract it.

```javascript
const tarball = require('tarball-extract');
const url = 'http://example.com/testfile.tar.gz';
const fileName = '/tmp/testfile.tar.gz';
const extractionDest = '/tmp/testfile';

const promise = tarball.extractTarballDownload(url , fileName, extractionDest);
```

#### Arguments
1. url (String) - url of tarball to be downloaded
2. downloadFile (String) - path (including name) of downloaded tarball; ex: `/tmp/testfile.tar.gz`
3. destination (String) - path to target directory for extracted contents
4. options (Object)
   * wget (Object) - See `wget-improved` npm page for options
   * tar (Object) - supported options:
      * [strip=0] (Number) Number of path segments to strip from the root when extracting

#### Returns

(Promise) - Resolved after completion with an info object which contains the following:

```javascript
{ url: 'http://example.com/testfile.tar.gz',
  downloadFile: '/tmp/testfile.tar.gz',
  destination: '/tmp/testfile' }
```
