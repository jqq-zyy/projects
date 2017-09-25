<template>
	<hw-group>

	</hw-group>
</template>

<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				slotList:[]
			}
		},
		methods: {
			init()
			{
				this.slotList = ['aaa', 'bbb', 'ccc'];
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>