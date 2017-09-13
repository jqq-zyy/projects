<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'bill'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body bill-right-body">
							<div class="g-title">二维码购买/退款记录</div>
							<div class="bill-bar bill-bar-code">未导出二维码数量:
								<span> <i class="code-number">{{unexportCount}}</i>个
									<span v-show="freezeCount>0" class="refunds">({{freezeCount}}个退款中)</span></span>
								<span class="recharge-button pointer" @click="onClick_refundBtn">{{g.lang
									("申请退款")}}</span>
							</div>
							<div class="recharge-record bill-bar-code">
								<div class="recharge-record-bottom">
									<div class="date-box">
										<div class="date-from">
											<input type="text" class="startTime date-input pointer"
												   v-model="date.startTimeStr"
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
											<input type="text" class="endTime date-input pointer"
												   v-model="date.endTimeStr"
												   readonly="true" @click.stop="onClick_showCalendar('end')">
											<calendar @click="onClick_chooseDateEnd" v-show="isShowEndTime"
													  class="drop-time" :startTime="date.startTime"
													  :isCanBefore="true"></calendar>
										</div>

									</div>
									<div class="drop-box pointer">
										<div @click.stop="onClick_dropListBtn">
											{{typeList[rechargeObj.inOutType]}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"
												  @click.stop="onClick_dropListBtn"></span>
										</div>
										<ul class="droplist" v-show="isShow_dropList">
											<li class="pointer" v-for="(item,index) in typeList "
												@click="onClick_dropItem(index)">{{item}}
											</li>
										</ul>
									</div>
									<div class="button pointer search-btn bg-btn" @click="onClick_searchBtn">查询</div>
								</div>

							</div>
							<div class="recharge-table admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>款项用途/来源</th>
										<th>支出/收入

										</th>
										<th @click="onClick_sortBtn('order_amount')" class="pointer">
											金额(元)
											<common-sort :type="rechargeObj.sortOrder"
														 :target="'order_amount'"
														 :currentField="rechargeObj.sortField"
											></common-sort>
										</th>
										<th>付款方式</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											发生时间
											<common-sort :type="rechargeObj.sortOrder"
														 :target="'create_time'"
														 :currentField="rechargeObj.sortField"
											></common-sort>
										</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in rechargeList">
										<td>{{item.orderType}}</td>
										<td>{{item.inOutType}}</td>
										<td>{{item.orderAmount}}</td>
										<td>{{item.payWay}}</td>
										<td>{{item.createTime}}</td>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<common-page :index="rechargeObj.page" :total="totalPage"
										 @change="onChange_searchItem" v-show="totalPage>1"></common-page>
							<common-prompt v-show="rechargeList.length==0"></common-prompt>
						</div>

						<common-footer></common-footer>

					</div>
				</div>

				<transition name="bounce">
					<bill-detail-pop v-show="isShow_detailPop"
									 @close="onClick_closeBtn" :itemDetail="itemDetail"></bill-detail-pop>
				</transition>
				<transition name="bounce">
					<qrcode-refund-pop v-show="isShow_refundPop"
									   @close="onClick_closeBtn" @next="onGet_refundSuccess"
									   :unexportCount="unexportCount"
									   :channeList="channeList"></qrcode-refund-pop>
				</transition>
				<transition name="bounce">
					<div class="affix-box default-pos-type" v-show="isShow_refundSuccessPop">
						<div class="pop-edit-password add-level-pop refund-pop">
							<div class="show-close-btn">
								<img :src="g.config.path.images+'/close.png'"
									 @click="onClick_confirmBtn"/>
							</div>
							<div class="step-about-tit show-recharge-tips">
								{{g.lang("申请提交成功")}}
							</div>
							<div class="pop-body add-level-body">
								您的退款申请已成功提交我们会在3-5个工作日内进行审核，并及时将款项退还到您支付时的账户
							</div>

							<div class="confirm-edit-wrap">
								<div class="save-button pointer bg-btn" @click="onClick_confirmBtn">我知道了</div>
							</div>
						</div>
					</div>
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
	import BillDetailPop from '../components/BillPop/billDetailPop.vue';
	import qrcodeRefundPop from '../components/QRcodePop/QRcodeRefundPop.vue';
	import {Popup} from 'mint-ui';
	import {getQrcode} from './userList';
	import Calendar from './common/Calendar.vue';
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
				isShowStartTime: false,
				isShowEndTime: false,
				isShow_dropList: false,
				isShow_detailPop: false,
				isShow_refundPop: false,
				isShow_refundSuccessPop: false,
				g: g,
				itemDetail: {},
				channeList: [],
				unexportCount: 0,
				freezeCount: 0,
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				rechargeObj: {},
				redpackObj: {},
				assetAmount: 0,
				rechargeList: [],
				typeList: ["全部", "收入", "支出"],
				totalPage: 1
			}
		},
		watch: {},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			Calendar,
			BillDetailPop,
			CommonFooter,
			CommonPrompt,
			CommonSort,
			qrcodeRefundPop
		},
		methods: {
			init(){
				this.initDate();
				this.initCheckData();
				if (g.data.qrcodePool.unexportCount)
				{
					this.initQRcodeCount()
				}
				else
				{
					getQrcode(this.initQRcodeCount)
				}

				this.rechargeList = g.data.rechargePool.list;
				this.totalPage = g.data.rechargePool.totalPage
			},
			initQRcodeCount(){
				this.unexportCount = g.data.qrcodePool.unexportCount;
				this.freezeCount = g.data.qrcodePool.freezeCount;

			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			initCheckData(){
				this.rechargeObj = {
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortField': 'create_time',
					'sortOrder': 'desc',
					'inOutType': 0
				}
			},
			onClick_refundBtn(){
				g.net.call("config/getRefundConfigInfo", {
					"refundType": 1
				}).then(($data) =>
				{
					this.channeList = $data.data;
					this.isShow_refundPop = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});

			},
			onClick_searchBtn(){
				this.rechargeObj.page = 1;
				this.onUpdate_rechargeList()
			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.rechargeObj.page = $page;
				}
				if ($pageSize)
				{
					this.rechargeObj.pageSize = $pageSize;
				}
				this.onUpdate_rechargeList()
			},
			onUpdate_rechargeList(){
				g.ui.showLoading();
				this.rechargeObj.startTime = this.date.startTimeStr;
				this.rechargeObj.endTime = this.date.endTimeStr;
				g.net.call("order/queryConsumeOrderList", this.rechargeObj).then(($data) =>
				{
					g.data.rechargePool.removeAll();
					g.data.rechargePool.update($data);
					g.ui.hideLoading();
					this.rechargeList = g.data.rechargePool.list;
					this.totalPage = g.data.rechargePool.totalPage
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},

			onClick_closeBtn(){
				this.isShow_rechargePop = false;
				this.isShow_refundPop = false;
				this.isShow_detailPop = false;
				this.isShow_refundPop = false;
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
			onClick_detailBtn($id){
				this.itemDetail = g.data.rechargePool.getDataById($id);
				this.isShow_detailPop = true;
			},
			onClick_dropItem($type){
				this.rechargeObj.inOutType = $type;
				this.isShow_dropList = false;
			},
			onClick_sortBtn($field){
				if (this.rechargeObj.sortOrder == "desc")
				{
					this.rechargeObj.sortOrder = "asc"
				}
				else
				{
					this.rechargeObj.sortOrder = "desc"
				}
				this.rechargeObj.page = 1;
				this.rechargeObj.sortField = $field;
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
			},
			onGet_refundSuccess($refundCount){
				this.isShow_refundPop = false;
				this.isShow_refundSuccessPop = true;
				this.unexportCount = this.unexportCount - $refundCount;
				this.freezeCount = Number(this.freezeCount) + Number($refundCount);
				this.onChange_searchItem(1)
			},
			onClick_confirmBtn(){
				this.isShow_refundSuccessPop = false;
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

