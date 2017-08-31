<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="logon-box">
				<div class="wrap-top">
					<div class="nav-box">
						<div class="nav">
							<p>
								商家营销管理
							</p>
						</div>
					</div>
					<div class="login-button-box">
						<img :src="g.config.path.images+'/text.png'" alt="">
						<div @click.stop="onClick_showLoginPop" class="login-button bg-btn pointer">登录</div>
						<div @click.stop="onClick_signBtn" class="register-button border-btn pointer">立即注册</div>
					</div>
				</div>
			</div>
			<!--登录-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_loginPop">
					<div class="pop-edit-passwor pop-edit login-pop">
						<div class="show-close-btn close-btn" @click="onClick_closeBtn">
							<img :src="g.config.path.images+'/close1.png'" />
						</div>
						<div class="pop-head">{{g.lang("登录")}}</div>
						<div class="login-body">
							<div class="m-title">
								<input class="user" type="text" v-model="logonObj.logon"
									   @keyup.enter="onClick_logonBtn"
									   @focus="onFocus_input" placeholder="请输入用户名或手机号"></div>
							<div class="m-title">
								<input class="pwd" type="password" v-model="pwd" @keyup.enter="onClick_logonBtn"
									   @focus="onFocus_input" placeholder="请输入密码">
							</div>
							<div class="m-title">
								<label>
								<span class="me-radio ">
									<input class="me-radio-input" type="checkbox" name="type">
									<span class="me-radio-core"></span>
								</span>
									在电脑端保存
								</label>
							</div>
							<div v-text="loginErrMsg" class="err-msg"></div>
							<div class="m-title">
								<a class="login-btn bg-btn pointer" @click="onClick_logonBtn"
								   :class="{disabled:!logonObj.logon||!pwd}">登录</a>
								<a class="forget-btn pointer" @click.stop="onClick_modPwdBtn">忘记登录密码？</a>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<!--重置密码-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_modPwdPop">
					<div class="pop-edit-password reset-pop pop-edit" ref="modPwdBox">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn('modPwd')" />
						</div>
						<div class="pop-tit">
							{{g.lang("重置密码")}}
						</div>
						<div class="pop-body reset-body">
							<div class="m-title">
								<span class="m-name ">身份验证：</span>
								<input type="text" v-model="pwdObj.logon" @focus="onFocus_input"
									   placeholder="请输入您的手机号或用户名">
							</div>
							<div class="m-title">
								<!--<span class="title check">{{g.lang("验证码")}}：</span>-->
								<input class="input-code" type="text" v-model="pwdObj.msgCode" @focus="onFocus_input"
									   placeholder="请输入验证码">
								<span class="get-code pointer" @click="onClick_getCodeBtn">{{code}}</span>
							</div>
							<div class="m-title">
								<span class="m-name">重置密码：</span>
								<span class="pwd-box">
									<input type="password" v-model="newPwd" @focus="onFocus_input" placeholder="请输入密码"
										   class="">
									<img :src="g.config.path.images+'/hide.png'" alt=""  class="pointer">
									<img :src="g.config.path.images+'/display.png'" class="pointer" alt="" v-show="">
								</span>
							</div>
							<!--<div class="form-box last-form-box">
								<span class="title check">确认新密码：</span>
								<input type="password" v-model="confirmPwd" @focus="onFocus_input"
									   placeholder="请再次输入密码">
							</div>-->
							<div v-text="pwdErrMsg" class="err-msg"></div>
							<div class="m-title">
								<span class="confirm-btn bg-btn pointer"
									  @click="onClick_confirmBtn" :class="{disabled:isCanMod}">{{g.lang("确认修改")}}</span>
							</div>
						</div>

					</div>
				</div>
			</transition>
			<!--重置密码成功-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="">
					<div class="pop-edit-password reset-pop pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							重置密码成功
						</div>
						<div class="pop-body reset-body">
							<div class="m-title">
								<p class="success-text">密码修改成功!</p>
							</div>
							<div class="m-title">
								<span class="bg-btn pointer confirm-btn">返回登录</span>
							</div>
						</div>

					</div>
				</div>
			</transition>

			<!--注册-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_signPop">

					<sign-pop @close="onClick_closeBtn" ref="signBox" @reset="onClick_resetSign"></sign-pop>
				</div>
			</transition>

			<!--绑定手机-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_bindTel">
					<div class="pop-edit-password pop-edit reset-pop">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn" />
						</div>
						<div class="pop-tit">
							绑定手机号
						</div>
						<div class="pop-body reset-body">
							<div class="m-title">
								<span class="title check">手机号：</span>
								<input type="text" v-model="onBindTel" @focus="onFocus_input"
									   placeholder="请输入您的手机号或用户名">
							</div>
							<div class="m-title">
								<span class="title check">{{g.lang("验证码")}}：</span>
								<input type="text" v-model="bindTelCode" @focus="onFocus_input" placeholder="请输入验证码">
								<span class="get-code pointer" @click="onClick_getBindBtn">{{code}}</span>
							</div>

							<div v-text="bindErrMsg" class="err-msg"></div>
							<div class="m-title">
								<span class="login-btn pointer" @click="onClick_bindBtn">绑定</span>
							</div>
						</div>

					</div>
				</div>
			</transition>
		</div>
	</main-layout>
</template>
<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import sha256 from 'sha256';
	import CommonFooter from './common/CommonFooter.vue';
	import socketManager from "./../js/manager/SocketManager";
	import SignPop from '../components/signPop.vue';
	var timer;
	export default {
		created(){
			this.init();
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShow_loginPop: false,
				isShow_modPwdPop: false,
				isShow_modSuccessPop: false,
				isShow_bindTel: false,
				isShow_signPop: false,
				code: "获取验证码",
				loginErrMsg: "",
				pwdErrMsg: "",
				pwd: "123456",
				confirmPwd: "",
				newPwd: "",
				logonObj: {},
				pwdObj: {},
				onBindTel: "",
				bindTelCode: "",
				bindErrMsg: ""
			}
		},
		watch: {},
		components: {
			MainLayout,
			CommonFooter,
			SignPop
		},
		computed: {
			isCanMod(){
				if (!this.pwdObj.logon || !this.pwdObj.msgCode || !this.newPwd)
				{
					return true
				}
				return false
			}
		},
		methods: {
			init(){
				this.removeEvent();
				this.initEvent();
				this.logonObj = {
					'logon': "allen1",
					'password': ""
				};
				this.pwdObj = {
					'newPassword': "",
					'logon': "",
					'msgCode': ""
				}
			},
			initEvent(){
				document.addEventListener('click', this.onClick_document)
			},
			removeEvent(){
				document.removeEventListener('click', this.onClick_document)
			},
			onClick_document(e){

				if (this.$refs.loginBox && !this.$refs.loginBox.contains(e.target))
				{
					this.isShow_loginPop = false;
				}
				if (this.$refs.signBox && !this.$refs.signBox.$el.contains(e.target))
				{
					this.isShow_signPop = false;
				}
				if (this.$refs.modPwdBox && !this.$refs.modPwdBox.contains(e.target))
				{
					this.isShow_modPwdPop = false;
				}
			},
			onFocus_input(){
				this.loginErrMsg = '';
				this.pwdErrMsg = '';
			},
			onClick_logonBtn(){
				if (this.logonObj.logon == "" || this.pwd == "")
				{
					return
				}

				this.onConfirm_login()
			},
			onConfirm_login(){
				//this.logonObj.password = sha256(this.pwd);
				this.logonObj.password = this.pwd;
				g.net.call("user/userLogin", this.logonObj).then(($data) =>
				{
					this.onSave_userInfo($data);
					socketManager.connectSocket();
					if ($data.telphone)
					{
						this.onUpdate_shopAsset();
					}
					else
					{
						this.isShow_bindTel = true;
					}
					g.data.save("loginTime", g.timeTool.getNowStamp());
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onSave_userInfo($data){
				var obj = {};
				obj.userId = $data.userId;
				obj.shopId = $data.shopId;
				obj.userName = $data.userName;
				g.data.save("userInfo", obj);
			},
			onUpdate_shopAsset(){
				g.net.call("asset/queryShopAsset").then(($data) =>
				{
					$data.response = "";
					g.data.save("shopAsset", $data);
					g.func.getUnreadMsg('login');
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_signBtn(){
				this.isShow_signPop = true;
			},
			onClick_resetSign(){
				this.isShow_loginPop = true;
			},
			onClick_showLoginPop(){
				this.isShow_loginPop = true;
			},
			onClick_modPwdBtn(){
				this.isShow_loginPop = false;
				this.isShow_modPwdPop = true;
			},
			onClick_confirmBtn(){
				if (this.isCanMod)
				{
					return
				}
				if (!g.param.reg.pwdReg.test(this.newPwd))
				{
					this.pwdErrMsg = "请填写8-20位字母、数字的密码";
					return false
				}
				this.pwdObj.newPassword = sha256(this.newPwd);
				g.net.call("user/resetUserPassword", this.pwdObj).then(($data) =>
				{
					g.ui.toast('重置密码成功,请重新登录');
					this.isShow_modPwdPop = false;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn($type){
				if ($type == 'login')
				{
					this.isShow_loginPop = false;
					this.loginErrMsg = "";
				}
				if ($type == "modPwd")
				{
					this.isShow_modPwdPop = false;
					this.pwdErrMsg = "";
					this.newPwd = "";
					clearInterval(timer);
					this.code = "获取验证码"
				}
				this.isShow_signPop = false;
				this.init();
			},
			onClick_getCodeBtn(){
				if (!isNaN(this.code) || this.pwdObj.logon == "")
				{
					return
				}
				g.net.call("user/resetPassworSendMsgCode", {
					'logon': this.pwdObj.logon
				}).then(($data) =>
				{
					this.onResult_telCode($data)

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_getBindBtn(){
				if (!isNaN(this.code))
				{
					return
				}
				g.net.call("user/updateTelphoneSendMsgCode", {
					'telphone': this.onBindTel
				}).then(($data) =>
				{
					this.onResult_telCode($data)

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_bindBtn(){
				g.net.call("user/bindUserTelphone", {
					'telphone': this.onBindTel,
					'msgCode': this.bindTelCode
				}).then(($data) =>
				{
					this.onUpdate_shopAsset();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onResult_telCode($data){
				var code = g.param.resetTime;
				timer = setInterval(()=>
				{
					code -= 1;
					this.code = code;
					if (code == 0)
					{
						this.code = "获取验证码";
						clearInterval(timer);
					}
				}, 1000);
			}
		}
	};

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/animation.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/login.scss";
	@import "../css/pop.scss";

	.user {

		background: #ffffff url("../../assets/images/user.png") no-repeat left center;
	}

	.pwd {
		background: #ffffff url("../../assets/images/pwd.png") no-repeat left center;
	}

	.pwd-box {
		display: inline-block;
		position: relative;
		img {
			position: absolute;
			right: 10px;
			top: 16px;
		}
	}

</style>

