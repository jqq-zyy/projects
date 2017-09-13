/**
 * Created by billy on 2016/12/22.
 */
/**
 * Created by Administrator on 2016/12/25.
 */
import g from "../../global";
import RouterList from "../../router";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import * as loginManager from "./LoginManager";
import socketManager from "./SocketManager";

var _initList = [];
_initList.push(initGlobal);
//_initList.push(initLogin);
_initList.push(initStaticData);
_initList.push(initSocket);

export function init($callback)
{
	//平台初始化
	g.core.initConfig(WEB_CONFIG);
	g.core.initApp("#app", RouterList, _initList, {
		plugin: Mint
	}).then(()=>
	{
		g.core.start();
	});

	if (g.core.onMode("debug"))
	{
		window.g = g;
	}
}

//初始化登录状态
//function initLogin()
//{
//	loginManager.init(()=>
//	{
//		this.apply();
//	});
//}



//初始化全局方法
function initGlobal()
{
	g.core.initGlobal(g);
	this.apply();
}

//初始化静态数据
function initStaticData()
{
	g.data.initStaticData();
	this.apply();
}

function initSocket()
{
	trace(socketManager)
	socketManager.init();
	if(loginManager.isLogin){
		socketManager.connectSocket()
	}
	this.apply();
}







