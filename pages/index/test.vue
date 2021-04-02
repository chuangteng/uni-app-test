<template>
	<view>
		<div id="container"></div>
		<template v-if="isImgShow">
			<image
				src="/static/logo.png"
				style="display: none;"
				@error="Highcharts.onClick"
				@load="Highcharts.onClick"
				:data-option="options[0]"
				mode=""
			></image>
		</template>
	</view>
</template>

<script module="Highcharts" lang="renderjs">
let Highchart = {};
export default {
	data() {
		return {

		}
	},
	mounted() {
		this.$nextTick(() => {
			this.isLoadHighCharts()
		})
	},
	methods: {
		isLoadHighCharts(){
			if (window.Highcharts) {
				this.initEcharts()
			}
			const script = document.createElement('script')
			const script2 = document.createElement('script')
			script.src = 'static/highcharts.js'
			script2.src = 'static/xrange.js'
			// script2.src = 'http://code.highcharts.com.cn/highcharts/9.0.1/modules/xrange.js'
			document.head.appendChild(script)
			setTimeout(()=>{
				document.head.appendChild(script2)
			}, 100)
		},
		initEcharts(option) {
			if (Highcharts) {
				Highchart.container = Highcharts.chart('container', option);
			}
		},
		loads() {
			console.log('loads')
		},
		onClick(e) {
			console.log(e)
			let dataset = e.currentTarget.dataset || {};
			let option = dataset.option;
			if (window.Highcharts) {
				this.initEcharts(option)
			}else{
				this.isLoadHighCharts()
			}
		}
	}
}
</script>

<script>
export default {
	data() {
		return {
			isImgShow: false,
			options: []
		};
	},
	computed: {},
	onShow() {
		this.init();
	},
	methods: {
		// 请求数据
		init() {
			// 假设请求成功
			let _this = this;
			uni.request({
				url: '',
				complete(res) {
					let option = {
						chart: {
							type: 'xrange'
						},
						credits: {
							enabled: false
						},
						title: {
							text: '简易甘特图'
						},
						xAxis: {
							type: 'datetime',
							dateTimeLabelFormats: {
								week: '%Y/%m/%d'
							}
						},
						yAxis: {
							title: {
								text: ''
							},
							categories: ['制作产品原型', '开发', '测试'],
							reversed: true
						},
						series: [
							{
								name: '项目1',
								// pointPadding: 0,
								// groupPadding: 0,
								borderColor: 'gray',
								pointWidth: 20,
								data: [
									{
										x: Date.UTC(2014, 10, 21),
										x2: Date.UTC(2014, 11, 2),
										y: 0,
										partialFill: 0.25
									},
									{
										x: Date.UTC(2014, 11, 2),
										x2: Date.UTC(2014, 11, 5),
										y: 1
									},
									{
										x: Date.UTC(2014, 11, 8),
										x2: Date.UTC(2014, 11, 9),
										y: 2
									},
									{
										x: Date.UTC(2014, 11, 9),
										x2: Date.UTC(2014, 11, 19),
										y: 1
									},
									{
										x: Date.UTC(2014, 11, 10),
										x2: Date.UTC(2014, 11, 23),
										y: 2
									}
								],
								dataLabels: {
									enabled: true
								}
							}
						]
					};
					_this.options.push(option);
					setTimeout(() => {
						_this.isImgShow = true;
					}, 1000);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.highcharts-container {
	width: 750rpx;
	height: 600rpx;
}

#container,
#container1 {
	width: 100%;
	height: 500rpx;
}
</style>
