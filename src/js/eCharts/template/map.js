export default {
	tooltip : {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		data: ['iphone3']
	},
	dataRange: {
		show:false,
		min: 0,
		max: 2500,
		x: 'left',
		y: 'bottom',
		text: ['高', '低'],           // 文本，默认为数值文本
		calculable: true
	},
	series: []
};
