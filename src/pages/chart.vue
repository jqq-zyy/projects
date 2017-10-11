<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav :nav="'chart'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav>
						<input type="text">
					</common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<p class="g-title">
								图表分析
							</p>
							<!--新扫码消费者-->
							<div class="g-chart">
								<div class="chart-nav">
									<div class="chart-nav-left">
										<span class="chart-last">最近7天</span>
										<span class="chart-month">最近30天</span>
									</div>
									<div class="chart-nav-right">
										<div class="chart-nav-time">
											<span>从</span>
											<div>开始时间</div>

											<span>从</span>
											<div>结束时间</div>
										</div>
										<div class="chart-nav-search pointer border-btn hb-fill-middle2-rev">
											查询
										</div>

										<div class="chart-nav-select pointer border-btn hb-fill-middle2-bg"
											 @click="onClick_selctBtn()">
											选择活动
										</div>
									</div>
								</div>
								<div class="chart-detail">
									<p>新扫码消费者</p>
									<!--<img src="./../../assets/images/bag-bg.png" alt="">-->
								</div>
							</div>

							<!--消费时间分布-->
							<div class="g-chart">
								<div class="chart-nav">
									<div class="chart-nav-left">
										<span class="chart-today">今天</span>
										<span class="chart-yesterdat">昨天</span>
										<span class="chart-last">最近7天</span>
										<span class="chart-month">最近30天</span>
									</div>
									<div class="chart-nav-right">
										<div class="chart-nav-time">
											<span>从</span>
											<div>开始时间</div>

											<span>从</span>
											<div>结束时间</div>
										</div>
										<div class="chart-nav-search pointer border-btn hb-fill-middle2-rev">
											查询
										</div>

									</div>
								</div>
								<div class="chart-detail">
									<p>消费时间分布</p>
									<!--<img src="./../../assets/images/bag-bg.png" alt="">-->
								</div>

							</div>

							<!--扫码次数走势图-->
							<div class="g-chart">
								<div class="chart-nav">
									<div class="chart-nav-left">
										<span class="chart-today">今天</span>
										<span class="chart-yesterdat">昨天</span>
										<span class="chart-last">最近7天</span>
										<span class="chart-month">最近30天</span>
									</div>
									<div class="chart-nav-right">
										<div class="chart-nav-time">
											<span>从</span>
											<div>开始时间</div>

											<span>从</span>
											<div>结束时间</div>
										</div>
										<div class="pointer border-btn chart-nav-search hb-fill-middle2-rev">
											查询
										</div>
									</div>
								</div>
								<div class="chart-detail">
									<p>扫码次数走势图</p>
									<!--<img src="./../../assets/images/bag-bg.png" alt="">-->
								</div>

							</div>

							<!--累计消费次数分布-->
							<div class="g-chart">
								<div class="chart-nav">
									<div class="chart-nav-left">
										<span class="chart-today">今天</span>
										<span class="chart-yesterdat">昨天</span>
										<span class="chart-last">最近7天</span>
										<span class="chart-month">最近30天</span>
									</div>
									<div class="chart-nav-right">
										<div class="chart-nav-time">
											<span>从</span>
											<div>开始时间</div>

											<span>从</span>
											<div>结束时间</div>
										</div>
										<div class="pointer border-btn chart-nav-search hb-fill-middle2-rev">
											查询
										</div>

									</div>
								</div>
								<div class="chart-detail chart-last">
									<div class="chart-last-left">
										<p>累计消费次数分布</p>
										<!--<img src="./../../assets/images/bag-bg.png" alt="">-->
									</div>
									<div class="chart-last-right">
										<p>消费地区分布</p>
										<!--<img src="./../../assets/images/bag-bg.png" alt="">-->
									</div>
								</div>

							</div>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_detailPop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit">
							选择想查看的活动
						</div>
						<div class="pop-body tree-box">
							<label for="ac1">
								<input type="checkbox" id="ac1">活动1
							</label>
							<label for="ac2">
								<input type="checkbox" id="ac2">活动2
							</label>
							<label for="ac3">
								<input type="checkbox" id="ac3">活动3
							</label>
							<label for="ac1">
								<input type="checkbox" id="ac4">活动4
							</label>
							<label for="ac5">
								<input type="checkbox" id="ac5">活动1
							</label>
							<label for="ac6">
								<input type="checkbox" id="ac6">活动2
							</label>
							<label for="ac7">
								<input type="checkbox" id="ac7">活动3
							</label>
							<label for="ac8">
								<input type="checkbox" id="ac8">活动4
							</label>
							<div class="button-box">
								<div class="activity-btn pointer border-btn hb-fill-middle2-bg">取消</div>
								<div class="activity-btn pointer bg-btn hb-fill-middle2-rev">保存</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</main-layout>
</template>


<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonPage from './common/CommonPage.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';
	import CommonSort from './common/CommonSort.vue';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_dropList: false,
				isShow_detailPop: false,
				g: g,
				totalPage: 1,
				statusList: [],
				typeList: ['流水ID', '发起人'],
				currentType: '流水ID',
				platformList: [],
				currnetPlatform: {},
				dataObj: {
					'recordTypes': [-1],
					'beginTimeStart': "",
					'beginTimeEnd': "",
					"recordId": "",
					"author": "",
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortField': "",
					'sortOrder': "desc"
				},
				totalAmount: 0,
				payAmount: 0,
				balanceAmount: 0
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			CommonFooter,
			CommonPrompt,
			CommonSort
		},
		methods: {
			init(){
				var info = g.data.platformPool;
				this.totalPage = info.totalPage;
				this.platformList = info.list;
				this.totalAmount = info.totalIncome;
				this.payAmount = info.totalDisburse;
				this.balanceAmount = info.balance;
				this.statusList = info.typeData;
			},

			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_bagList()
			},
			onUpdate_bagList(){
//				g.ui.showLoading();
//				g.net.call("/activity/queryActivityStatisticByPage", this.dataObj).then(($data) =>
//				{
//					g.data.activityPool.removeAll();
//					var obj = {};
//					obj.resultPageList = $data;
//					g.data.activityPool.update(obj);
//					this.activityList = g.data.activityPool.list;
//					g.ui.hideLoading();
//					this.initData();
//				}, (err) =>
//				{
//					g.func.dealErr(err);
//				});
			},
			onClick_dropItem($type, $item){
				this.currentType = $item;
				this.dataObj.inOutType = $type;
				this.isShow_dropList = false;
			},
			onClick_dropListBtn(){
				if (this.isShow_dropList)
				{
					this.isShow_dropList = false;
				}
				else
				{
					this.isShow_dropList = true;
				}

			},
			onClick_changeType($typeId){
				$typeId = Number($typeId);
				this.dataObj.page = 1;
				var recordTypes = this.dataObj.recordTypes;
				if ($typeId == -1)
				{
					this.dataObj.recordTypes = [-1]
				}
				else
				{
					if (recordTypes.indexOf(-1) > -1)
					{
						this.dataObj.recordTypes = []

					}
					var index = recordTypes.indexOf($typeId);
					if (index > -1)
					{
						this.dataObj.recordTypes.splice(index, 1)
					}
					else
					{
						this.dataObj.recordTypes.push($typeId)
					}
				}

				this.onUpdate_bagList()
			},
			onClick_searchBtn(){
				this.onUpdate_bagList()
			},
			onClick_sortBtn($field){
				if (this.dataObj.sortOrder == "desc")
				{
					this.dataObj.sortOrder = "asc"
				}
				else
				{
					this.dataObj.sortOrder = "desc"
				}
				this.dataObj.page = 1;
				this.dataObj.sortField = $field;
				this.onUpdate_bagList();
			},
			onClick_dropList(){
				if (this.isShow_dropList)
				{
					this.isShow_dropList = false;
				}
				else
				{
					this.isShow_dropList = true;
				}
			},
			isCurrentType($type){
				if (this.dataObj.recordTypes.indexOf(Number($type)) > -1)
				{
					return true
				}
				return false
			},
			onClick_exportBtn(){

			},
			onClick_addBtn(){
				g.url = ("/addplatform")
			},
			onClick_platformItem($id){
				this.currnetPlatform = g.data.platformPool.getDataById($id);
				this.isShow_detailPop = true;
			},
			onClick_closeBtn(){
				this.isShow_detailPop = false;
			},
			onClick_selctBtn(){
				this.isShow_detailPop = true;
			}
		}
	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common";
	@import "../css/myActivity";
	@import "../css/pop";
</style>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/chart";
</style>