<template>
	<main-layout :isLoad="isLoad">
		<div slot="content">
			<common-top-nav></common-top-nav>
			<div class="admin-main-wrap">
				<common-nav></common-nav>
			</div>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	export default {
		created(){
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav
		}
	}
</script>

<style>
</style>
