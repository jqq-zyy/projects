<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn">
			<img :src="g.config.path.images+'/close.png'"
				 @click="onClick_closeBtn"/>
		</div>
		<div class="pop-tit">
			设置二维码单价
		</div>
		<div class="pop-body set-code-price">
			<div class="input-money m-title">
				<span class="count">数量：</span>

				<div class="count-set" v-for="item in dataList">
					<div class="count-left"><input type="text" v-model="item.min" :disabled="item.min==0"> ~ <input type="text" v-model="item.max"></div>
					<div class="count-right">
						单价：¥ <input type="text" v-model="item.unitPrice"> / 个
					</div>
				</div>

				<!--<div class="count-set">-->
					<!--<div class="count-left">-->
						<!--<input type="text">-->
						<!--~-->
						<!--<input type="text">-->
					<!--</div>-->
					<!--<div class="count-right">-->
						<!--单价：¥ <input type="text"> / 个-->
						<!--<span class="count-add"></span>-->
					<!--</div>-->
				<!--</div>-->
				<div class="count-set">
					<div class="count-left">
						<input type="text">
						以上
					</div>
					<div class="count-right">
						单价：¥ <input type="text"> / 个
					</div>
				</div>

			</div>
			<p class="count-tips">请输入有效数量</p>
			<div class="m-title button-box">
				<div class="button pointer border-btn hb-fill-middle2-bg">取消</div>
				<div class="button pointer bg-btn hb-fill-middle2-rev">保存</div>
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
				dataList:[]
			}
		},
		watch:{
		},
		methods: {
			init(){
				this.dataList = g.data.rulePool.dataList;
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





