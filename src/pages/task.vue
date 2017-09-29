<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">

						<div class="right-body ">
							<p class="g-title">待办任务</p>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>任务类型</th>
										<th><span>|</span>申请用户</th>
										<th><span>|</span>申请时间</th>
										<th><span>|</span>企业全称</th>
										<th><span>|</span>操作</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td><span class="button pointer border-btn">处理</span></td>
									</tr>
									</tbody>
								</table>
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

