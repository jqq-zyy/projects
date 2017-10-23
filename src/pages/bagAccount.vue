<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav :nav="'business'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav>
						<input type="text">
					</common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<p class="g-title">
								红包账户
							</p>
							<div class="bar-box">
								<div class="bar-top">
									<ul>
										<li>状态：</li>
										<li class="type-item pointer" v-for="(item,index) in statusList"
											@click="onClick_changeType(index)"
											:class="{'acticity-process':isCurrentType(index)}">
											{{item}}
										</li>
									</ul>
								</div>
								<div class="bar-bottom">
									<div class="date-margin">
										<div class="date-box">
											<span class="creat-time">创建时间：从</span>
											<div class="date-from">
												<input type="text" class="startTime date-input pointer"
													   v-model="date.startTimeStr"
													   readonly="true"
													   @click.stop="onClick_showCalendar('start')">
												<hw-date type="date" skin="simple" @change="onClick_chooseDateStart"
														 v-model="isShowStartTime"></hw-date>
											</div>
										</div>
										<span class="goto">至</span>
										<div class="date-box">
											<div class="date-from">
												<input type="text" class="endTime date-input pointer"
													   v-model="date.endTimeStr"
													   readonly="true" @click.stop="onClick_showCalendar('end')">
												<hw-date type="date" skin="simple" @change="onClick_chooseDateEnd"
														 v-model="isShowEndTime"></hw-date>
											</div>

										</div>
									</div>
									<div class="drop-box pointer" @click.stop="onClick_dropListBtn">
										<div @click.stop="onClick_dropListBtn">
											{{currentSearchType}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>
										</div>
										<ul class="droplist" v-show="isShow_dropList">
											<li v-for="item in typeList" class="pointer"
												@click.stop="onClick_dropItem(item.id)">{{item.name}}
											</li>
										</ul>
									</div>
									<input type="text" v-model="inputContent" class="search-input">
									<span class="btn pointer search-btn border-btn hb-fill-middle2-bg"
										  @click="onClick_searchBtn">查找</span>
								</div>
							</div>
							<div class="all-out">
								<div class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right"
									 @click="onClick_exportAllBtn">导出全部
								</div>
							</div>
							<hw-table :tableData="tableData"
									  :boxWidth="boxWidth"
									  :boxHeight="boxHeight"
									  :headerHeight="headerHeight"
									  :bodyHeight="bodyHeight"
									  :footerHeight="footerHeight"
									  :fixHeader="true"
									  :leftFixedCols="9"
									  :eachRowHeight="eachRowHeight"
									  :eachColWidth="boxWidth/9.01"

									  :isShowIdCol="true"
									  @clickBtn="onClick_btn"
									  @clickHead="onClick_headItem">
								<div class="relative middle bgc-ff" :style="{minHeight:bodyHeight+'px'}">
									<p v-show="g.data.bagPool.list.length==0" class="absolute no-record"
									   :style="{left:boxWidth/2+'px'}">
										暂无记录...</p>
								</div>
							</hw-table>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="bagList.length>=1"></common-page>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body button-box">
							<div :class="['m-margin-top',auditStatus==-1?'':'text-center']">审核退款申请：
								<label class="label-left">
									<input type="radio" class="refuse-check" v-model="auditStatus"
										   value="2">通过申请</label>
								<label class="label-right">
									<input type="radio" class="refuse-check" v-model="auditStatus"
										   value="-1">拒绝申请</label>
							</div>
							<div class="m-title" v-show="auditStatus==-1"><span class="">请输入拒绝原因：</span>
								<textarea name="" id="" cols="30" rows="10" class="describle-reasons"
										  v-model="refuseContent" @focus="onFocus_refuseInput"></textarea>
								<div class="err-msg" v-text="errMsg"></div>
							</div>
							<div class="button-box m-margin-up" v-show="auditStatus==-1" style="margin-top: 0">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不拒绝</div>
								<div class="refuse-button pointer bg-btn" @click="onClick_sumbitBtn">确认拒绝并告知商户</div>
							</div>
							<div class=" button-box m-margin-up" v-show="auditStatus==2" style="margin-top: 40px">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不通过</div>
								<div class="refuse-button pointer bg-btn" @click="updateOrderAuth">确认通过并告知商户</div>
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
	import {getUserList, convertList, getFooterList} from './userList';
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
				isShowStartTime: false,
				isShowEndTime: false,
				isShow_refusePop: false,
				g: g,
				totalPage: 1,
				statusList: ["全部", "未付款", "付款中", "付款成功", "付款失败", "申请退款", "退款中", "退款成功", "退款失败"],
				bagList: [],
				currentType: "orderId",
				inputContent: "",
				errMsg: "",
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				activityStatusList: [0],
				dataObj: {},
				typeList: [
					{
						id: 'orderId',
						name: '流水ID'
					}, {
						id: "companyFullName",
						name: '企业全称'
					}, {
						id: "applyUserLogon",
						name: '发起人'
					}
				],
				rpAmount: 0,
				currentId: 0,
				auditStatus: 2,
				refuseContent: "",
				tableData: {},
				boxWidth: window.innerWidth * 0.81,
				eachRowHeight: 60,
				headerHeight: 60,
				footerHeight: 60,
				boxHeight: 610,
				bodyHeight: 420			}
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
		computed: {
			currentSearchType(){
				for (var i = 0; i < this.typeList.length; i++)
				{
					if (this.typeList[i].id == this.currentType)
					{
						return this.typeList[i].name
					}
				}
			}
		},
		methods: {
			init(){
				if( !g.data.messagePool.orderId){
					this.initDate();
				}else{
					this.currentType = 'orderId';
					this.inputContent =g.data.messagePool.orderId;
					g.data.messagePool.update({'orderId':""});
				}

				this.initData();
				this.initSearchData();

			},
			initData(){
				var info = g.data.bagPool;
				this.bagList = info.list;
				this.totalPage = info.totalPage;
				var obj = {};
				obj.header = g.data.staticTableHeaderPool.list.concat();
				obj.body = convertList(g.data.bagPool.list, g.data.staticTableHeaderPool.list, "bagAccount");
				obj.footer = getFooterList(4, g.data.staticTableHeaderPool.list, g.data.bagPool);
				this.tableData = obj;
			},
			initSearchData(){
				this.dataObj = {
					queryStatus: "",
					startTime: "",
					endTime: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					sortField: "create_time",
					sortOrder: "desc"
				}
			},
			initRefundObj(){
				this.auditStatus = 2;
				this.refuseContent = "";
				this.errMsg = "";
			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			onClick_btn($btnId, $itemId)
			{
				this.onClick_qrcodeItem($itemId);
			},
			onClick_headItem($item)
			{
				this.onClick_sortBtn($item);
			},
			onClick_bodyitem($itemId)
			{
				trace('$item', $itemId);
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				if ($pageSize != this.dataObj.pageSize)
				{
					this.dataObj.pageSize = $pageSize;
					this.dataObj.page = 1
				}
				this.onUpdate_qrcodeList()
			},
			onUpdate_qrcodeList(){
				g.ui.showLoading();
				this.dataObj.queryStatus = this.activityStatusList.join(",");
				this.dataObj.startTime = this.date.startTimeStr;
				this.dataObj.endTime = this.date.endTimeStr;
				if (this.currentType)
				{
					this.dataObj[this.currentType] = this.inputContent;
				}
				g.net.call("order/queryRpAccountList", this.dataObj).then(($data) =>
				{
					g.data.bagPool.removeAll();
					g.data.bagPool.update($data);
					if (this.currentType)
					{
						this.dataObj[this.currentType] = "";
					}
					this.initData();
					g.ui.hideLoading();

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},

			onClick_dropItem($type){
				this.currentType = $type;
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
				this.dataObj.page = 1;
				var activityStatusList = this.activityStatusList;
				if ($typeId == 0)
				{
					this.activityStatusList = [0]
				}
				else
				{
					if (activityStatusList.indexOf(0) > -1)
					{
						this.activityStatusList = []

					}
					var index = activityStatusList.indexOf($typeId);
					if (index > -1)
					{
						this.activityStatusList.splice(index, 1)
					}
					else
					{
						this.activityStatusList.push($typeId)
					}
				}

				this.onUpdate_qrcodeList()
			},
			onClick_searchBtn(){
				this.dataObj.page = 1;
				this.onUpdate_qrcodeList()
			},
			onClick_sortBtn($item){
				if (!$item.sortBy)
				{
					return;
				}
				if ($item.sortBy == "desc")
				{
					this.dataObj.sortOrder = "asc"
				}
				else
				{
					this.dataObj.sortOrder = "desc"
				}
				this.dataObj.page = 1;
				this.dataObj.sortField = $item.params;
				this.onUpdate_qrcodeList();
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
			onClick_closeBtn(){
				this.isShow_refusePop = false;
				this.initRefundObj();
			},
			isCurrentType($type){
				if (this.activityStatusList.indexOf($type) > -1)
				{
					return true
				}
				return false
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

			onClick_chooseDateStart($timeStamp){
				this.date.startTime = $timeStamp;
				this.date.startTimeStr = g.timeTool.getDate($timeStamp, true);
				if (this.date.startTime > this.date.endTime)
				{
					this.onClick_chooseDateEnd($timeStamp);
				}
				this.isShowStartTime = false;
			},

			onClick_chooseDateEnd($timeStamp){
				this.date.endTime = $timeStamp;
				this.date.endTimeStr = g.timeTool.getDate($timeStamp, true);
				if (this.date.endTime < this.date.startTime)
				{
					this.onClick_chooseDateStart($timeStamp);
				}
				this.isShowEndTime = false;
			},

			onClick_qrcodeItem($id){
				this.isShow_refusePop = true;
				this.currentId = $id;

			},
			onClick_sumbitBtn(){
				if (this.refuseContent.trim() == "")
				{
					this.errMsg = "拒绝原因不能为空";
					return
				}
				this.updateOrderAuth();
			},
			updateOrderAuth(){
				g.net.call("order/updateOrderRefundAudit", {
					"orderId": this.currentId,
					"auditStatus": this.auditStatus,
					"remark": this.refuseContent
				}).then(($data) =>
				{
					this.isShow_refusePop = false;
					this.onUpdate_qrcodeList();
					this.initRefundObj();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onFocus_refuseInput(){
				this.isShow_hasError = false;
			},
			onClick_exportAllBtn(){
				window.open(g.webParam.url.server
						+ "/export/exportRpAccountTradeList?page=0&pageSize=0&startTime="
						+ this.date.startTimeStr
						+ "&endTime=" + this.date.endTimeStr
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&queryStatus=" + this.dataObj.queryStatus
						+ "&" + this.currentType + "=" + this.inputContent
				)
				trace(g.webParam.url.server
						+ "/export/exportRpAccountTradeList?page=0&pageSize=0&startTime="
						+ this.date.startTimeStr
						+ "&endTime=" + this.date.endTimeStr
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&queryStatus=" + this.dataObj.queryStatus
						+ "&" + this.currentType + "=" + this.inputContent)
			}
		}

	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common";
	@import "../css/myActivity";

	.my-activity .me-checkbox-core {
		margin-left: 10px;
		margin-right: 10px;
	}
	.err-msg{
		color:red;
		padding-left:120px;
		height:40px;

	}
</style>


