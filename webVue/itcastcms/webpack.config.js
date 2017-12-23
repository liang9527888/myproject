
// 导入html-webpack-plugin 包,获取到插件对象
var htmlwp = require('html-webpack-plugin');

module.exports={
	// 1.0 定义打包的入口文件路径
	entry:'./src/main.js',
	output:{
		path:'./src',   //打包以后的文件存放目录
		filename:'build.js'  // 打包以后生成的文件名称
	},
	module:{
		loaders:[
			{
				// 将当前项目中所有的.js文件都要进行es6转es5操作，node_moudels除外
				test:/\.js$/,   //表示当前要打包的文件的后缀正则表达式
				// loader:'babel-loader?presets[]=es2015', //如果写到这里，将来在打包.vue文件的时候会报错，表示先利用css-loader解析.css文件，再调用style-loader打包
				loader:'babel-loader',
				exclude:/node_modules/  //node_modules中的所有.js文件不去转换，提高打包性能
			},
			{
				// 打包css文件
				test:/\.css$/,   //表示当前要打包的文件的后缀正则表达式
				loader:'style-loader!css-loader' //表示先利用css-loader解析.css文件，再调用style-loader打包
			},
			{
				// 打包 sass文件
				test:/\.scss$/,   //表示当前要打包的文件的后缀正则表达式
				loader:'style-loader!css-loader!sass-loader' //实现sass文件的打包
			},
			{
				// 打包less文件
				test:/\.less$/,   //表示当前要打包的文件的后缀正则表达式
				loader:'style-loader!css-loader!less-loader' //实现sass文件的打包
			},
			{
				// 打包url()请求的资源文件
				test:/\.(png|jpg|gif|ttf)$/,   // 注意url可能请求多个资源，所以将来在项目中通过url导入的资源扩展名必须配置在这里
				// loader:'url-loader'  //这种配置会将图片变成一个base64的字符串存储到build.js中，如果图片很大的话，那么会造成build.js也比较大，加载的时候会导致效率低下
				loader:'url-loader?limit=40000' //限制图片的大小如果<40k则把他当做base64字符串存储到build.js中，如果>40k 则单独将图片存放到磁盘上，将路径打包进去bulid.js 
			},
			{
				// 打包.vue文件
				test:/\.vue$/,   //表示当前要打包的文件的后缀正则表达式
				loader:'vue-loader' //
			}
		]
	},
	babel:{
		 presets: ['es2015'],  
		 plugins: ['transform-runtime']  //这句代码就是为了解决打包.vue文件不报错
	},
	plugins:[
        new htmlwp({
          title: '首页',  //生成的页面标题
          filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
          template: 'index1.html' //根据index1.html这个模板来生成(这个文件请你自己生成)
        })
    ]


}