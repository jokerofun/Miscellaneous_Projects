 const http = require('http');
 const path = require('path');
 // const url = require('url');
 const fs = require('fs');
 util = require('util');
 // const qs = require('querystring');
 // const zlib = require('zlib');
 // const EventEmitter = require('events');
 // const eventEmitter = new EventEmitter();
 // const greeter = require('./greeter');

 const port = 8080;

 const comments = [{
         author: 'Peter',
         content: 'hi guys'
     },
     {
         author: 'George',
         content: 'hello, Peter'
     }
 ];

 // function readFileAsStream(fileName) {
 //     return fs.createReadStream(`./public/${fileName}`);
 // }

 // function getFileExtension(fileName) {
 //     return fileName.split('.')[1];
 // }

 // function extractFileNameFromPath(path){
 //     return path.split('/')[1];
 // }

 // const extensionsContentTypes = {
 //     css: {
 //         'Content-Type': 'text/css'
 //     },
 //     js: {
 //         'Content-Type': 'application/javascript',
 //     }
 // };

 // http
 //     .createServer((req, res) => {
 //         const parsedUrl = url.parse(req.url);
 //         const pathname = parsedUrl.pathname;

 //         if (req.method === 'GET') {
 //             if (pathname === '/') {
 //                 const index = fs.createReadStream('./public/index.html');

 //                 index.pipe(res);
 //                 return;
 //             } else {
 //                 const fileName = extractFileNameFromPath(pathname);
 //                 const fileStream = readFileAsStream(fileName);
 //                 const extension = getFileExtension(fileName);
 //                 const header = extensionsContentTypes[extension];

 //                 res.writeHead(200, header);
 //                 fileStream.pipe(res);
 //             }
 //         }
 //     })
 //     .listen(port);

 // console.log(`Web server started at port: ${port}`);

 const formidable = require('formidable');


 http.createServer(function (req, res) {
     if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
         // parse a file upload
         var form = new formidable.IncomingForm();

         form.parse(req, function (err, fields, files) {
             fs.rename(files.upload.path, 'c:/data/' + fields.title, (err) => {
                 if(err){
                     res.writeHead(500);
                     res.end();
                     console.log(err);
                     return;
                 }
                 res.writeHead(200, {
                     'content-type': 'text/plain'
                 });
                 res.write('received upload:\n\n');
                 res.end(util.inspect({
                     fields: fields,
                     files: files
                 }));
             });
         });


         return;
     }

     // show a file upload form
     res.writeHead(200, {
         'content-type': 'text/html'
     });
     res.end(
         '<form action="/upload" enctype="multipart/form-data" method="post">' +
         '<input type="text" name="title"><br>' +
         '<input type="file" name="upload" multiple="multiple"><br>' +
         '<input type="submit" value="Upload">' +
         '</form>'
     );
 }).listen(8080);