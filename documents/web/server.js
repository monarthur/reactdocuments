var path404 = '/public/404.html';

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

//webuser:apa090
var db = mongoose.connect('mongodb://fsjogren:datasnille0@ds011432.mlab.com:11432/testdocuments',
{ authMechanism: 'ScramSHA1' }); // connect to our database
console.log('mongo state: ' + mongoose.connection.readyState);
mongoose.connection.on('error', function (err) {
    console.log('mongo error');
    console.log(err);
});

var app = express();

var Page = require('./webapi/models/page');

app.use(express.static(__dirname + '/public'));

var webApiRouter = express.Router();
webApiRouter.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
webApiRouter.route('/pages')
	.get(function (req, res) {
	    console.log(mongoose.connection.readyState);
	    console.log('get pages');
	    //res.json({ pages: 'p-p-p-p-pages' }); return;
	    console.log(Page.find);
	    Page.find().exec(function (err, pages) {
	        console.log('find');
	        if (err)
	            res.send(err);

	        res.json(pages);
	    });
	});;
app.use('/webapi', webApiRouter);

app.get('/', function (req, res) {
    res.send('Hej värld');
});


app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + path404);
});



app.listen(3000, function () {
    console.log('nu lyssnar vi på 3000');
});