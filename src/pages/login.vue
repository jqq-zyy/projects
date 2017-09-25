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
					</div>
				</div>
			</div>
			<!--登录-->
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_loginPop">
					<div class="pop-edit-passwor pop-edit login-pop" ref="loginBox">
						<div class="show-close-btn close-btn" @click="onClick_closeBtn('login')">
							<img :src="g.config.path.images+'/close1.png'"/>
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
							<div v-text="loginErrMsg" class="err-msg"></div>
							<div class="m-title">
								<a class="login-btn bg-btn pointer" @click="onClick_logonBtn"
								   :class="{disabled:!logonObj.logon||!pwd}">登录</a>
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
				loginErrMsg: "",
				pwd: "",
				logonObj: {}
			}
		},
		watch: {},
		components: {
			MainLayout,
			CommonFooter
		},
		computed: {},
		methods: {
			init(){
				this.removeEvent();
				this.initEvent();
				this.logonObj = {
					'logon': "",
					'password': ""
				};
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

			},
			onClick_showLoginPop(){
				this.isShow_loginPop = true;
			},
			onFocus_input(){
				this.loginErrMsg = '';
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
				g.net.call("user/adminLogin", this.logonObj).then(($data) =>
				{
					this.onSave_userInfo($data);
					socketManager.connectSocket();
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
				obj.logon = $data.logon;
				g.data.save("userInfo", obj);
//				g.func.getUnreadMsg('login');
				g.event.dispatchEvent("APP_IS_LOGIN");




			},

			onClick_closeBtn($type){
				this.isShow_loginPop = false;
				this.loginErrMsg = "";
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

