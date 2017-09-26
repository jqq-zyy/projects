/**
 * Created by Scc on 2017/3/28.
 */
import g from "../../global";

export var isLogin = false;
export function init($callback)
{
	initLocalStorage($callback);
}

function initLocalStorage($callback)
{
	var loginTime = int(g.data.get("loginTime"));
	var nowTime = g.timeTool.getNowStamp();
	if ((nowTime - loginTime) > g.core.webParam.param.loginExpires)
	{
		//本地缓存已过期，登录状态过期
		logout(true, true); //登出
		$callback();
	}
	else
	{
		//本地缓存未过期
		isLogin = true;

		g.net.call('user/queryUserIsLogin').then((d) =>
		{
			goLogin(false);
			g.func.getUnreadMsg($callback);
		}, (error)=>
		{
			//后端未登录
			logout(true, true);
			$callback();
		});
		
	}
}

/**
 * login页面  已登录 不理会
 * login页面  未登录 【登出】 <跳登录页> 监听登录
 * 非login框架页  已登录  不理会
 * 非login框架页  未登录 【登出】  <跳登录页>  监听登录
 * 无需登录页    已登录   不理会
 * 无需登录页    未登录  【登出】 监听登录
 * 【退登】 跳登录页  监听登录
 */
//是否跳登录页，是否监听登录
export function logout($toLogin = true, $goLogin = false)
{
	isLogin = false;
	g.net.call("user/userLoginOut").then((d)=>
	{
		clearLoginInfo();
		if ($toLogin)
		{
			goLogin(false, true);
		}
	}, (err)=>
	{
		clearLoginInfo();
		if ($toLogin)
		{
			goLogin(false, true);
		}
	});
}
/**
 * 前往登录页面，并在登录后跳转到指定页面
 * @param $beBack true 跳转到当前页面 / false跳回首页
 */
export function goLogin($beBack = false, $goLogin = true)
{
	var backPath = "/user"; //跳转的地址：默认首页
	var currPath = g.url; //当前页地址

	if (isLogin)
	{
		if (currPath == "/login")
		{
			doInit(backPath);
		}
		else
		{
			doInit();
		}
	}
	else
	{
		$beBack && (backPath = currPath);
		g.event.addEventListener("APP_IS_LOGIN", ()=>
		{
			isLogin = true;
			doInit(backPath);
			//Vue.component('bind-pop', BindPop);
		}, this);
		if ($goLogin)
		{
			doInit("/login");
		}
	}
}

function doInit($toUrl = "")
{
	if ($toUrl != "")
	{
		trace("$toUrl=====", $toUrl);
		g.url = $toUrl;
	}

}

function clearLoginInfo()
{
	g.data.clear("loginTime");
	g.data.clear("userInfo");
	g.data.clearAll();
}


