<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">

						<div class="right-body ">
							<p class="g-title">

								{{g.lang("修改密码")}}
							</p>
							<div class="mod-right-body">
								<div class="mod-info">
									<span class="title">{{g.lang("当前密码")}}:</span>
									<input type="password" v-model="oldPwd">
								</div>
								<div class="mod-info">
									<span class="title">{{g.lang("新密码")}}:</span>
									<input type="password" v-model="newPwd">
								</div>
								<div class="mod-info">
									<span class="title">{{g.lang("确认新密码")}}:</span>
									<input type="password" v-model="confirmPwd">
								</div>
								<div class="mod-info pointer">
									<span class="button save-mod bg-btn" @click="onClick_saveBtn">{{g.lang("保存修改")
										}}</span>
								</div>
							</div>
						</div>
						<common-footer></common-footer>
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
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import sha256 from 'sha256';

	export default {
		created(){
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
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
				g.net.call("user/updateUserPassword", {
					"userId": g.data.get("userInfo").userId,
					"oldPassword": sha256(this.oldPwd),
					"newPassword": sha256(this.newPwd)
				}).then(($data)=>
				{
					this.oldPwd = "";
					this.newPwd = "";
					this.confirmPwd = "";
					g.ui.toast('密码修改成功');
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
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss">

	div.mod-right-body {
		background: #ffffff;
		border: 1px solid #dbdee7;
		border-radius: 4px;
		.mod-info {
			margin: 30px auto 0;
			width: 500px;

			/*overflow: hidden;*/
			.title {
				width: 90px;
				display: inline-block;
				text-align: right;
				line-height: 40px;
				/*float: left;*/
				margin-right: 15px;
			}
			input {
				width: 370px;
				height: 40px;
				line-height: 40px;
				outline: none;
				border: 1px solid #dbdee7;
				border-radius: 4px;
				padding-left: 20px;
				/*float: left;*/
			}
		}
		.save-mod {
			width: 112px;
			height: 40px;
			line-height: 40px;
			margin: 0 auto 30px;
			display: block;
		}
	}
</style>
