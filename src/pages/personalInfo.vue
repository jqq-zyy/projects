<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body personal-box">
							<div class="g-title">账户信息</div>
							<div class="account-header">
								<div class="base-info current-item">
									<label>
										<span class="me-radio">
											<input class="me-radio-input" type="radio">
											<span class="me-radio-core"></span>
										</span>
										{{g.lang("基本信息")}}
									</label>

								</div>
								<div class="base-info company-info" @click="onClick_goCompanyBtn"
									 v-show="!roleId">
									<label>
										<span class="me-radio">
											<input class="me-radio-input" type="radio">
											<span class="me-radio-core"></span>
										</span>
										{{g.lang("企业认证信息")}}
									</label>
								</div>
								<!--<div class="base-info company-info"  @click="onClick_setAlpayBtn">退款账号</div>-->
							</div>
							<div class="admin-calendar-table">
								<div class="detail-info">
									<div class="title">{{g.lang("用户名")}}</div>
									<input class="title-content name" type="type">
									<!--{{name}}-->
								</div>
								<div class="detail-info">
									<div class="title">{{g.lang("手机号")}}</div>
									<div class="title-content">
										<input type="text" class="phone-number name" v-text="companyTel" v-show="!isModTel">
										<input type="text" v-model="companyTel" v-show="isModTel">
										<span  class="mod-number pointer" :class="{'isDisable':isModTel}"
											 @click="onClick_modTelBtn">修改手机号
										</span>
									</div>
								</div>
								<div class="detail-info" v-show="isModTel">
									<div class="title">验证码</div>
									<input type="text" placeholder="输入验证码" v-model="infoObj.msgCode">
									<div class="button code-btn pointer" @click="onClick_getCode" v-text="code"></div>
								</div>
								<div class="detail-info" v-show="!roleId">
									<div class="title">企业联系人</div>
									<input type="text" v-model="infoObj.companyContacts">
								</div>
								<div class="detail-info" v-show="!roleId">
									<div class="title">联系邮箱</div>
									<input type="text" v-model="infoObj.companyMail">
								</div>
								<div class="detail-info" v-show="roleId">
									<div class="title">职能权限</div>
									<div>{{role}}</div>
								</div>
								<div class="detail-info">
									<div class="button save-mod pointer" @click="onClick_saveBtn">保存修改</div>
								</div>
							</div>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
				<transition name="bounce">
					<sign-success-pop v-show="isNew" @click="onClick_closeBtn"></sign-success-pop>
				</transition>
			</div>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import SignSuccessPop from '../components/signSuccessPop.vue';
	import CommonFooter from './common/CommonFooter.vue';
	var _timer;
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isModTel: false,
				isNew: false,
				name: "",
				code: "获取验证码",
				companyTel: "",
				role: "",
				roleId:"",
				infoObj: {
					'companyMail': '',
					'companyContacts': '',
					'telphone': '',
					'msgCode': ''

				}
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			SignSuccessPop,
			CommonFooter
		},
		methods: {
			init(){
				var isNew = this.$route.query.isnew;
				if (isNew == 1)
				{
					this.isNew = true;
				}
				this.initInfoObj()
			},
			initInfoObj(){
				this.name = g.data.userInfo.name;
				this.role = g.data.userInfo.roleName;
				this.roleId = g.data.userInfo.roleId;
				this.infoObj.companyMail = g.data.userInfo.email;
				this.infoObj.companyContacts = g.data.userInfo.contacts;
				this.companyTel = g.data.userInfo.tel;
			},
			onClick_goCompanyBtn(){
				g.url = ("/companyinfo")
			},
			onClick_modTelBtn(){
				this.isModTel = true;
			},
			onClick_getCode(){
				if (!isNaN(this.code))
				{
					return;
				}
				if (this.companyTel == "")
				{
					g.ui.toast('请填写手机号');
					return;
				}
				if (!g.param.reg.telphone.test(this.companyTel))
				{
					g.ui.toast('请填写正确格式的手机');
					return;
				}
				g.net.call("user/updateTelphoneSendMsgCode", {
					'telphone': this.companyTel
				}).then(($data) =>
				{
					var code = g.param.resetTime;
					_timer = setInterval(()=>
					{
						code -= 1;
						this.code = code;
						if (code == 0)
						{
							this.code = "获取验证码";
							clearInterval(_timer);
						}
					}, 1000);
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_saveBtn(){
				if (this.companyTel != g.data.userInfo.tel && this.infoObj.msgCode == "")
				{
					g.ui.toast('电话已变更，请输入验证码');
					return
				}

				if (this.companyTel == "" || this.infoObj.companyMail == "" || this.infoObj.companyContacts == "")
				{
					g.ui.toast('请填写全部信息');
					return
				}
				if (!g.param.reg.emailReg.test(this.infoObj.companyMail))
				{
					g.ui.toast('请填写正确格式的邮箱');
					return;
				}
				if (this.companyTel != g.data.userInfo.tel)
				{
					this.infoObj.ctelphone = this.companyTel;

				}
				trace(this.infoObj);

				g.net.call("user/updateShopUserInfo", this.infoObj).then(($data) =>
				{
					g.ui.toast('保存成功');
					this.code = "获取验证码";
					this.infoObj.msgCode = "";
					clearInterval(_timer);
					this.isModTel = false;

					g.data.userInfo.update(this.infoObj)
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn(){
				g.url = {
					path: "/personal",
					query: {isnew: 0}
				};
				this.isNew = false;
			},
			onClick_setAlpayBtn(){
				g.url=("/alipay")












			}
		}
	}
</script>

<style>
	.isDisable {
		/*border: 1px solid #999999;*/
		/*background: #999999;*/
		/*color: #ffffff;*/
	}

	.code-btn {
		margin-left: 25px;
	}
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";
</style>






