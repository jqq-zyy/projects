<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'member'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-header">
							我的顾客会员
							<span class="activity-total">(共<i>2480</i>个会员)</span>
						</div>
						<div class="right-body member-list-body">
							<div class="admin-calendar-table member-list-table">
								<div class="col-6">
									<div class="panel">
										<div class="panel-heading">会员地区分布</div>
										<div class="panel-body">
											<div class="flot-chat">
												<div class="curve-wrap" id="echartsMap"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="panel">
										<div class="panel-heading ">会员扫码次数分布</div>
										<div class="panel-body">
											<div class="flot-chat">
												<div class="curve-wrap" id="eChartsMember"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="panel panel-border">
										<div class="panel-heading heading-border">会员等级分布</div>
										<div class="panel-body">
											<div class="flot-chat">
												<div class="curve-wrap" id="eChartsLevel"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="panel panel-border">
										<div class="panel-heading heading-border">会员性别分布</div>
										<div class="panel-body">
											<div class="flot-chat">
												<div class="curve-wrap" id="eChartssex"></div>
											</div>
										</div>
									</div>
								</div>
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
	import createChart from '../js/eCharts';
	import eChartsMap from '../js/eChartsMap';
	import eChartsLevel from '../js/eChartsLevel';
	import eChartsMember from '../js/eChartsMember';
	import eChartsClientModel from '../js/eChartsClientModel';
	import CommonTopNav from  './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';

	export default {
		created(){
			this.isLoad = true;
		},
		data(){

			return {
				isLoad: false,
				g: g,
				memberList: []
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods: {

			init(){
				var region = g.data.statisticsPool.region;
				var level = g.data.statisticsPool.level;
				var sex = g.data.statisticsPool.sex;
				var sweep = g.data.statisticsPool.sweep;
				var max = g.data.statisticsPool.max;
				eChartsMap('echartsMap', region,max);
				eChartsLevel ('eChartsLevel', level);
				eChartsMember ('eChartsMember', sweep);
				eChartsClientModel('eChartssex', sex)
			}

		},
		mounted(){
			this.init();
		}
	}
</script>


<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/memberList.scss";

	.curve-wrap {
		width: 500px;
		height: 300px;
		margin:auto;
	}
	@media  only screen and(max-width:1500px) {
		.curve-wrap {
			width:400px;
			height: 300px;
			margin:auto;
		}
	}
</style>










