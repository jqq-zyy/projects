<template>
	<hw-switch v-model="checked" :disabled="disabled"></hw-switch>
</template>

<script type="text/ecmascript-6">
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				checked: "on",
				disabled:true
			}
		},
		methods: {},
		watch:{
			checked($val)
			{
				trace('$val====',$val);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>