<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn" @click.stop="onClick_closeBtn">
			<img :src="g.config.path.images+'/close.png'"/>
		</div>
		<div class="pop-tit">
			导出商品二维码
		</div>
		<div class=" pop-body">
			<div class="m-title">
				<div class="out-form">
					<span class="out-name">适用商品：</span>
					<input type="text" v-model="prompt" placeholder="使用该批次二维码的产品名、规格、适用价位等信息">
					<p class="tip out-tip">*用于生产过程中提示该批次二维码的用途(消费者看不见该信息)</p>

				</div>
				<div class="out-form">
					<span class="out-name">导出二维码数量：</span>
					<input type="text" v-model="unitCount" placeholder="请输入数值">
				</div>
				<div class="out-form">
					<span class="out-name">恶意扫码限制：</span>
					<input type="text" v-model="limitCount" placeholder="请输入次数">
					<p class="tip out-tip">*消费者在24小时内允许扫码领取红包的最大次数上限</p>
				</div>
			</div>
			<div class="line"></div>
			<div class="m-title">
				<div class="out-total">总计：<span>{{unitCount?unitCount:0}}个二维码</span></div>
				<span class="export-button pointer bg-btn" @click="onClick_exportBtn">确认并导出</span>
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
				unitCount: "",
				prompt: ""
			}
		},

		watch: {
			unitCount($val, $oldVal){
				var unExportCount = g.data.qrcodePool.unexportCount;
				if ($val.toString().indexOf(".") > 0)
				{
					this.unitCount = $oldVal;
				}
				else if (isNaN($val) || $val < 0)
				{
					this.unitCount = $oldVal;
				}
				else if (this.unitCount > unExportCount)
				{
					this.unitCount = $oldVal;
				}
			}
		},
		methods: {
			onClick_exportBtn(){
				var unExportCount = g.data.qrcodePool.unexportCount;
				var exportedCount = g.data.qrcodePool.exportedCount;
				if (this.unitCount == 0)
				{
					g.ui.toast("请填写导出二维码数量")
					return
				}
				g.net.call("qrcode/exportQrcode", {
					"totalQrodeCount": this.unitCount,
					"batchUse": this.prompt
				}).then(($data)=>
				{
					var unExportNum = Number(unExportCount) - Number(this.unitCount);
					var exportedNum = Number(exportedCount) + Number(this.unitCount);
					g.data.qrcodePool.update({
						'unexportQrcode': unExportNum,
						'exportedQrcode': exportedNum
					});
					this.unitCount = 0;
					this.specCount = 0;
					this.onUpdate_exportList();
					window.open($data.data);
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onUpdate_exportList(){
				this.unitCount = "";
				this.prompt = "";
				this.$emit('initList');
				this.$emit('change');
				this.$emit('close');
			},
			onClick_closeBtn(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop.scss";
</style>








