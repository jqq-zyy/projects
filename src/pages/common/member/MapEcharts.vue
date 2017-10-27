<template>
	<div class="col col-6">
		<div class="panel">
			<div class="panel-heading">消费地区分布
				<!--<span class="pointer out-btn bg-btn hb-fill-middle2-rev">导出全部</span>-->
			</div>
			<div class="panel-body">
				<div class="flot-chat">
					<div class="curve-wrap" id="echartsMap"></div>
					<div class="city-box" v-show="cityList.length>0">
						<ul class="city-list">
							<li class="city-item" v-for="item in cityList">
								<span class="city-name">
									{{item.regionName}}
								</span>
								<span class="city-number">
									{{item.regionCount}}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script type="text/ecmascript-6">
	import RouterList from './../../../router';
	import g from './../../../global';
	import eCharts from './../../../js/eCharts/main';
	import eCharts_map from './../../../js/eCharts/template/map';

	export default {
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				isShowStartTime: false,
				isShowEndTime: false,
				isShowActivityList: false,
				timeList: [],
			}
		},
		watch: {
			mapList($val){
				this.initEcharts()
			}

		},
		props: {
			mapList: {
				default: []
			},
			cityList: {
				default: []
			}
		},
		methods: {
			init(){
				this.$nextTick(function ()
				{
					this.initEcharts();
				})
			},

			initEcharts(){
				var dataList = [{
					name: "消费",
					list: this.mapList,
					color: "#ec9b98",
					type: "map",
					mapType: "china",
					itemStyle: {
						"normal": {
							"label": {
								"show": true
							}
						},
						"emphasis": {"label": {"show": true}}
					},
					areaStyle: {normal: {}},
					isSet: false
				}];
				eCharts("echartsMap", eCharts_map, dataList, '', () =>
				{
					var ecConfig = window.require('echarts/config');
					myChart.on(ecConfig.EVENT.MAP_SELECTED, (param) =>
					{
						var mapId = g.data.statisticsPool.getDataById(param.target)
						this.$emit('click', mapId)

					})
				}, 5);

			},

		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	#echartsMap {
		width: 80%;
		margin-left: 0;
		float: left;
		display: inline-block;
	}

	.city-box {
		width: 19%;
		float: left;
		margin-top: 30px;
		.city-list {
			width: 100%;
			height: auto;
			max-height: 243px;
			overflow-y: scroll;
			border: 1px solid #dbdee7;
			.city-item {
				cursor: pointer;
				color: #979797;
				font-size: 14px;
				line-height: 40px;
				border-bottom: 1px solid #dbdee7;
				overflow: hidden;
				padding: 0 3%;
				.city-name {
					width: 47%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					float: left;
				}
				.city-number{
					float: left;
					width: 47%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				&:hover {
					color: #252332;
				}
				&:nth-child(2n-1) {
					background: #f2f4f9;
				}
				&:nth-child(2n) {
					background: #ffffff;
				}
				&:last-child {
					border-bottom: none;
				}
			}

		}
	}

	@media screen and(max-width: 1400px) {
		.city-box {
			width: 29%;
		}

		#echartsMap {
			width: 70%;

		}
	}
</style>



