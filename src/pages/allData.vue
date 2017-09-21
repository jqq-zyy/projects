<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'data'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">

						<div class="right-body bill-right-body">
							<div class="g-title">数据概览</div>
							<div class="data-bar">
								<div class="recharge-record-left">
									<span class="bag-use pointer" v-for="item in dateList"
										  :class="{'current':dateType==item.id}"
										  @click="onClick_dateBtn(item.id)">{{item.type}}</span>

								</div>
								<div class="recharge-record-right">
									<div class="date-box">
										<div class="date-from">
											<input type="text" class="date-input pointer" v-model="date.startTimeStr"
												   readonly="true"
												   @click.stop="onClick_showCalendar('start')">
											<calendar @click="onClick_chooseDateStart" v-show="isShowStartTime"
													  class="drop-time"
													  ref="timeBox" :isCanBefore="true"></calendar>
										</div>
									</div>
									<span class="goto">-</span>
									<div class="date-box">
										<div class="date-from">
											<input type="text" class="date-input pointer" v-model="date.endTimeStr"
												   readonly="true" @click.stop="onClick_showCalendar('end')">
											<calendar @click="onClick_chooseDateEnd" v-show="isShowEndTime"
													  class="drop-time" :startTime="date.startTime"
													  :isCanBefore="true"></calendar>
										</div>
									</div>
									<span class="pointer search-btn border-btn" @click="onClick_searchBtn">查找</span>
								</div>
							</div>
							<div class="data-title-box">
								<div class="data-record">
									<p class="people"><span class="data-number">{{overViewObj.receiveCount}}</span>次</p>
									<p class="data-title">领红包次数</p>
								</div>
								<div class="data-record">
									<p class="people"><span class="data-number">{{overViewObj.memberCount}}</span>人</p>
									<p class="data-title">领红包人数</p>
								</div>
								<div class="data-record">
									<p class="people"><span class="data-number">{{overViewObj.newMemberCount}}</span>人
									</p>
									<p class="data-title">新增会员数</p>
								</div>
								<div class="data-record">
									<p class="people"><span class="data-number">{{overViewObj.totalAmount}}</span>元</p>
									<p class="data-title">红包总花费</p>
								</div>
								<div class="data-record">
									<p class="people"><span class="data-number">{{overViewObj.averageAmount}}</span>元
									</p>
									<p class="data-title">红包平均金额</p>
								</div>
							</div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>活动名称</th>
										<th>领红包次数（次）</th>
										<th>领红包人数（人）</th>
										<th>新增会员数（人）</th>
										<th>红包花费（元）</th>
										<th>红包平均金额（元）</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in viewList">
										<td>{{item.activityName}}</td>
										<td>{{item.receivedCountStr}}</td>
										<td>{{item.memberCountStr}}</td>
										<td>{{item.newMemberCountStr}}</td>
										<td>{{item.totalAmountStr}}</td>
										<td>{{item.averageAmountStr}}</td>
									</tr>
									</tbody>
								</table>
							</div>
							<common-page :index="indexPage" :total="totalPage"
										 @change="onChange_searchItem" v-show="totalPage>1"></common-page>
							<common-prompt v-show="viewList.length==0"></common-prompt>
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
	import CommonPage from './common/CommonPage.vue';
	import Calendar from './common/Calendar.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';

	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				g: g,
				isShowStartTime: false,
				isShowEndTime: false,
				overViewObj: {},
				indexPage: 1,
				pageSize: g.param.pageSizeList[0],
				totalPage: 1,
				dateType: 0,
				viewList: [],
				dateList: [],
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				}

			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			Calendar,
			CommonFooter,
			CommonPrompt

		},
		methods: {
			init(){
				this.dateList = g.data.staticData['date.json'];
				this.initData();
				this.initDate(0);

			},
			initData(){
				this.viewList = g.data.allDataPool.list;
				this.overViewObj.receiveCount = g.data.allDataPool.receiveCount;
				this.overViewObj.memberCount = g.data.allDataPool.memberCount;
				this.overViewObj.newMemberCount = g.data.allDataPool.newMemberCount;
				this.overViewObj.totalAmount = g.data.allDataPool.totalAmount;
				this.overViewObj.averageAmount = g.data.allDataPool.averageAmount;
				this.totalPage = g.data.allDataPool.totalPage;
			},
			initDate($num){
				var nowDate = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.startTime = nowDate + (86400 * $num);
				if ($num == -1)
				{
					this.date.endTime = nowDate + (86400 * $num);
				}
				else
				{
					this.date.endTime = nowDate
				}
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			onClick_searchBtn(){
				this.indexPage = 1;
				this.onUpdate_orderList();
			},
			onClick_dateBtn($num){
				this.indexPage = 1;
				this.dateType = $num;
				this.initDate($num);
				this.onUpdate_orderList();
			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.indexPage = $page;
				}
				if ($pageSize)
				{
					this.pageSize = $pageSize;
				}
				this.onUpdate_orderList()
			},
			onUpdate_orderList(){
				g.ui.showLoading();
				g.net.call("statistic/overview", {
					'page': this.indexPage,
					'pageSize': this.pageSize,
					'startTime': this.date.startTimeStr,
					'endTime': this.date.endTimeStr
				}).then(($data) =>
				{
					g.data.allDataPool.removeAll();
					g.data.allDataPool.update($data);
					g.ui.hideLoading();
					this.initData();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_showCalendar(str){
				if (str == 'start')
				{
					//this.startTime = 0;
					if (this.isShowStartTime)
					{
						this.isShowStartTime = false;
					}
					else
					{
						this.isShowStartTime = true;
					}
					this.isShowEndTime = false;
				}
				else
				{

					if (this.isShowEndTime)
					{
						this.isShowEndTime = false;
					}
					else
					{
						this.isShowEndTime = true;
					}
					this.isShowStartTime = false;
				}
			},
			onClick_chooseDateStart(dateArr){
				this.dateType = 1;
				this.date.startTime = new Date(dateArr[0], dateArr[1], dateArr[2]).getTime() / 1000;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				if (this.date.startTime > this.date.endTime)
				{
					this.onClick_chooseDateEnd(dateArr);
				}
				this.isShowStartTime = false;
			},

			onClick_chooseDateEnd(dateArr){
				this.dateType = 1;
				this.date.endTime = new Date(dateArr[0], dateArr[1], dateArr[2]).getTime() / 1000;
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
				if (this.date.endTime < this.date.startTime)
				{
					this.onClick_chooseDateStart(dateArr);
				}
				this.isShowEndTime = false;
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	/*@import "../css/myBill.scss";*/
	@import "../css/allData.scss";
</style>