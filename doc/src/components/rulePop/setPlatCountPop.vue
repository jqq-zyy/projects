<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn"/>
		</div>
		<div class="pop-tit">
			设置扫码限制数
		</div>
		<div class="pop-body">
			<div class="input-money m-title">
				<span class="">请输入数量：</span>
				<input type="text" v-model="maxQrcodeScanNum">
			</div>
			<div class="m-title button-box">
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
				g:g,
				maxQrcodeScanNum:0
			}
		},
		watch:{
			maxQrcodeScanNum($val,$oldVal){
				if ($val.toString().indexOf(".") > 0)
				{
					this.maxQrcodeScanNum = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.maxQrcodeScanNum = $oldVal;
					return
				}
			}
		},
		methods: {
			init(){
				this.maxQrcodeScanNum = g.data.rulePool.maxQrcodeScanNum;
			},
			onClick_closeBtn(){
				this.$emit('close');
			},
			onClick_saveBtn(){
				if(!this.maxQrcodeScanNum){
					g.ui.toast("请填写扫码限制次数");
					return
				}
				g.net.call("config/updateQrScanMaxNum",{
					'maxNum':this.maxQrcodeScanNum
				}).then(($data) =>
				{
					g.data.rulePool.update({
						'maxQrcodeScanNum':this.maxQrcodeScanNum
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





