// github 位置  https://github.com/felixge/node-formidable

let formidable = require('formidable'),
    util = require('util'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        fs.rename(files.upload.path,`${files.upload.name}`, function (err) {
            if (err) res.json({
                err
            })
            res.json({
                msg: '上传成功'
            });
        });

    });
});

app.get('', (req, res, next) => {
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
})


app.listen(3300, function () {
    console.log('Example app listening on port 3300!');
});