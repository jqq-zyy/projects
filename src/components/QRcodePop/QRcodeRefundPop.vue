<template>
	<div class="affix-box default-pos-type" v-show="isShow_refundPop">
		<div class="pop-edit-password pop-edit add-level-pop refund-pop">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn"/>
			</div>
			<div class="pop-tit">
				{{g.lang("申请退款")}}
			</div>
			<div class="pop-body add-level-body">
				<div class="m-title"><span class="name">退款二维码数量：</span>
					<input type="text" v-model="QRcodeCount" :placeholder="getPlace()"></div>
				<div class="m-title"><span class="name">金额：</span>
					<span>{{totalAmount}}</span>
					<span>退款所产生的第三方支付手续费率为{{currentRatio*1000}}‰</span>
				</div>
				<div class="m-title"><span class="name">实际到账金额：</span>
					<span>{{receiveAmount}}</span>
				</div>
				<div v-for="item in channeList">
					<label>
						<input type="radio" name="channel" :value="item.channelId" v-model="currnetChannel">{{item.channelName}}
					</label>
				</div>
				<div class="m-title">
					<div class="save-button pointer bg-btn" @click="onClick_sumbitBtn">{{g.lang("提交")}}</div>
				</div>
			</div>


		</div>
	</div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
	import g from './../../global';
	export default{
		create(){

		},
		data(){
			return {
				g: g,
				QRcodeCount: "",
				totalAmount: 0,
				currentRatio: 0,
				currnetChannel: 2,
				unitPrice:0

			}
		},
		props: {
			unexportCount: {
				default: 0
			},
			channeList: {
				default: []
			}
		},
		computed: {
			receiveAmount(){
				return (this.totalAmount - this.totalAmount * this.currentRatio).toFixed(2)
			}
		},
		watch: {
			channeList(){
				this.onUpdate_currentRatio(this.currnetChannel)
			},
			currnetChannel($val){
				this.onUpdate_currentRatio($val)
			},
			QRcodeCount($val, $oldVal)
			{
				if (isNaN($val) || !$val)
				{
					this.QRcodeCount = 0;
					return
				}
				else if ($val.indexOf(".") > 0)
				{
					this.QRcodeCount = $oldVal;
					return
				}
				else if ($val > this.unexportCount)
				{
					this.QRcodeCount = this.unexportCount + "";
					return
				}
				this.onGet_price();
			}
		},
		methods: {
			onUpdate_currentRatio($val){
				for (var i = 0; i < this.channeList.length; i++)
				{
					if (this.channeList[i].channelId == $val)
					{
						this.currentRatio = this.channeList[i].totalRatio
					}
				}
			},
			onClick_sumbitBtn(){
				if (this.refundAmount == 0 || this.refundPrompt == "")
				{
					g.ui.toast('请填写退款金额及原因描述');
					return
				}
				g.net.call("order/applyQrcodeRefund", {
					"qrcodeCount": this.QRcodeCount,
					"payChannelId":this.currnetChannel,
					"qrcodeRefundUnitPrice":this.unitPrice,
					"totalRefundAmount":this.totalAmount,
					"realityRefundAmount":this.receiveAmount
				}).then(($data)=>
				{
					this.$emit('next', this.QRcodeCount);
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onGet_price(){
				g.net.call("order/qrcodeRefundUnitPrice", {
					"qrcodeCount": this.QRcodeCount
				}).then(($data)=>
				{
					this.totalAmount = $data.refundAmount;
					this.unitPrice = $data.refundUnitPrice
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			getPlace(){
				return "不超过" + this.unexportCount + "个二维码"

			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>








