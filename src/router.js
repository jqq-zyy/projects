/**
 * Created by billy on 2016/11/30.
 */
import Index from "./pages/index.vue";
import IndexMain from "./pages/index";
import ActivityDetail from "./pages/activityDetail.vue";
import ActivityDetailMain from "./pages/activityDetail";
import AddActivity from "./pages/addActivity.vue";
import AddActivityMain from "./pages/addActivity";
import AddStaff from "./pages/addStaff.vue";
import AddStaffMain from "./pages/addStaff";
import AllData from "./pages/allData.vue";
import AllDataMain from "./pages/allData";
import CompanyInfo from "./pages/companyInfo.vue";
import CompanyInfoMain from "./pages/companyInfo";
import Explain from "./pages/explain.vue";
import ExplainMain from "./pages/explain";
import Login from "./pages/login.vue";
import LoginMain from "./pages/login";
import MemberList from "./pages/memberList.vue";
import MemberListMain from "./pages/memberList";
import MemberManage from "./pages/memberManage.vue";
import MemberManageMain from "./pages/memberManage";
import ModPwd from "./pages/modPwd.vue";
import ModPwdMain from "./pages/modPwd";
import MyActivity from "./pages/myActivity.vue";
import MyActivityMain from "./pages/myActivity";
import MyBill from "./pages/myBill.vue";
import MyBillMain from "./pages/myBill";
import MyQRcode from "./pages/myQRcode.vue";
import MyQRcodeMain from "./pages/myQRcode";
import myStaff from "./pages/myStaff.vue";
import myStaffMain from "./pages/myStaff";
import PersonalInfo from "./pages/personalInfo.vue";
import PersonalInfoMain from "./pages/personalInfo";
import Role from "./pages/role.vue";
import RoleMain from "./pages/role";
import Sign from "./pages/sign.vue";
import SignMain from "./pages/sign";
import Warning from "./pages/warning.vue";
import WarningMain from "./pages/warning";
import MyBag from "./pages/myBag.vue";
import MyBagMain from "./pages/myBag";
import BindAlipay from "./pages/bindAlipay.vue";
import BindAlipayMain from "./pages/bindAlipay";

export default [
	{
		path: '/',
		name: "首页",
		component: Index,
		preload: IndexMain
	}, {
		path: '/activitydetail',
		name: "活动详情",
		component: ActivityDetail,
		preload: ActivityDetailMain
	}, {
		path: '/addactivity',
		name: "添加活动",
		component: AddActivity,
		preload: AddActivityMain
	}, {
		path: '/addstaff',
		name: "添加员工",
		component: AddStaff,
		preload: AddStaffMain
	}, {
		path: '/data',
		name: "数据概览",
		component: AllData,
		preload: AllDataMain
	}, {
		path: '/companyinfo',
		name: "企业认证信息",
		component: CompanyInfo,
		preload: CompanyInfoMain
	}, {
		path: '/explain',
		name: "使用说明",
		component: Explain,
		preload: ExplainMain
	}, {
		path: '/login',
		name: "登录",
		component: Login,
		preload: LoginMain
	}, {
		path: '/member',
		name: "顾客分析",
		component: MemberList,
		preload: MemberListMain
	}, {
		path: '/membermanage',
		name: "会员设置",
		component: MemberManage,
		preload: MemberManageMain
	}, {
		path: '/modpwd',
		name: "修改密码",
		component: ModPwd,
		preload: ModPwdMain
	}, {
		path: '/activity',
		name: "我的活动",
		component: MyActivity,
		preload: MyActivityMain
	}, {
		path: '/bill',
		name: "我的账单充值消费记录",
		component: MyBill,
		preload: MyBillMain
	}, {
		path: '/qrcode',
		name: "我的二维码",
		component: MyQRcode,
		preload: MyQRcodeMain
	}, {
		path: '/staff',
		name: "我的员工",
		component: myStaff,
		preload: myStaffMain
	}, {
		path: '/personal',
		name: "基本信息",
		component: PersonalInfo,
		preload: PersonalInfoMain
	}, {
		path: '/role',
		name: "权限设置",
		component: Role,
		preload: RoleMain
	}, {
		path: '/sign',
		name: "注册",
		component: Sign,
		preload: SignMain
	}, {
		path: '/warning',
		name: "余额报警",
		component: Warning,
		preload: WarningMain
	},{
		path: '/bag',
		name: "红包使用记录",
		component: MyBag,
		preload: MyBagMain
	},{
		path: '/alipay',
		name: "红包使用记录",
		component:BindAlipay,
		preload: BindAlipayMain
	}
];






