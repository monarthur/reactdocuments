/// <reference path="../public/js/q.js" />
console.log('apan');

function Test() { };
Test.prototype = {
    apa: 'inget',
    init: function () {
        this.apa = 'något1';
        q.getJson('/webapi/pages', { apa: 'hej', test: 1234 }, this.after.bind(this)).then(this.afterPromise.bind(this));
        this.apa = 'något2';
    },
    after: function (data) {
        console.log('ajax callback!', data, this.apa);
    },
    afterPromise: function (data) {
        console.log('ajax efter promise!', data, this.apa);
    }
}

var test = new Test();
test.init();
