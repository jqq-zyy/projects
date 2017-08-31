<template>
	<div class="affix-box default-pos-type">
		<div class="show-top-tips" v-show="isShowTip">充值还未成功，请确认是否完成支付！</div>
		<div class="pop-edit-password register-result">
			<p class="step-about-tit">支付结果</p>
			<p class="show-tip-new">请在新窗口完成支付</p>
			<div class="confirm-edit-wrap">
				<a class="cancel-btn" @click="onClick_closeBtn">稍后支付</a>
				<a class="confirm-btn" @click="onClick_okBtn">完成支付</a>
			</div>
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/control-panel/common-close.png'" @click="onClick_closeBtn"/>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "./../../global"
	export default{
		data(){
			return {
				g: g,
				isShowTip: false
			}
		},
		props: {
			queryId: {
				default: 0
			},
			appId: {
				default: 0
			}
		},
		components: {},
		methods: {
			onClick_closeBtn()
			{
				this.$emit('close')
			},
			onClick_okBtn()
			{
				if (this.appId == 0 || this.queryId == 0)
				{
					return;
				}
				this.isShowTip = false;
				g.net.call('rechargec2c/queryRechargeStatus', {
					orderId: this.queryId,
					appId: this.appId
				}).then((d) =>
				{
					if (d.statusMsg == "充值成功")
					{
						this.$emit('close', 'success')
					}
					else
					{
						this.isShowTip = true;
						var self = this;
						setTimeout(()=>
						{
							self.isShowTip = false;
						}, 1500)
					}
				}, (err) =>
				{
					g.func.showErrMsg(err);
					this.$emit('close', 'failure');
				})
			}
		}

	}
</script>
