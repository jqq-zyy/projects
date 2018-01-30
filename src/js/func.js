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

export function changeTimeList($list){
	let partList = g.data.echartDatePartPool.list
	for(var i =0;i<partList.length;i++){
		if($list.length>=partList[i].min&&$list.length<=partList[i].max){
			return partList[i].part
		}
	}

	return  0;
}
