var path404 = '/public/404.html';

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//webuser:apa090
var db = mongoose.connect('mongodb://fsjogren:datasnille0@ds011432.mlab.com:11432/testdocuments', { authMechanism: 'ScramSHA1' });
console.log('mongo state: ' + mongoose.connection.readyState);
mongoose.connection.on('error', function (err) {
    console.log('mongo error');
    console.log(err);
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Page = require('./webapi/models/page');

app.use(express.static(__dirname + '/public'));

var webApiRouter = express.Router();
webApiRouter.get('/', function (req, res) {
    res.json({ message: 'This is the Page API' });
});
var apiDefaults = {
    orderBy: '-modifiedDate',
    take: 5,
    skip: 0
};
webApiRouter.route('/pages')
	.get(function (req, res) {
	    console.log('get pages');
	    var take = req.query.take || apiDefaults.take;
	    var skip = req.query.skip || apiDefaults.skip;
	    var orderBy = req.query.orderBy || apiDefaults.orderBy;
	    console.log(`take: ${take}, skip: ${skip}, orderBy: ${orderBy}`);
	    var filter = req.query.searchText ? { 'headline': { '$regex': req.query.searchText, '$options': 'i' } } : {};
	    Page.find(filter).sort(orderBy).skip(skip).limit(take).exec(function (err, pages) {
	        if (err)
	            res.send(err);

	        res.json(pages);
	    });
	})
    .post(function (req, res) {
        var page = new Page();
        if (req.body.headline)
            page.headline = req.body.headline;
        else {
            res.send('Headline is required!');
            return;
        }
        page.description = req.body.description || '';
        page.content = req.body.content || '';
        var currentDate = new Date();
        page.publishDate = currentDate;
        page.modifiedDate = currentDate;
        page.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Page created!', page: page });
        });

    });
webApiRouter.route('/pages/:page_id')
    .get(function (req, res) {
        console.log('get page');
        console.log('id: ' + req.params.page_id);
        Page.findById(req.params.page_id).exec(function (err, page) {
            if (err)
                res.send(err);
            res.json(page);
        });
    })
    .put(function (req, res) {
        Page.findById(req.params.page_id, function (err, page) {
            if (err)
                res.send(err);
            if (req.body.headline)
                page.headline = req.body.headline;
            if (req.body.description)
                page.description = req.body.description;
            var currentDate = new Date();
            page.modifiedDate = currentDate;
            page.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Page updated!', page: page });
            });

        });
    })
    .delete(function (req, res) {
        Page.remove({
            _id: req.params.page_id
        }, function (err, page) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', page: page });
        });
    });
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