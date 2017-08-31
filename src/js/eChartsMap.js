/**
 * Created by billy on 2017/2/10.
 */
import g from '../global';

var _el = '';
var option = {
	backgroundColor: '#fff',
	tooltip: {
		trigger: 'item'
	},
	dataRange: {
		min: 0,
		max: 0,
		x: 'left',
		y: 'bottom',
		text: ['高', '低'],           // 文本，默认为数值文本
		calculable: true
//		color:[  '#d73027', '#a50026','#e0f3f8', '#ffffbf', '#fee090','#fdae61','#f46d43']

	},





	series: [
		{
			name: '人数',
			type: 'map',
			mapType: 'china',
			roam: false,
			itemStyle: {
				normal: {label: {show: true}},
				emphasis: {label: {show: true}}

			},
			data: []
		}
	]
};
export default ($el, $dObj, $max)=>
{
	_el = $el;
	if (_el == "")
	{
		return;
	}
	formatData($dObj, $max)
	if (window.createChartsMap)
	{
		window.createChartsMap(option, _el, g.core.webParam.path.libs)
	}
}

/**
 * 格式化数据，将后端数据结构转换为图表需要的数据结构
 * @param $dObj 后端接口返回的数据
 * @returns {{}}
 */
function formatData($dObj, $max)
{
	var data = $dObj;
	var province = [];
	for (var i = 0; i < data.length; i++)
	{
		var objPro = {};
		objPro.name = data[i].regionName;
		objPro.value = data[i].regionCount;
		province.push(objPro);
	}
	option.dataRange.max = $max;
	option.series[0].data = province;
}


