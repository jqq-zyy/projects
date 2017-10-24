/**
 * Created by billy on 2017/7/5.
 */
export var _isLoaded = false;
var _basePath = "";
window._el = Object.create(null);
window._option = Object.create(null);
window._typeList = Object.create(null);
window._hash = Object.create(null);

exports.load = function ($el, $typeList, $option, $basePath, $id) {
	_basePath = $basePath;
	if (!_isLoaded)
	{
		loadScript($id, $option, $el, $typeList);
	}
	else
	{

		startRend($id, $option, $el, $typeList);

	}

}

function loadScript($id, $option, $el, $typeList)
{
	var script = document.createElement('script');
	script.src = _basePath + "/echarts.js";
	script.onload = () => {
		_isLoaded = true;
		startRend($id, $option, $el, $typeList);

	}
	document.head.appendChild(script);

}

function startRend($id, $option, $el, $typeList)
{

	window.require.config({
		paths: {
			echarts: _basePath
		}
	});
	if (!_hash[$id])
	{
		_typeList[$id] = $typeList
		var list = ['echarts']
		for (var typeItem of _typeList[$id])
		{
			list.push('echarts/chart/' + typeItem);
		}
	}

	window.require(list, function (ec) {
		if (!_hash[$id])
		{
			_option[$id] = $option;
			_el[$id] = $el;
			window.myChart = ec.init(document.getElementById(_el[$id]));
			_hash[$id] = myChart;
			_hash[$id].setOption(_option[$id]);
			g.event.dispatchEvent("LOAD_FINISHED");
		}

	});

}