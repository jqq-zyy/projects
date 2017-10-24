/**
 * Created by billy on 2017/2/10.
 */
import g from "../../global";
import * as loader from "./loader";

var _chartsHash = {};
_chartsHash["line"] = require('./chart/line').default;
_chartsHash["bar"] = require('./chart/bar').default;
_chartsHash["map"] = require('./chart/map').default;

var _typeList;

export default ($el, $option, $dataList, $xAxis, $func, $id) => {

	if ($el == "")
	{
		return;
	}
	if (!document.getElementById($el))
	{
		return;
	}

	_typeList = [];
	var option = createData($option, $dataList, $xAxis);

// 	debugger;
	if (!$dataList[0].isSet||!_hash[$id])
	{
		loader.load($el, _typeList.concat([]), option, g.core.webParam.path.libs, $id);
	}
	else
	{
		_hash[$id].setOption(option, true);
	}

	if($func){
		g.event.addEventListener("LOAD_FINISHED", () => {
			$func();
		});
	}


}

/**
 *
 * @param $option
 * @param $dataList   [{name:'',list:[],index:0,color:'',lineStyle:{}}]
 * @param $xAxis
 */
function createData($option, $dataList, $xAxis = [])
{
	var option = __merge({}, $option);
	if ($dataList[0].type !== "map" && $dataList[0].type !== "pie")
	{
		option.xAxis[0].data = $xAxis;
	}
	option.legend.data = [];
	option.series = [];
	option.color = [];
	for (var dataItem of $dataList)
	{
		if (dataItem.name)
		{
			var chartType = dataItem.type || "line";
			if (_typeList.indexOf(chartType) <= 0)
			{
				_typeList.push(chartType);
			}

			var tempSerieData = __merge({}, _chartsHash[chartType]);
			tempSerieData.name = dataItem.name
			if ($dataList[0].type == "pie")
			{
				option.legend.data = dataItem.name;
			}
			else
			{
				option.legend.data.push(dataItem.name);
			}

			if (dataItem.index)
			{
				tempSerieData.yAxisIndex = dataItem.index;
			}

			if (dataItem.mapType)
			{
				tempSerieData.mapType = dataItem.mapType;
			}

			if (dataItem.lineStyle)
			{
				tempSerieData.itemStyle.normal.lineStyle = {type: dataItem.lineStyle};
			}
			if (dataItem.itemStyle)
			{
				tempSerieData.itemStyle = dataItem.itemStyle;
			}
			if (dataItem.type)
			{
				tempSerieData.type = dataItem.type;
			}
			if (dataItem.radius)
			{
				tempSerieData.radius = dataItem.radius;
			}
			if (dataItem.color)
			{
				option.color.push(dataItem.color);
			}

			tempSerieData.data = [];
			if (dataItem.type == "map" || $dataList[0].type == "pie")
			{
				tempSerieData.data = dataItem.list;

			}
			else
			{
				var numList = dataItem.list;
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
									symbol: 'circle',
									symbolSize: 8
								});
						}
						else if (num == min)
						{
							tempSerieData.data.push(
								{
									value: num,
									symbol: 'circle',
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
			}
			option.series.push(tempSerieData);

		}
	}
	return option;
}