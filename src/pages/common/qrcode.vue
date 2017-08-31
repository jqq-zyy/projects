<template>
	<div id="qrCode">
		<img :src="codeSrc" alt="" class="qrCode">
	</div>
</template>
<script>
	var _q;
	import g from './../../global';

	export default{
		created(){
			this.removeEvents();
			g.event.addEventListener("INIT_QRCODE",this.init);
		},
		data(){
			return {
				g: g,
				codeSrc:"",
				url:''

			}
		},
		methods: {
			init($type,$url){
				this.$nextTick(function()
				{
				var qrCode = document.getElementById('qrCode');
					qrCode.innerHTML = "";
				this.codeSrc = this.getQRcode(qrCode, $url)._el.innerHTML;

				});
			},
			getQRcode($node, $url)
			{
				_q = new QRCode($node, {
					width: 200,//设置宽高
					height: 200
				});
				_q.clear();
				_q.makeCode($url);
				return _q;
			},
			removeEvents(){
				g.event.removeEventListener("INIT_QRCODE",this.init)
			}
		}
	}
</script>
<style>
	#qrCode img{
		margin:auto



	}
</style>








