// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';
var CleanCSS = require('clean-css');
var fs = require('fs');

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('../webpack.production.config')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = "release";
rm('-rf', assetsPath)
mkdir('-p', assetsPath);
cp('-R', 'assets/', assetsPath + '/assets/')
cp('-R', 'template/libs/', assetsPath + '/libs/');
cp('-R', 'template/', assetsPath + '/');

webpack(webpackConfig, function (err, stats)
{
	spinner.stop();
	if (err)
	{
		throw err
	}
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n');

	cssmin();
})

function cssmin()
{
	spinner = ora('now start to compress css, please waiting...');
	spinner.start();
	var cssFilePath;

	setTimeout(function ()
	{
		fs.readdir(assetsPath + '/css', onCompleteDir_fs);
	}, 1000);

	function onCompleteDir_fs(err, data)
	{
		if (err)
		{
			throw err;
		}

		if (Array.isArray(data) && data.length > 0)
		{
			cssFilePath = assetsPath + '/css' + '/' + data[0];
			readCss();
		}
	}

	function readCss()
	{
		fs.readFile(cssFilePath, 'utf-8', function (err, data)
		{
			if (err)
			{
				throw err;
			}
			new CleanCSS({}).minify(data, onComplete_cleanCss);
		})
	}

	function onComplete_cleanCss(err, output)
	{
		fs.writeFile(cssFilePath, output.styles, function (err, data)
		{
			if (err)
			{
				throw err;
			}
			spinner.stop();
			console.log("All Done!------------------------------------------------------------------")
		});
	}
}