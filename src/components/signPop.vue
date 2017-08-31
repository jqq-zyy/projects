<template>
	<div class="pop-edit-password reset-pop pop-edit">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn"/>
		</div>
		<div class="pop-tit">
			欢迎使用喜鹊红包管理系统
		</div>
		<div class="sign-body pop-body reset-body">
			<div class="m-title">
				<span class="m-name">用户名称：</span>
				<input type="text" placeholder="请输入用户名称" v-model="signData.logon" @focus="onFocus_input">
			</div>
			<div class="m-title">
				<span class="m-name">手机号码：</span>
				<input type="text" @focus="onFocus_input" v-model="signData.telphone" placeholder="请输入手机号">
			</div>
			<div class="m-title">
				<!--<span class="m-name">{{g.lang("验证码")}}：</span>-->
				<input type="text" class="input-code" @focus="onFocus_input" v-model="signData.msgCode"
					   placeholder="请输入验证码">
				<span class="get-code pointer" @click="onClick_getCodeBtn">{{code}}</span>
			</div>

			<div class="m-title">
				<span class="m-name">{{g.lang("设置密码")}}：</span>
				<input type="password" v-model="pwd" @focus="onFocus_input" placeholder="请输入密码">
			</div>
			<div v-text="errMsg" class="err-box"></div>
			<div class="m-title">
				<span class="confirm-btn bg-btn pointer" :class="{disabled:isAbled}" @click.stop="onClick_signBtn">{{g.lang("立即注册")}}</span>
			</div>
			<div class="m-title">
				<span class="login pointer">已有账号，<span class="tip" @click.stop="onClick_loginBtn">登录</span></span>
				<span class="agree pointer" @click="onClick_seeAgreeBtn">注册即表示同意《喜鹊红包使用协议》</span>
			</div>
		</div>
	</div>

</template>
<script type="text/ecmascript-6">
	var timer;
	import g from '../global';
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
				code: "获取验证码",
				errMsg: "",
				pwd: "",
				signData: {}
			}
		},
		computed: {
			isAbled(){
				if (!this.signData.logon || !this.signData.telphone || !this.signData.msgCode || !this.pwd)
				{
					return true
				}
				return false
			}
		},
		components: {},
		methods: {
			init(){
				this.signData = {
					'logon': '',
					'telphone': '',
					'msgCode': '',
					'password': ''
				};
				this.code = "获取验证码";
				this.errMsg = "";
				this.pwd = "";
			},
			onClick_signBtn(){
				if (this.isAbled)
				{
					return
				}
				if (!g.param.reg.pwdReg.test(this.pwd))
				{
					this.errMsg = "请填写8-20位字母、数字的密码";
					return
				}
				this.signData.password = sha256(this.pwd);
				for (var key in this.signData)
				{
					if (this.signData[key] == "")
					{
						this.errMsg = '请填写完整信息';
						return
					}
				}
				this.onConfirm_signData()
			},
			onConfirm_signData(){
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
			onClick_closeBtn(){
				this.init();
				clearInterval(timer);
				this.$emit('close')
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
					return;
				}
				g.net.call("user/registerSendMsgCode", {
					"logon": this.signData.logon,
					"telphone": this.signData.telphone
				}).then(($data) =>
				{
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
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_loginBtn(){
				this.onClick_closeBtn();
				this.$emit('reset');
			},
			onClick_seeAgreeBtn(){
			},
			onFocus_input(){
				this.errMsg = "";
			}
		}
	}
</script>
<style>
	.err-box {
		height: 20px;
		color: red;
		margin-top: 5px;
	}

	.disabled {
		background: #999999 !important;
	}

	.disabled:hover {
		background: #999999 !important;
	}
</style>
