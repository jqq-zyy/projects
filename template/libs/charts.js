/**
 * Created by admin on 2017/2/10.
 */
var _isLoaded = false;
var _basePath = "";
var _el = "";
var _option;

function createCharts($option, $el, $basePath)
{
//    _basePath = $basePath;
//    _el = $el;
//    _option = $option;
	if (!_isLoaded)
	{
		loadScript($option, $el, $basePath);
	}
	else
	{
		startRend($option, $el, $basePath)
	}
}

function loadScript($option, $el, $basePath)
{
	var script = document.createElement('script');
	script.src = $basePath + "/echarts.js";
	script.onload = ()=>
	{
		_isLoaded = true;
		startRend($option, $el, $basePath);
	}
	document.head.appendChild(script);
}

function startRend($option, $el, $basePath)
{
	require.config({
		paths: {
			echarts: $basePath
		}
	});

	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec)
		{
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById($el));
			myChart.setOption($option);
		});
}

var _isLoadedMap = false;
function createChartsMap($option, $el, $basePath)
{
//    _basePath = $basePath;
//    _el = $el;
//    _option = $option;
	if (!_isLoadedMap)
	{
		loadScripMap($option, $el, $basePath);
	}
	else
	{
		startRendMap($option, $el, $basePath)
	}
}

function loadScripMap($option, $el, $basePath)
{
	var script = document.createElement('script');
	script.src = $basePath + "/echarts.js";
	script.onload = ()=>
	{
		_isLoadedMap = true;
		startRendMap($option, $el, $basePath);
	}
	document.head.appendChild(script);
}

function startRendMap($option, $el, $basePath)
{
	require.config({
		paths: {
			echarts: $basePath
		}
	});

	require(
		[
			'echarts',
			'echarts/chart/map',
			'echarts/chart/pie'
		],
		function (ec)
		{
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById($el));

			myChart.setOption($option);
		});
}

function createChartsClientOS($option, $el, $basePath)
{
//	_basePath = $basePath;
//	_el = $el;
//	_option = $option;
	if (!_isLoadedMap)
	{
		loadScripClientOS($option, $el, $basePath);
	}
	else
	{
		startRendClientOS($option, $el, $basePath)
	}
}

function loadScripClientOS($option, $el, $basePath)
{
	var script = document.createElement('script');
	script.src = $basePath + "/echarts.js";
	script.onload = ()=>
	{
		_isLoadedMap = true;
		startRendClientOS($option, $el, $basePath);
	}
	document.head.appendChild(script);
}

function startRendClientOS($option, $el, $basePath)
{
	require.config({
		paths: {
			echarts:  $basePath
		}
	});

	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec)
		{
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById($el));
			myChart.setOption($option);
		});
}

function createChartsClientModel($option, $el, $basePath)
{
//	_basePath = $basePath;
//	_el = $el;
//	_option = $option;
	if (!_isLoadedMap)
	{
		loadScripClientModel($option, $el, $basePath);
	}
	else
	{
		startRendClientModel($option, $el, $basePath)
	}
}

function loadScripClientModel($option, $el, $basePath)
{
	var script = document.createElement('script');
	script.src = $basePath + "/echarts.js";
	script.onload = ()=>
	{
		_isLoadedMap = true;
		startRendClientModel($option, $el, $basePath);
	}
	document.head.appendChild(script);
}

function startRendClientModel($option, $el, $basePath)
{
	require.config({
		paths: {
			echarts: $basePath
		}
	});

	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec)
		{
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById($el));
			myChart.setOption($option);
		});
}
