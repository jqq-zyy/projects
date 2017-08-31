<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'help'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body explain-right-body">
							<div class="g-title">使用说明</div>

							<!--<div class="admin-calendar-table explain-box">-->
								<!--<iframe :src="g.config.path.assets+'/explain.html'" frameborder="0"></iframe>-->
							<!--</div>-->
							<div class="explain-list m-checked">
								<p>如何注册账号</p>
								<!--<img :src="g.config.path.images+'/step.png'" alt="">-->
								<img :src="g.config.path.images+'/step1.png'" alt="">
							</div>
							<div class="explain-list">
								<p>如何注册账号</p>
								<img :src="g.config.path.images+'/step.png'" alt="">
								<!--<img :src="g.config.path.images+'/step1.png'" alt="">-->
							</div>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
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
			CommonTopNav,
			CommonFooter
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";

	.explain-right-body {
		/*display: flex;*/
		.explain-box {
			/*flex: 1;*/
			height:760px;
			.explain {
				padding: 20px 0 30px 50px;
				border-bottom: 1px dashed #efefef;
				h3 {
					font-size: 16px;
					line-height: 34px;
				}
				p {
					line-height: 28px;
				}
			}
			.explain:last-child {
				border: none;
			}
		}
	}

	.explain-list{
		height: 138px;
		line-height: 138px;
		padding: 0 50px;
		background: #fff;
		border: 1px solid #dbdee7;
		margin-bottom: 35px;
		p{
			float: left;
		}
		img{
			float: right;
			margin-top: 62px;
		}
	}
	.m-checked{
		border: 1px solid #01aaef;
		box-shadow: 0 0 3px #01aaef;
		p{
			color: #01aaef;
		}
	}
	iframe {
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
</style>











