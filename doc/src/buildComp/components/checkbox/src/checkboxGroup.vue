<template>
	<hw-group vertical="vertical">
		<hw-checkbox v-for="checkboxItem in results" :label="checkboxItem.label" v-model="checkboxItem.value"
					 :name="checkboxItem.name" :refId="checkboxItem.id" @change="onChange_check"></hw-checkbox>
	</hw-group>
</template>

<script type="text/ecmascript-6">
	import Group from './../../group/index';
	import CheckBox from './checkbox.vue';

	export default{
		name: "hw-checkbox-group",
		created(){
		},
		components: {
			"hw-checkbox": CheckBox,
			"hw-group": Group
		},
		data(){
			return {
				results: this.data
			}
		},
		props: {
			data: {
				type: Array,
				default: function ()
				{
					return [];
				}
			},
			vertical: {
				type: Boolean
			}
		},
		methods: {
			onChange_check()
			{
				this.$emit('change', this.results);
			}
		},
		watch: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>