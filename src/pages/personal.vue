<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">

						<div class="right-body ">
							<p class="g-title">查看信息</p>
							<div class="mod-box">注册手机号：{{tel}} <span v-if="!tel">暂无</span><span class="button pointer border-btn" @click="onClick_modPwdBtn">修改密码</span>
							</div>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>

			<transition name="bounce">

				<div class="affix-box default-pos-type" v-show="isShow_modPwdfPop">
					<div class="pop-edit-password pop-edit" ref="modPwdBox">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn('modPwd')" />
						</div>
						<div class="pop-tit">
							修改密码
						</div>
						<div class="pop-body">
							<div class="m-title">
								<span class="name ">旧密码：</span>
								<input type="password"
									   placeholder="" v-model="oldPwd">
							</div>
							<div class="m-title">
								<span class="name">新密码：</span>
								<input class="input-code" type="password"
									   placeholder="" v-model="newPwd">
							</div>
							<div class="m-title">
								<span class="name">确认密码：</span>
								<input class="input-code" type="password"
									   placeholder="" v-model="confirmPwd">
							</div>
							<div class="m-title">
								<span class="pointer save-mod bg-btn hb-fill-middle2-rev" @click="onClick_saveBtn">保存修改</span>
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
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import sha256 from 'sha256';

	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShow_modPwdfPop: false,
				tel:"",
				oldPwd: "",
				newPwd: "",
				confirmPwd: ""
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods: {
			init(){
				this.tel = g.data.get("userInfo").telphone;
			},
			onClick_modPwdBtn:function(){
				this.isShow_modPwdfPop = true;
			},
			onClick_closeBtn:function(){
				this.isShow_modPwdfPop = false;
			},
			onClick_saveBtn(){
				if (this.oldPwd == "" || this.newPwd == "" || this.confirmPwd == "")
				{
					g.ui.toast('填写全部信息');
					return;
				}
				if (this.newPwd != this.confirmPwd)
				{
					g.ui.toast('新密码与确认密码不同');
					return
				}
				g.net.call("user/updateAdminPassword", {
					"userId": g.data.get("userInfo").userId,
					"oldPassword": sha256(this.oldPwd),
					"newPassword": sha256(this.newPwd)
				}).then(($data)=>
				{
					this.oldPwd = "";
					this.newPwd = "";
					this.confirmPwd = "";
					g.ui.toast('密码修改成功');
					this.isShow_modPwdfPop = false;
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/pop.scss";

	.mod-box {
		border: 1px solid #dbdee7;
		border-radius: 2px;
		background: #ffffff;
		min-height: 500px;
		padding: 20px;
	}

</style>

