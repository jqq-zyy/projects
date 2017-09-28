 <template>
	<hw-btn type="primary" @click="onClick_btn"></hw-btn>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,
			}
		},
		methods: {
			onClick_btn()
			{
				this.$toast('hahhahahahahha');

			}
		}

	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>