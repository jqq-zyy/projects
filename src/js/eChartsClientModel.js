/**
 * Created by billy on 2017/2/10.
 */
import g from '../global';

var _el = '';

var option = {
	tooltip: {
		trigger: 'item',
		formatter: "{b} : {c} ({d}%)"
	},
	backgroundColor: '#fff',
	legend: {
		orient: 'vertical',
		x: 'left',
		data: []
	},
	calculable: true,
	series: [
		{
			type:'pie',
			radius : [50, 110],
//			itemStyle: {
//				normal: {
//					label: {
//						show: false
//					},
//					labelLine: {
//						show: false
//					}
//				},
//				emphasis: {
//					label: {
//						show: true,
//						position: 'center',
//						textStyle: {
//							fontSize: '30',
//							fontWeight: 'bold'
//						}
//					}
//				}
//			},
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
	if (window.createChartsClientModel)
	{
		window.createChartsClientModel(option, _el, g.core.webParam.path.libs)
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
		option.series[0].data = [
			{
				value: 0,
				name: ''
			}
		];
		option.legend.data = [];
	}
	else
	{
		var legend = [];
		var clientOS = [];
		for (var i = 0; i < data.length; i++)
		{
			var objPro = {};
			objPro.name = data[i].sexName;
			objPro.value = data[i].sexCount;
			clientOS.push(objPro);
			legend.push(data[i].sexName);
		}
		option.legend.data = legend;
		option.series[0].data = clientOS;
	}

}













