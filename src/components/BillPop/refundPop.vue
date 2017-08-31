<template>
	<div class="affix-box default-pos-type" v-show="isShow_refundPop">
		<div class="pop-edit-password pop-edit">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn" />
			</div>
			<div class="pop-tit">
				{{g.lang("申请退款")}}
			</div>
			<div class="pop-body add-level-body">
				<div class="m-title"><span class="name">{{g.lang("退款金额")}}：</span>
					<input type="text" v-model="refundAmount" :placeholder="getPlace()">
					<span class="tip">*退款所产生的第三方支付手续费率为0.2%</span>
				</div>
				<div class="m-title"><span class="name">实际到账：</span>
					<span>{{receivedAmount}}</span></div>
				<div class="m-title"><span class="name">{{g.lang("原因描述")}}：</span>
					<textarea name="" id="" cols="30" rows="10" class="describle-reasons"
							  v-model="refundPrompt"></textarea>
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
		data(){
			return {
				g: g,
				refundPrompt: "",
				refundAmount: "",
				receivedAmount: 0
			}
		},
		props: {
			totalAmount: {
				default: 0
			}
		},
		watch: {
			refundAmount: function ($val, $oldVal)
			{
				if (isNaN($val))
				{
					this.refundAmount = oldVal;
				}
//				else if ($val && ($val < 1 || $val > 100000000))
//				{
//					this.refundAmount = $oldVal;
//					return
//				}
				else if ($val && $val > this.totalAmount)
				{
					this.refundAmount = this.totalAmount + "";

				}
				else if ($val.indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.refundAmount = $oldVal;
					return
				}

			}
		},
		methods: {
			onClick_sumbitBtn(){
				if (this.refundAmount == 0 || this.refundPrompt == "")
				{
					g.ui.toast('请填写退款金额及原因描述');
					return
				}
			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			getPlace(){
				return "不超过" + this.totalAmount + "元"

			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>








