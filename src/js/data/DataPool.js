/**
 * Created by billy on 2016/12/19.
 */
import g from "../../global";
import UserInfo from "./UserInfo";
import LangPool from "./LangPool";
import NavPool from "./NavPool";
import ActivityPool from "./ActivityPool";
import ActivityStatusPool from "./ActivityStatusPool";
import QRcodePool from "./QRcodePool";
import StaffPool from "./StaffPool";
import RolePool from "./RolePool";
import PowerPool from "./PowerPool";
import ActivityDetailPool from "./ActivityDetailPool";
import MessagePool from "./MessagePool";
import UnReadMsgPool from "./UnReadMsgPool";
import UserPool from "./UserPool";
import UserDetailPool from "./UserDetailPool";
import BagPool from "./BagPool";
import BagDetailPool from "./BagDetailPool";
import PlatformPool from "./PlatformPool";
import RulePool from "./RulePool";
import StaticTableHeaderPool from "./StaticTableHeaderPool";

export var userInfo = new UserInfo(); //用户信息
export var langPool = new LangPool(); //语言包数据池
export var navPool = new NavPool(); //侧边栏数据池
export var activityPool = new ActivityPool(); //活动列表数据池
export var activityStatusPool = new ActivityStatusPool(); //活动状态
export var qrcodePool = new QRcodePool(); //二维码
export var staffPool = new StaffPool(); //我的员工
export var rolePool = new RolePool(); //角色列表
export var powerPool = new PowerPool(); //权限列表
export var activityDetailPool = new ActivityDetailPool(); //活动详情
export var messagePool = new MessagePool(); //消息通知
export var unReadMsgPool = new UnReadMsgPool(); //未读消息
export var userPool = new UserPool(); //商户列表信息
export var userDetailPool = new UserDetailPool(); //商户详情信息
export var bagPool = new BagPool(); //红包账户
export var bagDetailPool = new BagDetailPool(); //红包详情
export var platformPool = new PlatformPool(); //平台财务信息
export var rulePool = new RulePool(); //平台活动规则
export var staticTableHeaderPool = new StaticTableHeaderPool(); //平台活动规则

export function initStaticData()
{
	var staticData = g.data.staticData;
	initLang(staticData);
	navPool.update(staticData["nav.json"]);

}

function initLang($staticData)
{
	langPool.init($staticData["lang/langList.json"]);
	(g.setLang = ($lang)=>
	{
		langPool.setLang($lang);
		g.langPool.setLang($staticData["lang/" + $lang + ".json"]);
	})(g.core.webParam.param.defaultLang);
}
export function removeAll()
{
	userInfo.removeAll();
	activityPool.removeAll();
	activityStatusPool.removeAll();
	qrcodePool.removeAll();
	staffPool.removeAll();
	rolePool.removeAll();
	powerPool.removeAll();
	activityDetailPool.removeAll();
	messagePool.removeAll();
	unReadMsgPool.removeAll()
}


