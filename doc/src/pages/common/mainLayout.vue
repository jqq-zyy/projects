<template>
	<div class="container">
		<div class="content" v-if="isLoad">
			<slot name="content"></slot>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Router from '../../router';
	import g from '../../global';

	export default {
		props: {
			isLoad: {default: false}
		},
		created(){
			if (g.core.isInited)
			{
				!this.isLoad && g.ui.showLoading();
			}
			else
			{
				g.event.addEventListenerOnce(g.core.APP_CREATED, ()=>
				{
					!this.isLoad && g.ui.showLoading();
				});
			}
		},
		data(){
			return {
				g: g
			}
		},
		watch: {
			isLoad: function (v)
			{
				v && g.ui.hideLoading();
			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
	* {
		margin: 0px;
		padding: 0px
	}
</style>
