<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="logon-box">
				<div class="wrap-top">
					<div class="login-button-box">
						<div class="login-body">
							<div class="m-title">
								<p class="header">运营管理后台</p></div>
							<div class="m-title r-position">
								<img :src="g.config.path.images+'/user.png'" class="user-img" alt="">
								<input class="user" type="text" v-model="logonObj.logon"
									   @keyup.enter="onClick_logonBtn"
									   @focus="onFocus_input" placeholder="请输入用户名或手机号"></div>
							<div class="m-title r-position">
								<img :src="g.config.path.images+'/pwd.png'" class="user-img" alt="">
								<input class="pwd" type="password" v-model="pwd" @keyup.enter="onClick_logonBtn"
									   @focus="onFocus_input" placeholder="请输入密码">
							</div>
							<div v-text="loginErrMsg" class="err-msg"></div>
							<a class="login-btn bg-btn pointer hb-fill-middle2-rev" @click="onClick_logonBtn"
							   :class="{disabled:!logonObj.logon||!pwd}">登录</a>
						</div>
					</div>
				</div>
			</div>
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
				if (g.core.onMode("testData"))
				{
					this.logonObj.logon = "admin";
					this.pwd = "1qaz2wsx";
				}
				if (this.logonObj.logon == "" || this.pwd == "")
				{
					return
				}

				this.onConfirm_login()






			},
			onConfirm_login(){
				this.logonObj.password = sha256(this.pwd);
				trace(sha256(this.pwd))
				//this.logonObj.password = this.pwd;
				g.net.call("user/adminLogin", this.logonObj).then(($data) =>
				{
					this.onSave_userInfo($data);
//					socketManager.connectSocket();
					g.data.save("loginTime", g.timeTool.getNowStamp());
					g.event.dispatchEvent("APP_IS_LOGIN");
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
				obj.telphone = $data.telphone;
				g.data.save("userInfo", obj);
				//g.func.getUnreadMsg('login');
				g.event.dispatchEvent("+");

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
	.r-position {
		position: relative;
	}

	.user-img {
		position: absolute;
		top: 0;
		left: 0;
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

	.login-body {
		div {
			margin-top: 25px;
			overflow: hidden;
			input {
				height: 38px;
				line-height: 38px;
				width: 230px;
				float: left;
				border: 1px solid #dbdee7;
				border-radius: 2px;
				padding-left: 40px;
				font-size: 14px;
			}
		}
		.header {
			width: 272px;
			font-size: 18px;
			color: #ffffff;
			text-align: center;
		}
		.login-btn {
			width: 272px;
			height: 40px;
			line-height: 40px;
			letter-spacing: 5px;
		}
		.forget-btn {
			width: 272px;
			margin-top: 15px;
			color: #ffffff;
			display: block;
			font-size: 14px;
			text-align: center;
			text-decoration: underline;
		}
		.me-radio-core {
			margin-right: 0;
		}
	}

</style>

