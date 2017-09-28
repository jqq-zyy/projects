<template>
	<div>
		<div>
			<hw-btn iconType="prev-song"></hw-btn>
			<hw-btn :iconType="isPlaying?'play':'stop'"></hw-btn>
			<hw-btn iconType="next-song"></hw-btn>
		</div>
		<div>
			<span>2:45</span>
			<hw-progress></hw-progress>
			<hw-btn iconType="volume-on">
				<hw-progress></hw-progress>
			</hw-btn>
			<hw-btn iconType="full-screen"></hw-btn>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		name: "hw-player",
		created(){

		},
		data(){
			return {}
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>