<template>
	<div>
		<div @click="onClick_showloading">
			hahahahaah
		</div>
		<div @click="onClick_hideloading">
			hahahahaah
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		created(){

		},
		data(){
			return {
			}
		},
		methods: {
			onClick_showloading()
			{
				this.$loading({

				}).show();
			},
			onClick_hideloading()
			{
				this.$loading().hide();
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>