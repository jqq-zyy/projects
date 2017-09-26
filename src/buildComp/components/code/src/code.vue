<template>
	<div :class="wrapClass">
		<img :src="url" alt="" @click="onClick_imgCode">
		<span @click="onClick_imgCode">{{text}}</span>
	</div>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-code";
	export default{
		name: "hw-code",
		created(){

		},
		props: {
			url: {
				type: String
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`
				]
			}
		},
		data(){
			return {}
		},
		methods: {
			onClick_imgCode($event)
			{
				this.$emit('click', $event);
			}

		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>