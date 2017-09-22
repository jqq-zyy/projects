<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body personal-box">
							<div class="g-title"><span>平台财务流水</span>/新建平台流水</div>
							<div class="admin-calendar-table">
								<div class="base-info">基本信息</div>
								<div class="base-master">
									<p>发起人: </p>
									<span>小黑</span></div>
								<div>
									<p>流水类型：</p>
									<label for="recharge">
										<input type="radio" name="status" v-model="paramObj.recordType" value="1" id="recharge">平台红包充值
									</label>
									<label for="cash">
										<input type="radio" name="status" v-model="paramObj.recordType" value="2" id="cash">提现支出
									</label>
								</div>
								<div>
									<p>流水金额：</p>
									<input type="text" v-model="paramObj.amount">
								</div>
								<div>
									<p>备注：</p>
									<textarea id="" cols="30" rows="10" v-model="paramObj.remarks"
											  placeholder="不超过50字"></textarea></div>
								<div class="base-way">
									<p>支付方式：</p>
									<span>支付宝</span>
								</div>
								<div class="base-origin">
									<p>来源账户：</p>
									<input type="text" placeholder="支付宝账号" v-model="paramObj.account">
								</div>
								<div class="base-operate">
									<div class="button hb-fill-middle2-bg" @click="onClick_resetBtn">取消</div>
									<div class="button hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
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
	export default {
		created(){
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				paramObj: {
					recordType: 1,
					author: "",
					amount: 0,
					remarks: "",
					account: ""

				}
			}
		},
		watch: {
			amount($val, $oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.paramObj.amount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.paramObj.amount = $oldVal;
					return
				}
				else if ($val > 2000)
				{
					this.paramObj.amount = $oldVal;
					return
				}
			},
			remarks($val, $oldVal){
				if ($val.length > 50)
				{
					this.paramObj.remarks = $oldVal;
				}
			}
		},
		computed: {
			amount(){
				return this.paramObj.amount
			},
			remarks(){
				return this.paramObj.remarks
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods: {
			onClick_resetBtn(){
				g.url = ("/platform")
			},
			onClick_saveBtn(){
				if (!this.paramObj.amount)
				{
					g.ui.toast("请填写流水金额")
				}
				else if (this.paramObj.remarks == "")
				{
					g.ui.toast("请填写备注")
				}
				else if (this.paramObj.account == "")
				{
					g.ui.toast("请填写账号")
				}
				var obj = {};
				/*g.net.call("/getActivityDetail",{
				 "id":this.shopId
				 }).then(($data) =>
				 {*/
				g.url = ("/platform");
//				}, (err) =>
//				{
//					g.func.dealErr(err);
//				});
			},

		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";

</style>





