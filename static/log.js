define(function(require, exports, module){
	console.log('Hello World!');

	var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#test').text(changeText.init());
    }
    exports.showText = showText;
});