/**
 * Created by Administrator on 2017/4/13.
 */
import * as LoginManager from "./manager/LoginManager";
import g from "../global";
import EXIF from './exif.js';
export function showErrMsg($errObj)
{
	if ($errObj.error == 4000)
	{
		g.ui.toast('系统错误');
		return;
	}
	if ($errObj.error == 4002)
	{
		g.ui.toast('系统错误');
		return;
	}
	if ($errObj.error == 4004)
	{
		g.ui.toast('表单缺少必要字段');
		return;
	}
	if ($errObj.error == 4005)
	{
		g.ui.toast('当前状态未登录，请前往登录页面登录');
		LoginManager.logout(true, true);
	}
	if ($errObj.error == 4006)
	{
		g.ui.toast('登录变化，请重新登陆');
		LoginManager.logout(true, true);

	}
	else
	{
		g.ui.toast($errObj.errorMsg);
		return;

	}
}

export function getStrLength(str)
{
	var cArr = str.match(/[^\x00-\xff]/ig);
	return str.length + (cArr == null ? 0 : cArr.length);
}

export function dealErr($errObj)
{
	g.ui.hideLoading();
	if ($errObj.errorData.errorMsg)
	{
		showErrMsg($errObj.errorData);
	}
	else
	{
		g.ui.toast($errObj.errorMsg);
		if ($errObj.errorMsg == '未登录，请先登录.')
		{
			LoginManager.logout(true, true);
		}
	}
}

export function getBase64($imgFile, $quality, $width, $height)
{
	var b = window.URL.createObjectURL($imgFile);
	var img = new Image();
	var Orientation = null;
	var imgInfo = getImgInfo($imgFile);

	function getImgInfo($imgFile)
	{
		var result = {};
		//获取照片方向角属性，用户旋转控制
		EXIF.getData($imgFile, function ()
		{
			try
			{
				EXIF.getAllTags(this);
				result.Orientation = EXIF.getTag(this, 'Orientation');
			}
			catch (e)
			{
				result.Orientation = 0;
			}
		});

		return result;
	};
	var promise = new Promise((okFunc, errFunc)=>
	{

		img.onload = ()=>
		{
			// 默认按比例压缩
			var w = img.width,
				h = img.height,
				scale = w / h;
			if (img.width < 800 && img.height < 800)
			{

				w = $width || w;
				h = $height || (w / scale);
			}
			;
			if (img.width > 100 && !$width)
			{

				w = 600;
				w = $width || w;
				h = $height || (w / scale);
			}
			else if (img.height > 100 && !$height)
			{
				img.height = 600;

				w = $width || w;
				h = $height || (w / scale);
			}
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
			var base64 = canvas.toDataURL("image/jpeg", 0.7);
			if (imgInfo.Orientation && imgInfo.Orientation != 0)
			{
				var mpImg = new MegaPixImage($imgFile);
				mpImg.onrender = onRotate_img;
				mpImg.render(canvas, {
					maxWidth: w,
					maxHeight: h,
					quality: 1,
					orientation: imgInfo.Orientation
				});
			}
			else
			{
				onRotate_img();
			}

			function onRotate_img()
			{

				var ua = navigator.userAgent;
				if (ua.match(/Android/i))
				{
					var encoder = new JPEGEncoder();
					base64 = encoder.encode(ctx.getImageData(0, 0, w, h), $options.quality * 100 || 80);
				}
				else
				{
					base64 = canvas.toDataURL("image/jpeg", 0.7);
					okFunc(base64);
				}

			}
		};
		img.src = b;
	});
	return promise;
}

export function getCityList($id, $callback)
{
	g.net.call("config/getCityList", {
		"provinceId": $id
	}).then(($data)=>
	{
		var areaItem = g.data.areaPool.getDataById($id);
		areaItem.cityList = $data.data;
		if ($callback)
		{
			$callback();
		}
	}, (err)=>
	{
		g.func.dealErr(err);
	});
}

export function getUnreadMsg($callBack)
{
	g.net.call("message/getUnreadMessageList").then(($data)=>
	{
		g.data.unReadMsgPool.update($data);
		if ($callBack == 'login')
		{
			g.event.dispatchEvent("APP_IS_LOGIN");
		}
		else
		{
			$callBack();
		}
	}, (err)=>
	{
		g.func.dealErr(err);
	});
}

