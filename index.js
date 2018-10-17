'use strict';

const fs = require('fs');
// let buffer = fs.readFileSync(`${__dirname}/assets/baldy.bmp`);

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
  this.buffer = Buffer.from(buffer);
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
  console.log('file offset', this.fileOffset);
  this.numColors = buffer.readInt32LE(46);
  console.log('Number of Colors', this.numColors);
  this.colorTable = buffer.slice(108, this.numColors * 4);
  console.log('Color Table', this.colorTable);
};
// Bitmap.prototype.getBuffer = function() {
//   return this.buffer;
// };

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation];
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};
/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = function (bmp) {
  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  // if (fs.existsSync(bmp) === false) {
  //   console.error ('This is not a valid path.');
  //   throw new Error('This is not a valid path.');
  // } else {
  // }
  this.colorTable.reverse();
  return bitmap.buffer;
};

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
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
      
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
      // return out;
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

