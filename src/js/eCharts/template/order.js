export default {
	dataZoom: {
		show: true
	},
	backgroundColor: '#fff',
	grid: {
		borderWidth: 0
	},
	color: [],
	legend: {
		data: []
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	animation: false,
	xAxis: [
		{
			splitLine: {
				show: false,
			},
			axisTick: {
				show: true,
				interval: 0,
				onGap: false
			},
			axisLine: {
				lineStyle: {
					color: 'black',
					width: 2
				}
			},
			axisLabel: {
				interval: 0,
				rotate: -40,
				textStyle: {color: ['balck', 'red']}
			},
			itemStyle: {
				normal: {
					label: {
						show: true,
						textStyle: {
							fontStyle: "oblique"
						}
					}
				}
			},
			boundaryGap: true,
			type: 'category',
			data: []
		}
	],
	yAxis: [
		{
			splitLine: {
				show: true,
				lineStyle: {
					color: '#000',
					width: 1,
					type: "dashed"
				}
			},
			name: '人数',
			axisTick: {
				show: true,
				lineStyle: {
					color: '#000',
					width: 2
				}
			},
			axisLine: {
				lineStyle: {
					color: '#000',
					width: 2
				}
			},
			type: 'value',
			position: "left",
			boundaryGap: [0, 0.1]
		}
	],
	series: []
};


















