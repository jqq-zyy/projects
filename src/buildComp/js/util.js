export function oneOf($value, validList)
{
	if (typeOf(validList) == 'array')
	{
		return checkValid(validList);
	}
	else
	{
		var newList = Array.prototype.slice.call(validList);
		if (typeOf(newList) == 'array')
		{
			return checkValid(newList);
		}
	}
	function checkValid($list)
	{
		if ($list.indexOf($value) >= 0)
		{
			return true;
		}
		return false;
	}

}

export function typeOf(obj)
{
	const toString = Object.prototype.toString;
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	return map[toString.call(obj)];
}

export function removeHTMLTag(str)
{
	str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
	str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
	str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
	return str;
}

export var offset = {
	left($el)
	{
		var actualLeft = $el.offsetLeft;
		var current = $el.offsetParent;
		while (current != null)
		{
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}

		return actualLeft;
	},
	top($el)
	{
		var actualTop = $el.offsetTop;
		var current = $el.offsetParent;
		while (current != null)
		{
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}

		return actualTop;
	}
};

export function getWindowSize($type)
{
	return window["inner" + $type] || document.documentElement["client" + $type] || document.body["client" + $type]
}

export function getDocSize($type)
{
	return document.documentElement["client" + $type] || document.body["client" + $type]
}

export var scroll = {
	top($el)
	{
		return !!$el ? $el.scrollTop : document.body.scrollTop;
	},
	left($el)
	{
		return !!$el ? $el.scrollLeft : document.body.scrollLeft;
	},
	height($el)
	{
		return !!$el ? $el.scrollHeight : document.body.scrollHeight;
	},
	width($el)
	{
		return !!$el ? $el.scrollWidth : document.body.scrollWidth;
	}
}

export function getBase64()
{
	var b = window.URL.createObjectURL($imgFile);
	var img = new Image();
	var promise = new Promise((okFunc, errFunc)=>
	{
		img.onload = ()=>
		{
			// 默认按比例压缩
			var w = img.width,
				h = img.height,
				scale = w / h;
			w = g.param.width || w;
			h = g.param.height || (w / scale);
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// 创建属性节点
			var anw = document.createAttribute("width");
			anw.nodeValue = w;
			var anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(img, 0, 0, w, h);
			var quality = $quality || 0.7; // 默认图片质量为0.5
			var base64 = canvas.toDataURL('image/jpeg', quality * 10);
			// 回调函数返回base64的值
			okFunc(base64);
		};
		img.src = b;
	});
	return promise;
}

function isImg(src)
{
	var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
	var Filter = /(?:bmp|cis\-cod|gif|ief|jpeg|jpeg|jpeg|pipeg|png|svg\+xml|tiff|x\-cmu\-raster|x\-cmx|x\-icon|x\-portable\-anymap|x\-portable\-bitmap|x\-portable\-graymap|x\-portable\-pixmap|x\-rgb|x\-xbitmap|x\-xpixmap|x\-xwindowdump)$/i;
	return rFilter.test(src) || Filter.test(src);
}
export function insertOneInArray($list, $item)
{
	var index = $list.indexOf($item);
	if (index >= 0)
	{
		return;
	}
	$list.push($item);
}

export function pushIn($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) < 0)
	{
		$list.push($item)
	}
}

export function splice($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) >= 0)
	{
		$list.splice($list.indexOf($item), 1)
	}
}

export function insertOneOrZero($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) < 0)
	{
		$list.push($item);
	}
	else
	{
		$list.splice($list.indexOf($item), 1)
	}
}