<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'bill'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body bill-right-body">
							<div class="bill-title g-title">
								红包使用记录
							</div>
							<div class="bill-bar bill-bar-code">{{g.lang("当前账户余额")}}:
								<span><i class="code-number">{{assetAmount}}</i>元</span>
								<span class="button recharge-btn pointer bg-btn" @click="onClick_rechargeBtn">{{g.lang("充值")}}</span>
								<span class="recharge-button  pointer" @click="onClick_refundBtn">{{g.lang
									("申请退款")}}</span>
							</div>
							<div class="recharge-record">
								<div class="recharge-record-bottom">
									<div class="date-box">
										<div class="date-from">
											<input type="text" class="startTime date-input" v-model="date.startTimeStr"
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
											<input type="text" class="endTime date-input" v-model="date.endTimeStr"
												   readonly="true" @click.stop="onClick_showCalendar('end')">
											<calendar @click="onClick_chooseDateEnd" v-show="isShowEndTime"
													  class="drop-time" :startTime="date.startTime"
													  :isCanBefore="true"></calendar>
										</div>
									</div>
									<div class="button pointer search-btn bg-btn" @click="onClick_searchBtn">查询</div>
								</div>
							</div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th @click="onClick_sortBtn('receive_time')" class="pointer">
											时间
											<common-sort :type="receiveObj.sortOrder"
														 :target="'receive_time'"
														 :currentField="receiveObj.sortField"
											></common-sort>
										</th>
										<th>账户支出金额</th>
										<th>平台优惠金额</th>
										<th>红包总金额</th>
										<th>所属活动</th>
										<th>所属外包装码</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in receiveList">
										<td>{{item.receiveTime}}
										</td>
										<td>{{item.receiveAmount}}</td>
										<td>{{item.rewardAmount}}</td>
										<td>{{item.totalAmount}}</td>
										<td><span class="money-from">{{item.activityName}}</span></td>
										<td><span>{{item.batchNo}}</span></td>
									</tr>
									</tbody>
								</table>
							</div>
							<common-page :index="receiveObj.page" :total="totalPage"
										 @change="onChange_searchItem" v-show="totalPage>1"></common-page>
							<common-prompt v-show="receiveList.length==0"></common-prompt>
						</div>

						<common-footer></common-footer>
					</div>
				</div>
				<transition name="bounce">
					<recharge-pop v-show="isShow_rechargePop" :buyTypeList="buyTypeList"
								  @close="onClick_closeBtn"></recharge-pop>
				</transition>
				<transition name="bounce">
					<refund-pop v-show="isShow_refundPop" :totalAmount="assetAmount"
								@close="onClick_closeBtn"></refund-pop>
				</transition>
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
	import CommonSort from './common/CommonSort.vue';
	import RechargePop from '../components/BillPop/rechargePop.vue';
	import RefundPop from '../components/BillPop/refundPop.vue';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShowStartTime: false,
				isShowEndTime: false,
				isShow_rechargePop: false,
				isShow_refundPop: false,
				g: g,
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				receiveList: [],
				buyTypeList: []
			}
		},
		watch: {},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			Calendar,
			CommonFooter,
			CommonPrompt,
			CommonSort,
			RechargePop,
			RefundPop
		},
		methods: {
			init(){
				this.initDate();
				this.initCheckData();
				this.assetAmount = Number(g.data.get('shopAsset').assetCurrentAmount)/100;
				this.receiveList = g.data.bagReceivePool.list;
				this.totalPage = g.data.bagReceivePool.totalPage
			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond() ;
				this.date.endTime = this.date.startTime ;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			initCheckData(){
				this.receiveObj = {
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortField': 'receive_time',
					'sortOrder': 'desc'
				}
			},
			onClick_closeBtn(){
				this.isShow_rechargePop = false;
				this.isShow_refundPop = false;
			},
			onClick_rechargeBtn(){
				if (this.buyTypeList.length > 0)
				{
					this.isShow_rechargePop = true;
					return
				}
				g.net.call("config/payWayConfig").then(($data) =>
				{
					this.buyTypeList = $data.payWayList;
					this.isShow_rechargePop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});

			},
			onClick_refundBtn(){
				this.isShow_refundPop = true;
			},
			onClick_searchBtn(){
				this.receiveObj.page = 1;
				this.onUpdate_rechargeList()
			},
			onChange_searchItem($page, $pageSize){
					if ($page)
					{
						this.receive.page = $page;
					}
					if ($pageSize)
					{
						this.receive.pageSize = $pageSize;
					}
					this.onUpdate_rechargeList()

			},
			onUpdate_rechargeList(){
				g.ui.showLoading();
				this.receiveObj.startTime = this.date.startTimeStr;
				this.receiveObj.endTime = this.date.endTimeStr;
				g.net.call("order/queryRpReceiveRecordList", this.receiveObj).then(($data) =>
				{
					g.data.bagReceivePool.removeAll();
					g.data.bagReceivePool.update($data);
					g.ui.hideLoading();
					this.receiveList = g.data.bagReceivePool.list;
					this.totalPage = g.data.bagReceivePool.totalPage
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_sortBtn($field){
				if(this.receiveObj.sortOrder =="desc"){
					this.receiveObj.sortOrder ="asc"
				}else{
					this.receiveObj.sortOrder ="desc"
				}
				this.receiveObj.page = 1;
				this.receiveObj.sortField = $field;
				this.onUpdate_rechargeList();

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
				this.date.startTime = new Date(dateArr[0], dateArr[1], dateArr[2]).getTime() / 1000;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				if (this.date.startTime > this.date.endTime)
				{
					this.onClick_chooseDateEnd(dateArr);
				}
				this.isShowStartTime = false;
			},

			onClick_chooseDateEnd(dateArr){
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
	@import "../css/myBill.scss";

	.date-input {
		background: url("../../assets/images/date.png") no-repeat 160px center;
	}
</style>






