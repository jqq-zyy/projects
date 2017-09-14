<template>
	<div>
		<hw-btn @click="onClick_btn"></hw-btn>
		<hw-date type="hour" mainColor="color-primary" @change="onChange_date" v-model="isShowDate"></hw-date>
	</div>
</template>
<script type="text/ecmascript-6">

	export default{
		created(){

		},
		data(){
			return {
				isShowDate: true
			}
		},
		methods: {
			onChange_date($timeStamp)
			{
				trace('$timeStamp========', $timeStamp);
			},
			onClick_btn()
			{
				this.isShowDate = true;
			}
		}

	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>