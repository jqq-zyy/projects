<template>
	<hw-code :url="url" @click="onClick_imgCode"></hw-code>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				url:"./adsdsa/dasdsadas.jpg"
			}
		},
		methods: {
			onClick_imgCode()
			{
				trace(111111);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>