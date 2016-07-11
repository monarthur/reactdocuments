var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    headline: String,
    description: String,
    content: String,
    blurbImage: String,
    publishdate: Date,
    modifiedDate: Date
});

module.exports = mongoose.model('Page', PageSchema, 'pages');