<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'chart'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body member-list-body">
							<div class="g-title">图表分析</div>
							<div class=" member-list-table">
								<new-member-echarts></new-member-echarts>
								<qrcode-count-echarts></qrcode-count-echarts>
								<scan-time-echarts></scan-time-echarts>
								<four-echarts></four-echarts>
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
	import CommonTopNav from  './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import NewMemberEcharts from './common/member/NewMemberEcharts.vue';
	import ScanTimeEcharts from './common/member/ScanTimeEcharts.vue';
	import QrcodeCountEcharts from './common/member/QrcodeCountEcharts.vue';
	import FourEcharts from './common/member/FourEcharts.vue';

	export default {
		created(){
			this.isLoad = true;
			if (_hash)
			{
				_hash = Object.create(null);
			}
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
			CommonFooter,
			NewMemberEcharts,
			ScanTimeEcharts,
			QrcodeCountEcharts,
			FourEcharts
		},
		methods: {

			init(){
			}

		},
		mounted(){
			this.init();
		}
	}
</script>


<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/memberList.scss";
	.curve-wrap {
		//width: 500px;
		height: 300px;
		margin: auto;
	}

	.echarts-box {
		overflow: hidden
	}

	@media only screen and(max-width: 1500px) {
		.curve-wrap {
			//width: 400px;
			height: 300px;
			margin: auto;
		}
	}
</style>
