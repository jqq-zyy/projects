/**
 * Created by billy on 2017/2/10.
 */
import g from '../global';

var _el = '';

var option = {
	tooltip: {
		trigger: 'axis'
	},

	calculable: true,
	xAxis: {
		type: 'category',
		data: []
	}
	,
	yAxis: [
		{
			type: 'value'
		}
	],
	series: [
		{
			name: '会员扫码次数分布',
			type: 'bar',
			itemStyle: {
				normal: {
					color: function(params) {
						// build a color map as your need.
						var colorList = [
							'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
							'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
						];
						return colorList[params.dataIndex]
					},
					label: {
						show: true,
						position: 'top',
						formatter: '{b}\n{c}'
					}
				}
			},
			data: []
		}
	]
};

export default ($el, $dObj)=>
{
	_el = $el;
	if (_el == "")
	{
		return;
	}
	formatData($dObj)
	if (window.createChartsClientOS)
	{
		window.createChartsClientOS(option, _el, g.core.webParam.path.libs)
	}
}

/**
 * 格式化数据，将后端数据结构转换为图表需要的数据结构
 * @param $dObj 后端接口返回的数据
 * @returns {{}}
 */

function formatData($dObj)
{
	var data = $dObj;
	if (data.length == 0)
	{
		option.series = [
			{
				name: '暂无数据',
				type: 'bar',
				stack: '总量',
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'insideRight'
						}
					}
				},
				data: [0]
			}
		]
	}
	else
	{
		var legend = [];
		var clientOS = [];
		var xInfo = [];
		for (var i = 0; i < data.length; i++)
		{
			var objPro = {};
			objPro.data = [];
			objPro.name = data[i].sweepRange;
			objPro.data.push(data[i].sweepCount);
			objPro.type = "bar";
			clientOS.push(objPro);
			legend.push(data[i].sweepRange);
			xInfo.push(data[i].sweepCount)
		}
		option.xAxis.data =  legend;
		option.series[0].data = xInfo ;

	}

}
