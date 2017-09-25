<template>
	<hw-btn text="取消" type="primary" @click="onClick_btn"></hw-btn>
</template>

<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				flag: false
			}
		},
		methods: {
			onClick_btn($event)
			{
				if (this.flag)
				{
					this.flag = false;
					this.$tips('dsadasdas', $event).hide();
				}
				else
				{
					this.flag = true;
					this.$tips('dsadasdas', $event);
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>