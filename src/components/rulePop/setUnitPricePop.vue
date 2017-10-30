<template>
	<div class="pop-edit-password pop-edit price-pop">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn" />
		</div>
		<div class="pop-tit">
			设置二维码单价
		</div>
		<div class="pop-body set-code-price">
			<div class="input-money m-title ">
				<span class="count">数量：</span>
				<div class="count-set" v-for="(item,index) in priceList">
					<div v-if="item.max!='-1'">
						<div class="count-left">
							<input type="number" v-model="item.min"> ~
							<input type="number" v-model="item.max"></div>
						<div class="count-right">
							单价：¥ <input type="number" v-model="item.unitPrice">元 / 个
						</div>
						<span @click="onClick_pushBtn(index)" class="push-line pointer">+</span>
                        <span v-show="index!=0" @click="onClick_deleteBtn(index)"
							  class="push-line pointer">-</span>
					</div>
					<div class="" v-if="item.max=='-1'">
						<div class="count-left">
							<input type="number" v-model="item.min">
							以上
						</div>
						<div class="count-right">
							单价：¥ <input type="number" v-model="item.unitPrice">元 / 个
						</div>
					</div>
				</div>
			</div>
			<!--<p class="count-tips">请输入有效数量</p>-->
			<div class="button-box clearfix">
				<div class="button pointer border-btn hb-fill-middle2-bg" @click="onClick_closeBtn">取消</div>
				<div class="button pointer bg-btn hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';

	export default{
		created(){
			this.init()
		},
		data(){
			return {
				g: g,
				priceList: [{
					min: 1
				}, {
					max: "-1"
				}]
			}
		},
		props: {
			price: {
				default: []
			}
		},
		watch: {},
		methods: {
			init(){
				// this.priceList = __merge(this.priceList,this.price,true);
				this.priceList = [];
				for (var i = 0; i < this.price.length; i++)
				{
					this.priceList.push({});
					this.$set(this.priceList[i], 'min', this.price[i]['min'])
					this.$set(this.priceList[i], 'max', this.price[i]['max'])
					this.$set(this.priceList[i], 'unitPrice', this.price[i]['unitPrice'])
				}

			},
			onClick_closeBtn(){
				this.$emit('close');
				this.init();

			},
			onClick_saveBtn(){
				for (var i = 0; i < this.priceList.length; i++)
				{
					if (!this.priceList[i].min || !this.priceList[i].max || !this.priceList[i].unitPrice)
					{
						g.ui.toast("请填写全部内容");
						return
					}
					if (isNaN(this.priceList[i].min) || this.priceList[i].min < 0 || (isNaN(this.priceList[i].max) || this.priceList[i].max < 0 && this.priceList[i].max != -1))
					{
						g.ui.toast("数量区间应为整数且不能小于0");
						return
					}
					if (isNaN(this.priceList[i].unitPrice) || this.priceList[i].unitPrice <= 0 || (this.priceList[i].unitPrice.toString().indexOf(".") > 0 && this.priceList[i].unitPrice.toString().split(".")[1].length > 2))
					{
						g.ui.toast("二维码价格应为精确到小数点后两位的正数");
						return
					}
					if (this.priceList[i].min == this.priceList[i].max && this.priceList[i].max != -1)
					{
						g.ui.toast("数量区间最小值不得大于最大值");
						return
					}
					if (this.priceList[i - 1] && this.priceList[i - 1].max)
					{
						if (this.priceList[i].min != this.priceList[i - 1].max)
						{
							g.ui.toast("数量区间不能间断");
							return
						}
					}
					if (this.priceList[i + 1] && this.priceList[i + 1].min)
					{
						if (this.priceList[i + 1].min != this.priceList[i].max)
						{
							g.ui.toast("数量区间不能间断");
							return
						}
					}
				}
				var data = JSON.stringify(this.priceList)
				g.net.call("config/updateQrcodeUnitPrice", {
					'data': data
				}).then(($data) =>
				{
					var obj = {};
					obj.qrcodeUnitParamResultList = __merge([], this.priceList, true);
					g.data.rulePool.update(obj);
					this.$emit('close');
					this.$emit('init');
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onClick_pushBtn($index){
				var max, min;
				if (this.priceList[$index].max)
				{
					min = this.priceList[$index].max
				}
				var obj = {}
				obj.min = min;
				obj.max = "";
				obj.unitPrice = "";
				this.priceList.splice(Number($index) + 1, 0, obj);
			},
			onClick_deleteBtn($index){
				this.priceList.splice($index, 1)
			}
		}
	}
</script>
<style>
	.price-pop {
		width: 640px !important;
	}
</style>
