/**
 * Created by billy on 2016/11/30.
 */
import Index from "./pages/index.vue";
import IndexMain from "./pages/index";
import UpcoimgTask from "./pages/task.vue";
import UpcoimgTaskMain from "./pages/task";
import myStaff from "./pages/myStaff.vue";
import myStaffMain from "./pages/myStaff";
import Role from "./pages/role.vue";
import RoleMain from "./pages/role";
import Activity from "./pages/activity.vue";
import ActivityMain from "./pages/activity";
import Login from "./pages/login.vue";
import LoginMain from "./pages/login";
import userDetail from "./pages/userDetail.vue";
import userDetailMain from "./pages/userDetail";
import UserList from "./pages/userList.vue";
import UserListMain from "./pages/userList";
import ActivityDetail from "./pages/activityDetail.vue";
import ActivityDetailMain from "./pages/activityDetail";
import QrcodeAccount from "./pages/qrcodeAccount.vue";
import QrcodeAccountMain from "./pages/qrcodeAccount";
import BagAccount from "./pages/bagAccount.vue";
import BagAccountMain from "./pages/bagAccount";
import BagDetail from "./pages/bagDetail.vue";
import BagDetailMain from "./pages/bagDetail";
import Addplatform from "./pages/addplatform.vue";
import AddplatformMain from "./pages/addplatform";
import Platform from "./pages/platform.vue";
import PlatformMain from "./pages/platform";
import Chart from "./pages/chart.vue";
import Rule from "./pages/rule.vue";
import RuleMain from "./pages/rule";
import CheckQrcode from "./pages/checkQrcode.vue";
import Personal from "./pages/personal.vue";
import PersonalMain from "./pages/personal";
export default [
	{
		path: '/',
		name: "首页",
		component: Index,
		preload: IndexMain
	}, {
		path: '/activity',
		name: "活动列表页",
		component: Activity,
		preload: ActivityMain
	}, {
		path: '/activitydetail',
		name: "活动详情",
		component: ActivityDetail,
		preload: ActivityDetailMain
	}, {
		path: '/qrcode',
		name: "二维码账户",
		component: QrcodeAccount,
		preload: QrcodeAccountMain
	}, {
		path: '/bag',
		name: "红包账户",
		component: BagAccount,
		preload: BagAccountMain
	}, {
		path: '/bagdetail',
		name: "红包账户详情",
		component: BagDetail,
		preload: BagDetailMain
	}, {
		path: '/platform',
		name: "红包账户详情",
		component: Platform,
		preload: PlatformMain
	}, {
		path: '/addplatform',
		name: "红包账户详情",
		component: Addplatform,
		preload: AddplatformMain
	}, {
		path: '/chart',
		name: "图表分析",
		component: Chart
//		preload: ChartMain
	},
	{
		path: '/rule',
		name: "规则设置",
		component: Rule,
		preload: RuleMain
	},
	{
		path: '/login',
		name: "登录",
		component: Login,
		preload: LoginMain
	}, {

		path: '/task',
		name: "待办任务",
		component: UpcoimgTask,
		preload: UpcoimgTaskMain
	}, {
		path: '/personal',
		name: "个人",
		component: Personal,
		preload: PersonalMain
	},
	{
		path: '/user',
		name: "商户列表",
		component: UserList,
		preload: UserListMain
	}, {
		path: '/staff',
		name: "我的员工",
		component: myStaff,
		preload: myStaffMain
	}, {
		path: '/userdetail',
		name: "商户详情",
		component: userDetail,
		preload: userDetailMain
	}, {
		path: '/role',
		name: "权限设置",
		component: Role,
		preload: RoleMain
	}, {
		path: '/checkqrcode',
		name: "查找二维码",
		component: CheckQrcode,
//		preload: checkQrcodeMain
	}
];






