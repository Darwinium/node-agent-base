'use strict';
const url = require('url');
const https = require('https');

https.request = (function(request) {
return function(_options, cb) {
var options;
if (typeof _options === 'string') {
options = url.parse(_options);
} else {
options = Object.assign({}, _options);
}
if (null == options.port) {
options.port = 443;
}
options.secureEndpoint = true;
return request.call(https, options, cb);
};
})(https.request);

https.get = function(options, cb) {
const req = https.request(options, cb);
req.end();
return req;
};
