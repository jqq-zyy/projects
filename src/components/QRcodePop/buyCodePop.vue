<template>
	<div class="pop-edit-password  pop-edit">
		<div class="show-close-btn" @click.stop="onClick_closeBtn">
			<img :src="g.config.path.images+'/close.png'"/>
		</div>
		<div class="pop-tit">
			{{g.lang("购买商品二维码")}}
		</div>
		<div class="pop-body">
			<div class="m-title">
				<span class="m-name">{{g.lang("购买数量")}}：</span>
				<input type="text" class="buy-number" v-model="buyNum">
				<span class="code-price">单价 0.05元/个</span>
			</div>
			<div class="m-title">
				<span class="m-name">{{g.lang("总计")}}：</span>
				<span class="m-money">{{totalAmount}}</span>元
				<p class="m-note">*支付所产生的第三方手续费率为{{currntRatio*1000}}‰，由喜鹊红包平台</p>
			</div>
			<div class="line"></div>
			<div class="m-title pay-way">
				<span class="m-name">{{g.lang("支付方式")}}：</span>
				<ul>
					<li v-for="item in configData.buyTypeList"
						:class="{'m-checked':item['channelId'] == currentType}" v-if="item['channelId']!=1">
						<label>
								<span class="me-radio">
									<input class="me-radio-input" type="radio" name="buyType" :id="item.channelId"
										   :value="item.channelId"
										   v-model="currentType">
									<span class="me-radio-core"></span>
								</span>
							{{item.channelName}}
						</label>

					</li>
				</ul>
			</div>
			<div class="m-title">
				<span class="pay-button pointer bg-btn" @click="onClick_paymentBtn">立即支付</span>
			</div>
			<div class="line"></div>

			<div class="m-title buy-way">
				<div v-for="item in configData.promptList">
					<p>单价</p>
					<p><i>{{item.codeId}}</i>元/个</p>
					<p>购买>{{item.minValue}}</p>
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
				buyNum: 0,
				currentType: 2,
				currentPrice: 0
			}
		},
		props: {
			configData: {
				type: Object
			}
		},
		computed: {
			totalAmount(){
				return (this.currentPrice * this.buyNum ).toFixed(2);
			},
			currntRatio(){
				var config = this.configData.buyTypeList;
				for (var i = 0; i < config.length; i++)
				{
					if (config[i].channelId == this.currentType)
					{
						return this.configData.buyTypeList[i].totalRatio
					}
				}
				return 0
			},
			promptList(){
				return this.configData.promptList
			}
		},
		watch: {
			promptList($val){
				this.currentPrice = $val[0] && $val[0].codeId
			},
			buyNum($val, $oldVal){
				if ($val.toString().indexOf(".") > 0)
				{
					this.buyNum = $oldVal;
				}
				else if (isNaN($val) || $val < 0)
				{
					this.buyNum = $oldVal;
				}
				this.getCurrentPrice($val);
			}

		},
		methods: {
			getCurrentPrice($val){
				var val = Number($val);
				var promptList = this.configData.promptList.slice(0).reverse();
				for (var i = 0; i < promptList.length; i++)
				{
					if (promptList[i].maxValue == "*")
					{
						this.currentPrice = promptList[i].codeId;
						break;
					}
					if (val >= promptList[i].minValue && val <= promptList[i].maxValue)
					{
						this.currentPrice = promptList[i].codeId;
						break;
					}

				}
				trace(this.currentPrice)
			},
			onClick_paymentBtn(){
				if (this.buyNum == 0)
				{
					g.ui.toast('请前填写购买数量');
					return
				}
				var unExportCount = g.data.qrcodePool.unexportCount;
				g.net.call("qrcode/pay", {
					"payWay": this.currentType,
					"buyQrcodeCount": this.buyNum,
					"payTotalAmount": this.totalAmount,
					"unitPrice": this.currentPrice
				}).then(($data)=>
				{
					g.ui.toast('购买成功');
					var num = Number(unExportCount) + Number(this.buyNum);
					g.data.qrcodePool.update({
						'unexportQrcode': num
					});
					this.buyNum = 0;
					this.$emit('change');
					this.$emit('click');
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_closeBtn(){
				this.$emit('click');
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop.scss";

	label {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
</style>
