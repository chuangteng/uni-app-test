

只支持h5和app , 小程序可以使用webview链入;

借鉴插件[renderjs-echarts-demo](https://ext.dcloud.net.cn/plugin?id=1207);

options配置参考 [Highcharts](https://www.highcharts.com.cn/);

```
import json from '@/static/json.js'

onReady() {
	this.init()
},
methods:{
	// 请求数据
	init(){
		// 假设请求成功
		let _this = this;
		uni.request({
			url: '',
			complete(res) {
				// 数据在static/json.js  替换成你们请求到的数据
				console.log(json)
				// 请求到的数据赋值到配置项里面去
				_this.opt1.push(...json)
				// 然后显示图片，通过设置image属性来传递数据:data-option="optin1"
				setTimeout(() => {
					_this.isImgShow = true;
				}, 500)
			}
		})
	}
}

