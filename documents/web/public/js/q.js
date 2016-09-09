var q, Q;
(function () {
    //string helpers
  if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
      // return this.indexOf(str) == 0;
      return this.indexOf(prefix) == 0;
    };
  }
  if (typeof String.prototype.format != 'function') {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(curlyBrack, index) {
        return ((curlyBrack == "{{") ? "{" : ((curlyBrack == "}}") ? "}" : args[index]));
      });
    };
  }
  //Date helpers
  if (typeof Date.prototype.toDateTimeString != 'function') {
      Date.prototype.toDateTimeString = function (includeTime) {
          var pubDateY = this.getFullYear(), pubDateM = this.getMonth() + 1, pubDateD = this.getDate();
          var pubDateStr = pubDateY + "-" + formatNumber(pubDateM) + "-" + formatNumber(pubDateD);

          if (includeTime) {
              var timeStr = formatNumber(this.getHours()) + ':' + formatNumber(this.getMinutes());
              pubDateStr += ' ' + timeStr;
          }
          return pubDateStr;

          function formatNumber(number) {
              var newNumber = (number < 10) ? "0" + number : "" + number;
              return newNumber;
          }
      };
  }
  //html element helpers
  if (typeof HTMLElement.prototype.hasClass != 'function') {
    HTMLElement.prototype.hasClass = function(c) {
      return this.classList.contains(c);
    }
  }
  if (typeof HTMLElement.prototype.addClass != 'function') {
    HTMLElement.prototype.addClass = function(c) {
      this.classList.add(c);
      return this;
    }
  }
  if (typeof HTMLElement.prototype.removeClass != 'function') {
    HTMLElement.prototype.removeClass = function(c) {
      this.classList.remove(c);
      return this;
    }
  }
  if (typeof HTMLElement.prototype.on != 'function') {
    HTMLElement.prototype.on = function(eventName, callbackOrTarget, callback) {
      if (typeof callbackOrTarget == 'function') {
        this.addEventListener(eventName, callbackOrTarget);  
      }
      else if (typeof callbackOrTarget == 'string' && typeof callback == 'function') {
        this.addEventListener(eventName, function(e) {
          if (e && e.target) {
            if (selectorMatches(e.target, callbackOrTarget)) {
              callback.call(undefined, e);
            }
          }
        });  
      }
      
      return this;
    }
  }
    //selector helpers
  var selectorMatches = function(el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  };
    //ajax helpers
  var formatParams = function(params) {
      return "?" + Object
            .keys(params)
            .map(function (key) {
                return key + "=" + params[key]
            })
            .join("&");
  }
    //ajax methods
  var ajaxGet = function (url, params, isJson) {
      var promise = new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                  if (isJson) {
                      var responseJson = JSON.parse(this.response);
                      resolve(responseJson);
                  }
                  else {
                      resolve(this.response);
                  }
              } else {
                  if (isJson) {
                      reject({
                          status: this.status,
                          statusText: this.statusText
                      });
                  }
                  else {
                      reject(this.statusText);
                  }
              }
          };
          xhr.onerror = function () {
              if (isJson) {
                  reject({
                      status: this.status,
                      statusText: this.statusText
                  });
              }
              else {
                  reject(this.statusText);
              }
          };
          xhr.open("GET", encodeURI(url + formatParams(params)));
          xhr.send();
      });
      return promise;
  };
  var ajaxGetJson = function (url, params) {
      return ajaxGet(url, params, true);
  };
  var ajaxMethods = {
      get: ajaxGet,
      getJson: ajaxGetJson
  };
  var getOrCreateElement = function(str) {
    var el;
    if (str.startsWith('<')) {
      el = createElement(str);
    }
    else {
      el = getSingleElement(str);
    }
    return el;
  };
  var createElement = function(str) {
    var el, tag, theClass, theId, theText;
    var tagRegex = /<([a-zA-Z]+)/g;
    var classRegex = /(?:class=(?:"|'))(.[^"']*)(?:"|')/
    var idRegex = /(?:id=(?:"|'))(.[^"']*)(?:"|')/
    var textRegex = /(?:>)(.*)(?:<)/
    var tagMatch = str.match(tagRegex);
    if (tagMatch && tagMatch.length > 0) {
      tag = tagMatch[0].replace('<', '')
    }
    var classMatch = str.match(classRegex);
    if (classMatch && classMatch.length > 1) {
      theClass = classMatch[1];
    }
    var idMatch = str.match(idRegex);
    if (idMatch && idMatch.length > 1) {
      theId = idMatch[1];
    }
    var textMatch = str.match(textRegex);
    if (textMatch && textMatch.length > 1) {
      theText = textMatch[1];
    }
    if (tag) {
      el = document.createElement(tag);
      if (theClass) {
        el.className = theClass;
      }
      if (theId) {
        el.id = theId;
      }
      if (theText) {
        var textNode = document.createTextNode(theText);
        el.appendChild(textNode);
      }
    }
    return el;
  };
  var getSingleElement = function(selector) {
    var el = document.querySelector(selector);
    return el;
  };
  var getElements = function(selector) {
    var el = document.querySelectorAll(selector);
    return el;
  };

  q = getOrCreateElement;
  q.all = getElements;
  q.ajax = ajaxMethods;
  Q = getElements;
})();
