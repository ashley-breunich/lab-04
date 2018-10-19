'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */

Bitmap.prototype.parse = function(buffer) {
  this.type = buffer.toString('utf-8', 0, 2);
  console.log('type', this.type);
  this.bufferLength = buffer.length;
  console.log('Buffer Length', this.bufferLength);
  this.headerSize = buffer.readInt32LE(14);
  console.log('header size', this.headerSize);
  this.fileSize = buffer.readInt32LE(2); //read 32 bytes skipping the first two
  console.log('file size', this.fileSize);
  this.bytesPerPixel = buffer.readInt16LE(28);
  console.log('bytes per pixel', this.bytesPerPixel);
  this.height = buffer.readInt32LE(22); 
  console.log('height', this.height);
  this.width = buffer.readInt32LE(18);
  console.log('width', this.width);
  this.fileOffset = buffer.readInt32LE(10);
  console.log('file offset', this.fileOffset); // 1146
  this.numColors = buffer.readInt32LE(46);
  console.log('Number of Colors', this.numColors);
  this.buffer = Buffer.from(buffer, this.width, this.height);
  console.log('Buffer', this.buffer);
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
};
/**
 * @param bmp
 */
const transformWaves = (bmp) => {

  bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
  console.log('Transforming bitmap into greyscale', bmp);

  let transformedImg = bmp.buffer;

  for(let i = 1146; i < transformedImg.length; i+=10){
    while (transformedImg[i] === 255 && transformedImg[i+1] === 255 && transformedImg[i+2] === 255){
      transformedImg[i] = 0x99;
      transformedImg[i+1] = 0x99;
      transformedImg[i+2] = 0x99;
    }
  }

  let exportPic = bmp.buffer;
  fs.writeFile(bitmap.newFile, exportPic, (err,out) => {
    if (err) {
      throw err;
    }
    console.log(`Bitmap Transformed: ${bitmap.newFile}`, out);
  });
};

const transforms = {
  waves: transformWaves,
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {
  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);
    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer

    // fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    //   // return out;
    // });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();