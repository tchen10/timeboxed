'use strict';

exports.inject = function(app) {
    app.controller('View1Ctrl', exports.controller);
    return exports.controller;
};

exports.controller = function() {
    return {doStuff: function() {}};
};
