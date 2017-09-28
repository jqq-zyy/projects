<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn"/>
		</div>
		<div class="pop-tit pop-tit-center">
			设置账户余额报警门槛
		</div>
		<div class="pop-body tree-box">
			<div class="input-money m-title">
				<span>请输入金额：</span>
				<input type="text" v-model="warningAmount">
				<span>元</span>
			</div>
			<p v-show="isShow_moneyTips" class="tips">请输入有效金额</p>
			<div>
				<div class="button hb-fill-middle2-bg" @click=" onClick_closeBtn">取消</div>
				<div class="button hb-fill-middle2-rev" @click="onClick_saveWarningBtn">保存</div>
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
				g:g,
				warningAmount:0
			}
		},
		watch:{
			warningAmount($val,$oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.warningAmount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.warningAmount = $oldVal;
					return
				}
			}
		},
		methods: {
			init(){
				this.warningAmount = g.data.rulePool.warningAmount;
			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			onClick_saveWarningBtn(){
				if(!this.warningAmount){
					g.ui.toast("请填写报警金额");
					return
				}
				g.net.call("config/updateAssertWarningAmount",{
					'amount':this.warningAmount
				}).then(($data) =>
				{
					g.data.rulePool.update({
						'assertWarningAmount':this.warningAmount
					})
					this.$emit('close');
					this.$emit('init');
				}, (err) =>
				{
					g.func.dealErr(err);




				});
			}
		}
	}
</script>
