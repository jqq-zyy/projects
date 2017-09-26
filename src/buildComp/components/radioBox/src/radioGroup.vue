<template>
	<hw-group :vertical="vertical">
		<hw-radio v-for="radioItem in data" :label="radioItem.label" :value="radioItem.value"
				  :name="radioItem.name" @select="onSelect_radio" :checked="radioItem.checked"></hw-radio>
	</hw-group>
</template>
<script type="text/ecmascript-6">
	import Group from './../../group/index';
	import RadioBox from './radioBox.vue';
	export default{
		name: "hw-radio-group",
		created(){

		},
		components: {
			"hw-radio": RadioBox,
			"hw-group": Group
		},
		data(){
			return {
				result: ""
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
			onSelect_radio($value)
			{
				this.result = $value;
			}
		},
		watch: {
			value(value)
			{
				this.result = value;
			},
			result(value) {
				this.$emit('input', value);
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>