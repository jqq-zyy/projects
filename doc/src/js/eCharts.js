/**
 * Created by billy on 2017/2/10.
 */
import g from '../global';

var _el = '';
var _hash = {
	pv: {
		name: "访问量",
		color: "rgb(75,186,183)",
		lineStyle: "solid"
	},
	uv: {
		name: "访客量",
		color: "rgb(159,141,201)",
		lineStyle: "solid"
	},
	relay: {
		name: "转发数",
		color: "rgb(102,164,226)",
		lineStyle: "solid"
	}
};

var serieData = {
	"name": "",
	"type": "line",
	"smooth": false,
	"data": [],
	"itemStyle": {
		"normal": {
			"label": {
				"show": true,
				"position": "top",
				"textStyle": {
					"color": "black",
					fontSize: 16
				}
			}
		}
	}
}

var option = {
	dataZoom: {
		handleColor: 'skyblue',
		fillerColor: '#ccc',
		show: true,
		start: 30
	},
	tooltip: {
		trigger: 'axis'
	},
	backgroundColor: '#fff',
	grid: {
		borderWidth: 0,
	},
	color: [],
	legend: {
		data: []
	},
	xAxis: [
		{
			splitLine: {
				show: false,
			},
			axisTick: {show: false},
			axisLine: {
				lineStyle: {
					color: 'black',
					width: 2
				}
			},
			type: 'category',
			boundaryGap: true,
			data: []
		}
	],
	yAxis: [
		{
			splitLine: {
				show: false
			},
			axisTick: {show: false},
			axisLine: {
				lineStyle: {
					color: 'black',
					width: 2
				}
			},
			boundaryGap: [0, 0.1],
			type: 'value'
		}
	],

	series: []
};

export default ($el, $dObj)=>
{
	_el = $el;
	if (_el == "")
	{
		return;
	}
	createData(formatData($dObj));
	if (window.createCharts)
	{
		window.createCharts(option, _el, g.core.webParam.path.libs)
	}
}

/**
 * 格式化数据，将后端数据结构转换为图表需要的数据结构
 * @param $dObj 后端接口返回的数据
 * @returns {{}}
 */
function formatData($dObj)
{
	return $dObj;
}


function createData($data)
{
	option.legend.data = [];
	option.series = [];
	option.color = [];
	for (var dataNameKey in $data)
	{
		var dataName = _hash[dataNameKey].name;
		var dataColor = _hash[dataNameKey].color;
		var lineStyle = _hash[dataNameKey].lineStyle;
		if (dataName)
		{
			var tempSerieData = __merge({}, serieData);
			tempSerieData.data = [];
			tempSerieData.itemStyle.normal.lineStyle = {type: lineStyle};
			var numList = $data[dataNameKey];
			tempSerieData.name = dataName;
			option.legend.data.push(dataName);
			option.color.push(dataColor);
			var min = Math.min.apply(null, numList);
			var max = Math.max.apply(null, numList);
			if (min < max && false)
			{
				for (var i = 0; i < numList.length; i++)
				{
					var num = numList[i];
					if (num == max)
					{
						tempSerieData.data.push(
							{
								value: num,
								symbol: 'emptyCircle',
								symbolSize: 8
							});
					}
					else if (num == min)
					{
						tempSerieData.data.push(
							{
								value: num,
								symbol: 'emptyCircle',
								symbolSize: 5
							});
					}
					else
					{
						tempSerieData.data.push(num);
					}
				}
			}
			else
			{
				tempSerieData.data = numList.concat();
			}

			option.series.push(tempSerieData);
			option.series[0].symbol = 'emptyCircle';
			// option.series[0].showAllSymbol = true;
			var dates = [];
			var oldTime = "2017-01-01/00:00:00"
			var dat = new Date(oldTime).getTime();
			var time = new Date().getTime();
			var newTime;

			function times(a)
			{
				var t = new Date(a);
				var y = t.getFullYear();
				var m = t.getMonth() + 1;
				var d = t.getDate();
				if (m < 10)
				{
					m = "0" + m
				}
				if (d < 10)
				{
					d = "0" + d
				}
				newTime = y + "-" + m + "-" + d;
			}

			var total = time - dat;
			for (var i = dat; i <= time; i = i + 86400000)
			{
				times(i);
				dates.push(newTime);
			}
			option.xAxis[0].data = dates;
		}
	}
}