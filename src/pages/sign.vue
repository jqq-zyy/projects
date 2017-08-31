<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap sign-box">
				<div class="sign-body">
					<div class="line"><span class="title">{{g.lang("用户名")}}：</span>
						<input type="text" placeholder="用于登录系统" v-model="signData.logon" @focus="onFocus_input"></div>
					<div class="line"><span class="title">{{g.lang("手机号")}}：</span>
						<input type="text" v-model="signData.telphone" @focus="onFocus_input"></div>
					<div class="line"><span class="title">{{g.lang("验证码")}}：</span>
						<input type="text" v-model="signData.msgCode" @focus="onFocus_input">
						<span class="button pointer" @click="onClick_getCodeBtn">{{code}}
						</span>
					</div>
					<div class="line"><span class="title">{{g.lang("设置密码")}}：</span>
						<input type="password" v-model="pwd" @focus="onFocus_input">
					</div>
					<div v-text="errMsg">
					</div>
					<div class="confirm-edit-wrap line">
						<a class="button pointer" @click="onClick_signBtn" :class="{'disabled':isAbled}">{{g
							.lang("立即注册")}}</a>
					</div>
					<div class="line">
						<span class="float-left pointer" @click="onClick_loginBtn">已有账号，登录</span>
						<span class="float-right pointer" @click="onClick_seeAgreeBtn">注册即表示同意《喜鹊红包使用协议》</span>
					</div>
				</div>
			</div>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import sha256 from 'sha256';

	export default {
		created(){
			this.init();
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				able:false,
				code: "获取验证码",
				errMsg: "",
				pwd: "",
				signData: {}
			}
		},
		computed:{
			isAbled(){
				if(!this.signData.logon|| !this.signData.telphone||!this.signData.msgCode||!this.pwd){
					this.able = false;
					return true
				}
				this.able = true;
				return false
			}
		},
		components: {
			MainLayout,
			CommonNav
		},
		methods: {
			init(){
				this.signData = {
					'logon': '',
					'telphone': '',
					'msgCode': '',
					'password': ''
				}
			},
			onClick_signBtn(){
				if(!this.able){
					return
				}
				if (!this.onConfirm_signData())
				{
					return
				}
				g.net.call("user/userRegister", this.signData).then(($data) =>
				{
					g.data.userInfo.update($data);
					g.url = {
						path: "/personal",
						query: {'isnew': 1}
					}
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onConfirm_signData(){

				if (!g.param.reg.pwdReg.test(this.pwd))
				{
					this.errMsg = "请填写8-20位字母、数字的密码";
					return false
				}
				this.signData.password = sha256(this.pwd);
				for (var key in this.signData)
				{
					if (this.signData[key] == "")
					{
						this.errMsg = '请填写完整信息';
						return false;
					}
				}
				return true
			},
			onClick_getCodeBtn(){
				if (!isNaN(this.code))
				{
					return
				}
				if (this.signData.logon == "" || this.signData.telphone == "")
				{
					this.errMsg = '请填写用户名及手机号';
					return;
				}
				if (!g.param.reg.telphone.test(this.signData.telphone))
				{
					this.errMsg = "请填写正确格式的手机号";
				}

				g.net.call("user/registerSendMsgCode", {
					"logon": this.signData.logon,
					"telphone": this.signData.telphone
				}).then(($data) =>
				{
					var code = g.param.resetTime;
					var timer = setInterval(()=>
					{
						code -= 1;
						this.code = code;
						if (code == 0)
						{
							this.code = "获取验证码";
							clearInterval(timer);
						}
					}, 1000);
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_loginBtn(){
				g.url = ("/login")
			},
			onClick_seeAgreeBtn(){
			},
			onFocus_input(){
				this.errMsg = "";
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/sign.scss";
	.confirm-edit-wrap .disabled {
		background: #999999;
	}

	.confirm-edit-wrap .disabled:hover {
		background: #999999;
		cursor: not-allowed
	}
</style>





