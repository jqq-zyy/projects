<template>
	<hw-steps :data="list" :hasNextBtn="true" @next="onNext_steps"></hw-steps>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				list: []
			}
		},
		methods: {
			init()
			{
				this.list.push(
						{
							status: "completed",
							title: "completed--title",
							desc: "completed---desc"
						},
						{
							status: "process",
							title: "process--title",
							desc: "process---desc"
						},
						{
							status: "waiting",
							title: "waiting--title",
							desc: "waiting---desc"
						},
						{
							status: "waiting",
							title: "waiting--title",
							desc: "waiting---desc"
						}
				)
			},
			onNext_steps($list)
			{
				trace('$list==============', $list)
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>