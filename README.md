>在SeaJS中，所有JavaScript文件都应该用模块的形式来书写，并且一个文件只包含一个模块。如果没有SeaJS库文件可以[github官网绍](https://github.com/seajs/seajs/)下载。

- 首先来看一下html文件内容，首先引入sea.js文件，然后通过seajs.use加载main.js文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>seajs-demo</title>
</head>
<body>
    <h1>Seajs Demo</h1>
    <h2 id="test">Hello World!</h2>
    <script src="seajs-module/sea.js"></script>
    <script>
        //正常引入一个模块要写他的相对路径，但我们可以给它取个别名，用别名来替代相对路径引入
        //main中引用changeText模块就可以直接写成这样了var changeText = require('changeText')
        //用来进行配置的方法。
        seajs.config({
            // Sea.js 的基础路径，也可以不指定默认seajs的地址
            // 注意：一般请不要配置 base 路径，把 sea.js 放在合适的路径往往更简单一致。 
            base: 'file:///Users/username/Desktop/github-uploadDemo/seajs-demo/seajs-module',
            // 别名配置 
            alias: {
                // 'changeText':'../static/changeText.js',  //可直接用下者
                'changeText':'./changeText',  //require引入路径则是相对于当前的js文件所在目录
                //在seajs中直接以文件名开头的路径是相对于base路径
                //base路径即seajs的根目录
                'jquery':'jquery/jquery.min',  
                // seajs.use()调用模块文件的路径默认是seajs的父级文件的目录
                // ../代表上一级找到seajs-demo再依次查找下去
                // 'main': './static/main.js'   // ./代表根目录的当前目录下查找
                'main':'../seajs-demo/static/main',
                // 'log': './static/log'
                'log': 'staticBase/log'
            },
            // 路径配置，当目录比较深，或需要跨目录调用模块时，可以使用paths来简化书写。
            paths: { 
                'staticBase': './static', 
            },
            // 预加载项，在老浏览器中，提前加载好ES5和json模块
            preload: [ 
                Function.prototype.bind ? '' : 'es5-safe', 
                this.JSON ? '' : 'json' 
            ],
            // 文件编码 
            charset: 'utf-8', 
            // 调试模式，值为true时，加载器不会删除动态插入的script标签。插件也可以根据debug配置，来决策log等信息的输出。
            debug: true
        });
        seajs.use('./static/main.js');
    </script>
</body>
</html>
```

- 入口函数main.js文件内容，标准格式为define(function(require, exports, module){})
```js
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
// seajs.use(['log'])

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
```

- 自定义模块方法，包括chageText.js和log.js，注意模块引入和导出
```js
//chageText.js
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

//log.js
define(function(require, exports, module){
    console.log('Hello World!');

    var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#test').text(changeText.init());
    }
    exports.showText = showText;
});
```

- 第三方文件引用，下载一个jquery源文件，按如下修改，使其模块化，能被外部调用。其它第三方库文件也可以操作。
```js
define(function (require, exports, module) {
    //jquery 源码
})
```

- 参考文献
1、[Seajs使用实例入门介绍](https://www.jianshu.com/p/ebdf2233e3fe "Seajs使用实例入门介绍")
