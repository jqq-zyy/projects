<template>
	<div>
		<hw-radio :iconUrl="iconUrl" label="六国破灭，非兵不利" v-model="checked"></hw-radio>
		<hw-radio-group :data="radioList" v-model="value"></hw-radio-group>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				iconUrl: "../../assets/images/entry1.png",
				checked: false,
				radioList: [],
				value: ""
			}
		},
		methods: {
			init()
			{
				this.radioList.push({
					label: "aaaa",
					value: "aaa",
					name: "aa"
				}, {
					label: "baaa",
					value: "baa",
					name: "aa"
				}, {
					label: "caaa",
					value: "caa",
					name: "aa"
				}, {
					label: "daaa",
					value: "daa",
					name: "aa"
				})
			}
		},
		watch: {
			checked($val)
			{
				trace('this.value', $val);
			},
			value($val)
			{
				trace('this.$vals', $val)
			}
		}
	};
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
</style>