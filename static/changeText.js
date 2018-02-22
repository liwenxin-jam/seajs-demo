define(function(require, exports, module){
	// var textContent = 'Hello Jam, Weclome to Seajs!';
	// exports.text = textContent;
	
	
	//自定义初始化方法
	var init = function(){
		var textContent = [
			'Hello World!',
			'Hello Jam',
			'Weclome to Seajs',
			'It\'s working Day'
		];
		var index = Math.floor(Math.random()*textContent.length);
        return textContent[index];
	}
	//另外一种方式导出
	module.exports = {
		init: init
	}
});