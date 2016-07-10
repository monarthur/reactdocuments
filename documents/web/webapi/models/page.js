var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    headline: String,
    description: String,
    publishdate: String
});

module.exports = mongoose.model('Page', PageSchema, 'pages');