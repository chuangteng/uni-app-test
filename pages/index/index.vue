<template>
	<view>
		<navigator url="/pages/index/test" hover-class="other-navigator-hover">
			<button type="default">跳转甘特图</button>
		</navigator>
	</view>
</template>

<script module="Highcharts" lang="renderjs">
	let Highchart = {};
	let number = 0;
	export default {
		data() {
			return {
				highOpt: {
					chart: {
						zoomType: 'x'
					},
					title: {
						text: '美元兑欧元汇率走势图'
					},
					subtitle: {
						text: document.ontouchstart === undefined ?
							'鼠标拖动可以进行缩放' : '手势操作进行缩放'
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					tooltip: {
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%Y-%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					yAxis: {
						title: {
							text: '汇率'
						}
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						area: {
							fillColor: {
								linearGradient: {
									x1: 0,
									y1: 0,
									x2: 0,
									y2: 1
								},
								stops: []
							},
							marker: {
								radius: 2
							},
							lineWidth: 1,
							states: {
								hover: {
									lineWidth: 1
								}
							},
							threshold: null
						}
					},
					series: [{
						type: 'area',
						name: '美元兑欧元',
						data: []
					}]
				},
				seriesData: [],
				isLoad: false
			}
		},
		watch: {
			seriesData(n) {
				if (n.length) {
					this.highOpt.series[0].data = n;
					this.initEcharts1()
				}
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
				} else {
					const script = document.createElement('script')
					script.src = 'http://cdn.highcharts.com.cn/highcharts/highcharts.js'
					document.head.appendChild(script)
				}
			},
			initEcharts() {
				if (Highcharts) {
					Highchart.container = Highcharts.chart('container', this.options);
				}
			},
			initEcharts1() {
				let interval = setInterval(() => {
					if (Highcharts || number > 20) {
						clearInterval(interval);
						if (!Highcharts) return
						if (!this.highOpt.plotOptions.area.fillColor.stops.length) {
							let stops = [
								[0, new Highcharts.getOptions().colors[0]],
								[1, new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
							this.highOpt.plotOptions.area.fillColor.stops = stops;
						}
						Highchart.container1 = Highcharts.chart('container1', this.highOpt);
					} else {
						number++
					}
				}, 500)

			},
			loads() {
				console.log('loads')
			},
			onClick(e) {
				let optionJson = e.currentTarget.dataset.option;
				this.options = JSON.parse(optionJson)
				if (window.Highcharts) {
					this.initEcharts()
				}else{
					this.isLoadHighCharts()
				}
			},
			onClick1(e) {
				let optionJson = e.currentTarget.dataset.option;
				this.seriesData = JSON.parse(optionJson)
			}
		}
	}
</script>


<script>
	import json from '@/static/json.js'
	
	let HighchartsOption = {
		gridLineWidth: 1,
		minTickInterval: 1,
		lineWidth: 1,
		lineColor: '#000000',
		minorGridLineDashStyle: 'dash',
		minorTickInterval: 'auto',
		minorTickWidth: 1,
		minorGridLineWidth: 0,
		tickLength: 0,
		allowDecimals: true,
		tickAmount: 5

	}

	export default {
		data() {
			return {
				isImgShow: false,
				opt: {
					title: {
						text: ''
					},
					legend: {
						enabled: false
					},
					credits: {
						enabled: false
					},
					xAxis: [{
							...HighchartsOption,
							title: {
								enabled: false
							}
						},
						{
							...HighchartsOption,
							labels: {
								enabled: false
							},
							title: {
								enabled: false
							},
							opposite: true
						}
					],
					yAxis: [{
							...HighchartsOption,
							title: {
								enabled: false
							}
						},
						{
							...HighchartsOption,
							labels: {
								enabled: false
							},
							title: {
								enabled: false
							},
							opposite: true
						}
					],
					series: [{
						name: '观测值',
						type: 'scatter',
						color: 'rgba(255,68,85,0.6)',
						data: [{
								name: '2019-9-9',
								x: 5,
								y: 6
							},
							{
								name: '2019-9-10',
								x: 6,
								y: 5
							},
							{
								name: '2019-9-11',
								x: 7,
								y: 4
							},
							{
								name: '2019-9-12',
								x: 8,
								y: 3
							},
						]
					}],
					tooltip: {
						headerFormat: '<b>{point.key}</b><br>',
						pointFormat: '防御能力:{point.x} , 进攻能力:{point.y}'
					}
				},
				opt1: []
			}
		},
		computed: {
			optin() {
				return JSON.stringify(this.opt)
			},
			optin1() {
				return JSON.stringify(this.opt1)
			}
		},
		onReady() {
			this.init()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/index/test'
			})
		},
		methods:{
			// 请求数据
			init(){
				// 假设请求成功
				let _this = this;
				uni.request({
					url: '',
					complete(res) {
						// 数据在static/json.js
						console.log(json)
						_this.opt1.push(...json)
						// 然后显示图片，然后通过设置image属性来传递数据:data-option="optin1"
						setTimeout(() => {
							_this.isImgShow = true;
						}, 500)
					}
				})
			}
		}
	}
</script>


<style lang="scss">
	.highcharts-container {
		width: 750rpx;
		height: 600rpx;
	}

	#container,
	#container1{
		width: 100%;
		height: 500rpx;
	}
</style>
