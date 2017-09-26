<template>
	<div>
		<hw-popup v-model="isShowModel">
			asdsadpas;lidasdjpo;asdo;askd;askdlsakd
		</hw-popup>
		<div class="btn-wrap">
			<button class="md-btn" @click="onClick_btn">hahahah</button>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){

		},
		data(){
			return {
				isShowModel: false
			}
		},
		methods: {
			onClick_btn()
			{
				this.isShowModel = true;
			}

		},
		watch: {
			isShowModel($val)
			{
				trace('isShowModel', $val)
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../css/base/base.scss";
</style>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	.btn-wrap{
		padding-top: 150px;
	}
	.md-btn{
		display: block;
		margin: 0 auto;
		border: none;
		padding: 0.6em 1.2em;
		background: #c0392b;
		color: #fff;
		font-family: 'Lato', Calibri, Arial, sans-serif;
		font-size: 1em;
		letter-spacing: 1px;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 2px;
	}
	body,
	html {
		height: 100%;
		width: 100%;
		background: #e74c3c;
	}
</style>