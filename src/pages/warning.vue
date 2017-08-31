<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'bill'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<p class="g-title">余额报警</p>
							<div class="bill-content">
								<div class="bill-bar warn-bar">当前报警门槛
									<span>低于<input  type="text"  class="warn-money">
										<!--{{warningAmount}} -->
										元</span>
									<span class="recharge-button button bg-btn" @click="onClick_balanceBtn">设置</span>
								</div>
								<div class="bill-box">
									<ul>
										<li> <span>01</span>当您的余额不足以给消费者发放红包时，消费者在扫码后会领不到红包， 产生对您企业的负面情绪。为避免类似情况发生，请确保账户余额合理</li>
										<li> <span>02</span>设置余额报警后，当您的账户低于设置的金额后，我们会以手机短信和站 内消息的形式及时通知您。</li>
									</ul>
								</div>
							</div>

						</div>
						<common-footer></common-footer>
					</div>
					<transition name="bounce">
						<div class="affix-box default-pos-type" v-show="isShow_setBalancePop">
							<div class="pop-edit-password pop-edit">
								<div class="show-close-btn">
									<img :src="g.config.path.images+'/close.png'"
										 @click="onClick_closeBtn" />
								</div>
								<div class="pop-tit">
									设置警告金额
								</div>
								<div class="pop-body add-level-body">
									<div class="m-title">
										<span class="name">设置金额:</span>
										<input type="text" placeholder="请输入警告金额" v-model="amount">
									</div>
									<div class="m-title">
										<div class="save-button pointer bg-btn" @click="onClick_saveBtn">保存设置</div>

									</div>
								</div>

							</div>
						</div>
					</transition>
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
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShow_setBalancePop:false,
				shopAsset:{},
				warningAmount:0,
				amount:0
			}
		},
		watch:{
			amount($val,$oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.amount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.amount = $oldVal;
					return
				}
			}

		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods:{
			init(){
				this.shopAsset = g.data.get("shopAsset");
				this.warningAmount = this.shopAsset.assetWarningAmount;
			},
			onClick_balanceBtn(){
				this.isShow_setBalancePop = true;
			},
			onClick_closeBtn(){
				this.isShow_setBalancePop = false;
			},
			onClick_saveBtn(){
				if(!this.amount){
					return
				}
				g.net.call("asset/updateAssetWarningAmount",{
					"assetWarningAmount":Number(this.amount)
				}).then(($data) =>
				{
					this.warningAmount = this.amount;
					this.shopAsset.assetWarningAmount = this.amount;
					g.data.save("shopAsset",this.shopAsset);
					this.isShow_setBalancePop = false;
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
	@import "../css/myBill.scss";
	@import "../css/pop.scss";
</style>
