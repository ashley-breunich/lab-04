![CF](http://i.imgur.com/7v5ASc8.png) LAB: Buffers - Bitmap Transformer
=======================================================================

## Submission Instructions
* Follow the core submission instructions

### Before you begin
* You'll need to initialize this lab folder as a new node module, install your dependencies, setup your npm script commands, and pull in your config files

## Resources  
* [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format)
* [Buffer Docs](https://nodejs.org/api/buffer.html)


## Feature Tasks
For this assignment you will be building a bitmap (`.bmp`) transformer CLI. It will read a bitmap in from disk, run one or more color or raster transforms and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your solution should be composed of small tested modules that solve specific problems. Your modules should be thoughfuly named and well documented. The entry point to your CLI should be an index.js file in the root of your package, and all helper modules should be placed in your lib/ directory. Your bitmap transformer modules should not use any third party libraries.

**Assignment 1: Do this will callbacks**

**Assignment 2: Modularize the code**
  * What should be unique, testable modules?
  * What structure should you use to most easily export?
  * How best can we make this scale?

##  Documentation

Unfortunately, I have not been able to get the transformation function to work. It reads the file and, I believe, goes through the transformation, but just spits out the same image as before in the new file. I don't think I am passing through the correct paramater in the transformReverse function. 

#### Function Breakdown 

###### Bitmap():
Airty: 1,
Data: Buffer - Array, 
Behavior: It's a constructor function that saves the file path to the this.file variable. 

###### Bitmap.parse():
Airty: 1,
Data: File Name (entered in the command line) - String, 
Behavior: It parses the buffer so that we can use different parts of it for the transformations. 

###### Bitmap.transform():
Airty: 1,
Data: Type of Operation - String,
Behavior: This will call the correct transformation function and then sets the new file path to a concatenated string.

###### transformReverse():
Airty: 1,
Data: The bitmap - Array, 
Behavior: This is where the actual transformation of the array happens. The output is a new array of data.  

###### transformWithCallbacks():
Airty: 0,
Behavior: This is where everything happens! The file is read, then the buffer is parsed, then the bitmap is transformed accordingly, and finally, the new bitmap is written. The output will be a new bitmap file (so an array of data).

#### Answering TODO at the bottom
The process.argv.slice(2) section of the code is an important one. The argv array contains everything on the command line. The first item is the path to node and the second item is the path to the script for the program you are running. When you slice it at the the second index, you are discarding both of these and just returning everything else. We set both file and operation to this sliced array of data. 

It then instantiates a new Bitmap instance with the file and sets that to the variable bitmap. Then, it calls the transformWithCallbacks function which begins the read file process. 

#### Time Spent
I spent around 12 hours working on this lab - reading all the documentation, researching ideas, and trying different things out. 