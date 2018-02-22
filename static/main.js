define(function(require, exports, module){
	// var changeText = require('./changeText.js');
	// var changeText = require('changeText');
	//js原生方式
	// var helloDom = document.getElementById('test');
	// helloDom.innerHTML = 'Hello Jam';
	// helloDom.innerHTML = changeText.text;
	
	//jq方式
	// var $ = require('jquery');
	// $('#test').text(changeText.init());

	//在define(function (){ }), require引入路径则是相对于当前的js文件所在目录
	var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#test').text(changeText.init());
    }
    exports.showText = showText;
});

//单一模式
//seajs.use是立即执行，注意./  ../都是相对项目的根目录的区别
// seajs.use('./static/log');  
// seajs.use('../seajs-demo/static/log');
seajs.use(['log'])

//回调方式
//seajs.use()调用模块文件的路径默认是seajs的父级文件的目录；
// seajs.use(['main','jquery'],function(main,$) {
    // $('#test').after('<button id="show">showText</button>');
    // $('#show').on('click',function() {
    //     main.showText()
    // })
// });


// require.async 该方法可用来异步加载模块，并在加载完成后执行回调函数。
define(function(require, exports, module) {
  // 加载多个模块
  require.async(['./log','jquery'], function(log, $) {
  	console.log('111111');
  	// do something
  	$('#test').after('<button id="show">showText</button>');
    $('#show').on('click',function() {
        log.showText()
    })
  });
});