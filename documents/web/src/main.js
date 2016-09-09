﻿/// <reference path="../public/js/q.js" />

import React from 'react';
import ReactDOM from 'react-dom';
import FilterableDocumentList from './components/FilterableDocumentList';

ReactDOM.render(<FilterableDocumentList />, q('#app'));

class Test {
    constructor(initObject = { 
        apa: 'apa', 
        apa2: 'apa2' }) {
        
        Object.assign(this, initObject);

        console.log(this.apa);
        console.log(this.apa2);
        q.ajax.getJson('/webapi/pages', { apa: 'hej', test: 1234 })
            .then(this.afterPromise.bind(this))
            .catch(this.afterPromise.bind(this));
        this.apa = 'något2';
    }
    afterPromise(data) {
        console.log('ajax efter promiseee!', data, `hej ${this.apa}`);
    }
}

//var test = new Test();
