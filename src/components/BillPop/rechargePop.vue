<template>
	<div class="affix-box default-pos-type">
		<div class="pop-edit-password pop-edit">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn" />
			</div>
			<div class="pop-tit">

				{{g.lang("账户充值")}}
			</div>
			<div class="pop-body">
				<div class="m-title">
					<span class="name">{{g.lang("充值金额")}}:</span>
					<input type="text" v-model="rechargeAmount" placeholder="请输入充值金额">
					<span class="code-price">单价：元</span>
				</div>
				<div class="m-title"><span class="name">{{g.lang("实际到账金额")}}：</span><span>{{totalAmount}}元</span></div>
				<div class="m-title pay-way">
					<P class="m-name">{{g.lang("支付方式")}}:</P>
					<ul>
						<li v-for="item in buyTypeList" v-if="item.channelId!=1"
							:for="item.codeId" class="m-checked">
							<label class="pay" >
								<span class="me-radio">
										<input class="me-radio-input" type="radio" name="buyType" :id="item.channelId"
											   :value="item.channelId"
											   v-model="currentType">
									<span class="me-radio-core"></span>
								</span>
								{{item.channelName}}
								<span v-text="getText(item.channelId,item.totalRatio)"></span>
							</label>
						</li>
					</ul>
				</div>
				<div class="m-title">
					<span class="pointer bg-btn button save-btn" @click="onClick_paymentBtn">{{g.lang("支付")}}</span>
				</div>
			</div>
		</div>
	</div>

</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	export default{
		data(){
			return {
				g: g,
				currentType: 2,
				currentId: 0,
				rechargeAmount: 0
			}
		},
		props: {
			buyTypeList: {
				type: Array
			}
		},
		computed: {
			totalAmount(){
				return (this.rechargeAmount * (1 - this.currntRadio)).toFixed(2);
			},
			currntRadio(){
				for (var i = 0; i < this.buyTypeList.length; i++)
				{
					if (this.buyTypeList[i].channelId == this.currentType)
					{
						return this.buyTypeList[i].totalRatio
					}
				}
				return 0
			}
		},
		watch: {
			rechargeAmount: function ($val, $oldVal)
			{
				if (isNaN($val))
				{
					this.rechargeAmount = $oldVal;
					return
				}
				if ($val && ($val < 1 || $val > 100000000))
				{
					this.rechargeAmount = $oldVal;
					return
				}
				else if ($val.indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.rechargeAmount = $oldVal;
					return
				}
			}
		},
		methods: {
			onClick_paymentBtn(){
				if (this.rechargeAmount == 0)
				{
					g.ui.toast("请填入充值金额");
					return
				}
				var totalFee = (this.rechargeAmount - this.totalAmount).toFixed(2)
				g.net.call("asset/recharge", {
					"orderAmount": this.rechargeAmount,
					"getAmount": this.totalAmount,
					"payWay": this.currentType,
					"totalFee": totalFee
				}).then(($data)=>
				{
					g.data.save('pay', $data.payForm);
					window.open(g.path.domain + '/pay.html');

				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			getText($channelId, $ratio){
				if ($channelId == 1)
				{
					return "(" + this.assetAmount + "元)"
				}
				else
				{
					return "(费率" + $ratio * 1000 + "‰)"
				}
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>








