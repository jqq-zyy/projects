<template>
	<div ref="contain_canvas" :class="wrapClasses">
		<img :src="logoSrc" alt="" v-if="!!logoSrc" :class="innerClasses">
	</div>
</template>


<script type="text/ecmascript-6">
	import QRCode from 'qrcode';
	const prefixCls = 'hw-qrcode';
	export default{
		name: "hw-qrcode",
		created(){

		},
		data(){
			return {}
		},
		props: {
			text: {
				type: String,
				default: "this is a default text"
			},
			sizeLevel: {
				type: Number,String,
				default: 4
			},
			logoSrc: {
				type: String
			}
		},
		computed: {
			wrapClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`]
			},
			innerClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-inner`]
			}
		},
		mounted()
		{
			QRCode.toCanvas(this.text, {version: this.sizeLevel}, (error, canvas) =>
			{
				this.$refs.contain_canvas.appendChild(canvas);
			})
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>