<template>
	<div class="nav-navicon">
		<div>
			<header class="header">
				运营管理后台
			</header>
			<section class="nav-body">
				<div class="am-icon-volume-up" v-for="navClass in navClassList">
					<div class="show-nav-name m-height-light pointer" @click="onClick_navClassItem(navClass.id)"
						 :class="[onConfirm_isCurrent(navClass.id)? 'gray-bg':'']">
						<img class="icon-l"
							 :src="g.config.path.images+'/'+navClass.icon+onConfirm_isCurrent(navClass.id)+'.png'">
						<p :class="[onConfirm_isCurrent(navClass.id)? 'content-blue':'']">{{navClass.name}}</p>

						<img class="icon-r"
							 v-show="navClass.nav!=''"
							 :src="g.config.path.images+'/icon-r'+onConfirm_isCurrent(navClass.id)+'.png'">
					</div>
					<!--<transition name="nav">-->
					<ul class="nav-column" v-show="currSelectNavIdList.indexOf(navClass.id) >= 0">
						<li class="pointer " v-for="navItem in navClass.nav"
							@click.stop="onClick_navItem(navItem.path)"
							:class="[navItem.highLightList.indexOf(currPath) >= 0? 'light-height':'']">
							<span class="icon-circle"></span>
							<p>{{navItem.name}}</p>
							<img class="icon-arrow" :src="g.config.path.images+'/icon-arrow.png'" alt=""
								 v-show="navItem.highLightList.indexOf(currPath) >= 0">
						</li>
					</ul>
					<!--</transition>-->
				</div>
			</section>
			<footer class="nav-footer"></footer>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import RouterList from './../../router';
	import g from './../../global';
	import * as AppManager from './../../js/manager/AppManager';

	export default {
		created(){
//			var permissionId = g.data.get("userInfo").permissionIds;
//			this.idList = permissionId.split(",");
			var tempList = g.data.navPool.list.concat();
			var currentNav;
			this.navClassList = tempList;
			if (this.nav != '')
			{
				currentNav = [g.data.navPool.getDataById(this.nav)];
			}
			else
			{
				currentNav = [];
			}

			for (var item of currentNav)
			{
				this.currSelectNavIdList.push(item.id)
			}
			;
			this.currPath = g.vue.router.currentRoute.path;
			if (g.vue.router.currentRoute.matched[0].path != "")
			{
				this.currPath = g.vue.router.currentRoute.matched[0].path;
			}
		},
		data(){
			return {
				g: g,
				navClassList: [],
				currPath: "",
				currSelectNavIdList: [],
				isHasRole: false
//				idList:[]
			}
		},
		computed: {
			appName()
			{
				var appItem = g.data.appPool.getDataById(this.appId);
				if (appItem)
				{
					return appItem.name
				}
				return '';
			}
		},
		props: {
			nav: {
				default: ''
			}
		},
		methods: {
			onClick_navClassItem($navClassId)
			{
				var currentObj = g.data.navPool.getDataById($navClassId);
				var index = this.currSelectNavIdList.indexOf($navClassId);
				if(currentObj.path == this.currPath){
					return
				}
				if(currentObj.nav==""){
					g.url = currentObj.path;
				}
//				this.currSelectNavIdList = [];
				if (index < 0)
				{
					this.currSelectNavIdList.push($navClassId);
				}
				else
				{
					this.currSelectNavIdList.splice(index, 1);
				}
			},
			onClick_navItem($path)
			{
				var lastUrl = '';
				if (lastUrl != g.url && !this.appId)
				{
					g.url = $path;
				}
				else if (lastUrl != g.url && this.appId != 0)
				{
					g.url = $path + '?appId=' + this.appId
				}
				lastUrl = g.url
			},
			onConfirm_isCurrent($id){
				return this.currSelectNavIdList.indexOf($id) >= 0 ? 1 : "";
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../../css/nav.scss";

	.gray-bg {
		background: #242950;
	}
	.content-blue {
		color: #0189c0 !important;
	}
</style>
