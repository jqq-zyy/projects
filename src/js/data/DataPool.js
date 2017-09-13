/**
 * Created by billy on 2016/12/19.
 */
import g from "../../global";
import UserInfo from "./UserInfo";
import RightPool from "./RightPool";
import LangPool from "./LangPool";
import NavPool from "./NavPool";
import BatchPool from "./BatchPool";
import ActivityPool from "./ActivityPool";
import MemberPool from "./MemberPool";
import ActivityRolePool from "./ActivityRolePool";
import ActivityStatusPool from "./ActivityStatusPool";
import QRcodePool from "./QRcodePool";
import RechargePool from "./RechargePool";
import AllDataPool from "./AllDataPool";
import StaffPool from "./StaffPool";
import RolePool from "./RolePool";
import PowerPool from "./PowerPool";
import BagReceivePool from "./BagReceivePool";
import ActivityDetailPool from "./ActivityDetailPool";
import ActivityRecordPool from "./ActivityRecordPool";
import MessagePool from "./MessagePool";
import UnReadMsgPool from "./UnReadMsgPool";

import UserPool from "./UserPool";
import UserDetailPool from "./UserDetailPool";
import BagPool from "./BagPool";
import BagDetailPool from "./BagDetailPool";
import PlatformPool from "./PlatformPool";

export var userInfo = new UserInfo(); //用户信息
export var rightPool = new RightPool(); //权限数据池
export var langPool = new LangPool(); //语言包数据池
export var navPool = new NavPool(); //侧边栏数据池
export var batchPool = new BatchPool(); //可关联批次数据池
export var activityPool = new ActivityPool(); //活动列表数据池
export var memberPool = new MemberPool(); //会员列表

export var activityRolePool = new ActivityRolePool(); //活动规则
export var activityStatusPool = new ActivityStatusPool(); //活动状态
export var qrcodePool = new QRcodePool(); //二维码

export var rechargePool = new RechargePool(); //充值记录
export var allDataPool = new AllDataPool(); //数据概览
export var staffPool = new StaffPool(); //我的员工
export var rolePool = new RolePool(); //角色列表
export var powerPool = new PowerPool(); //权限列表
export var bagReceivePool = new BagReceivePool(); //红包领取记录
export var activityDetailPool = new ActivityDetailPool(); //活动详情
export var activityRecordPool = new ActivityRecordPool(); //活动详情
export var messagePool = new MessagePool(); //消息通知
export var unReadMsgPool = new UnReadMsgPool(); //未读消息


export var userPool = new UserPool(); //商户列表信息
export var userDetailPool = new UserDetailPool(); //商户详情信息
export var bagPool = new BagPool(); //红包账户
export var bagDetailPool = new BagDetailPool(); //红包详情
export var platformPool = new PlatformPool(); //平台财务信息





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



