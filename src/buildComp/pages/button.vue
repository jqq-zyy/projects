<template>
	<div>
		<hw-btn :iconUrl="iconUrl" :iconClass="iconClass" :iconType="iconType" type="primary">
		</hw-btn>
		<hw-btn :iconUrl="iconUrl" :iconClass="iconClass" :iconType="iconType" type="default"
				:disabled="disabled" :hasBorder="hasBorder"></hw-btn>
		<hw-btn :iconUrl="iconUrl" :iconClass="iconClass" :iconType="iconType" type="success"
				:disabled="disabled"></hw-btn>
		<hw-btn :iconUrl="iconUrl" :iconClass="iconClass" :iconType="iconType" htmlType="reset"
				:hasBorder="hasBorder"></hw-btn>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				disabled: true,
				hasBorder: false,
				icons: [],
				iconUrl: "",
				iconClass: "icon-sousuo",
			}
		},
		methods: {
			init()
			{
				this.icons.push('../../assets/images/entry1.png', '../../assets/images/entry2.png')
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.red {
		color: red
	}
</style>
