<template>
	<hw-group :class="wrapClass">
		<hw-list :data="data" @click="onClick_item" :currId="currId"></hw-list>
	</hw-group>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-tabbar";
	export default{
		name: "hw-tabbar",
		created(){
		},
		data(){
			return {
			}
		},
		props: {
			data: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			vertical: {
				type: Boolean
			},
			currId: {
				type: [String, Number]
			}
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`,
					{
						[`${prefixCls}-wrap-vertical`]: this.vertical
					}
				]
			}
		},
		methods: {
			onClick_item($id)
			{
				this.$emit('click', $id);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>