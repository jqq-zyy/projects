<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'user'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body bill-right-body">
							<div class="g-title">商户列表</div>
							<div class="bar-box">
								<div class="bar-top">

									<ul>
										<li>运营状态：</li>
										<li v-for="(item ,index) in freezeStatusList"
											@click="onClick_freezeStatusItem(index)"
											:class="{'currentStatus':index==searchObj.freezeStatus}"
											class="pointer"
										>{{item}}
										</li>
									</ul>
									<ul>
										<li>认证状态：</li>
										<li v-for="(item, index) in authStatusList"
											@click="onClick_authStatusItem(index)"
											:class="{'currentStatus':index==searchObj.authStatus}"
											class="pointer"
										>{{item}}
										</li>
									</ul>
									<div class="clearfix"></div>
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
											<div class="clearfix"></div>
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
									<div class="btn pointer search-btn border-btn hb-fill-middle2-bg"
										 @click="onClick_searchBtn">查找
									</div>
									<div class="clearfix"></div>
								</div>
							</div>

							<div class="all-out">
								<div class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right
									" @click="onClick_exportBtn">导出全部
								</div>
							</div>

							<div class="recharge-table admin-calendar-table ">
								<table>
									<thead>
									<tr>
										<th @click="onClick_sortBtn('order_amount')" class="pointer">商户ID
											<common-sort :type="searchObj.sortOrder"
														 :target="'order_amount'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th><span>|</span>创建时间</th>
										<th><span>|</span>企业全称</th>
										<th><span>|</span>运营状态</th>
										<th><span>|</span>用户名</th>
										<th><span>|</span>手机号</th>
										<th><span>|</span>认证状态</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											商家红包金额
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>平台红包金额
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>平台红包发放数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>扫码量
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>绑定二维码数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>导出二维码数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>未导出二维码数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>已购二维码数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>退款二维码数
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer">
											<span>|</span>红包账户余额
											<common-sort :type="searchObj.sortOrder"
														 :target="'create_time'"
														 :currentField="searchObj.sortField"
											></common-sort>
										</th>
										<th><span>|</span>操作</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in userList">
										<td @click="onClick_userItem(item.id)" class="first-td-child">{{item.id}}</td>
										<td>{{item.createTime}}</td>
										<td>{{item.name}}</td>
										<td>{{item.freezeStatusDesc}}</td>
										<td>{{item.logon}}</td>
										<td>{{item.telphone}}</td>
										<td>{{item.authStatusDesc}}</td>
										<td>{{item.shopAmount}}</td>
										<td>{{item.platformAmount}}</td>
										<td>{{item.rpSendNum}}</td>
										<td>{{item.qrcodeScanNum}}</td>
										<td>{{item.qrcodeBindNum}}</td>
										<td>{{item.qrcodeExportNum}}</td>
										<td>{{item.qrcodeUnExportNum}}</td>
										<td>{{item.qrcodeBuyNum}}</td>
										<td>{{item.qrcodeRefundNum}}</td>
										<td>{{item.rpCurrentAccount}}</td>
										<td>
											<span v-text="onConfirm_operation(item.freezeStatus)"
												  @click="onClick_userItem(item.id)"
												  class="pointer blue-content"></span>
											<span v-show="item.authStatus==1"
												  @click="onClick_lookItem(item.id)"
												  class="pointer blue-content">审核</span>
										</td>
									</tr>
									</tbody>
									<tfoot>
									<tr v-show="userList.length>0">
										<td colspan="7"></td>
										<td>{{modelObj.shopAllAmount}}</td>
										<td>{{modelObj.platformAllAmount}}</td>
										<td>{{modelObj.rpSendAllNum}}</td>
										<td>{{modelObj.qrcodeScanAllNum}}</td>
										<td>{{modelObj.qrcodeBindAllNum}}</td>
										<td>{{modelObj.qrcodeExportAllNum}}</td>
										<td>{{modelObj.qrcodeUnExportAllNum}}</td>
										<td>{{modelObj.qrcodeBuyAllNum}}</td>
										<td>{{modelObj.qrcodeRefundAllNum}}</td>
										<td>{{modelObj.rpAllCurrentAccount}}</td>
										<td></td>
									</tr>
									</tfoot>
								</table>
							</div>


							<hw-table :tableData="tableData"
									  :boxWidth="boxWidth"
									  :boxHeight="boxHeight"
									  :headerHeight="headerHeight"
									  :bodyHeight="bodyHeight"
									  :footerHeight="footerHeight"
									  :fixHeader="true"
									  :leftFixedCols="4"
									  :rightFixedCols="1"
									  :rightFooterFixedCols="4"
									  :eachRowHeight="eachRowHeight"
									  :eachColWidth="120"
									  :isShowIdCol="true"
									  @clickBtn="onClick_btn"
									  @clickHead="onClick_headItem"
									  @clickBody="onClick_bodyitem">
								<div class="relative middle bgc-ff">
									<p v-show="g.data.userPool.list.length==0" class="absolute no-record"
									   :style="{left:boxWidth/2+'px'}">
										暂无记录...</p>
								</div>
							</hw-table>


							<common-page :index="searchObj.page" :total="totalPage"
										 @change="onChange_searchItem"
										 v-show="g.data.userPool.list.length>0"></common-page>

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
	import {getUserList, convertList, getFooterList} from './userList';
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
				g: g,
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				},
				searchObj: {},
				totalPage: 0,
				currentType: "",
				inputContent: "",
				typeList: [
					{
						id: 'logon',
						name: '用户名'
					}, {
						id: "telphone",
						name: "手机号"
					}, {
						id: "companyName",
						name: "企业全称"
					}
				],

				freezeStatusList: ['全部', '正常', '冻结'],
				authStatusList: ['全部', '未认证', '已认证'],
				tableData: {},
				boxWidth: window.innerWidth * 0.81,
				eachRowHeight: 60,
				headerHeight: 60,
				footerHeight: 60,
				boxHeight: 550,
				bodyHeight: 420
			}
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
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonPage,
			Calendar,
			CommonFooter,
			CommonPrompt,
			CommonSort

		},
		methods: {
			init(){
				this.initDate();
				this.initSearchData();
				this.initList();
			},
			initList(){
				var obj = {};
				obj.header = g.data.staticTableHeaderPool.list.concat();
				obj.body = convertList(g.data.userPool.list);
				obj.footer = getFooterList();
				this.tableData = obj;
				this.totalPage = g.data.userPool.totalPage;
				g.core.update();
			},
//			initTotal(){
//				var userPool = g.data.userPool;
//				this.modelObj.shopAllAmount = userPool.shopAllAmount;
//				this.modelObj.platformAllAmount = userPool.platformAllAmount;
//				this.modelObj.rpSendAllNum = userPool.rpSendAllNum;
//				this.modelObj.qrcodeScanAllNum = userPool.qrcodeScanAllNum;
//				this.modelObj.qrcodeBindAllNum = userPool.qrcodeBindAllNum;
//				this.modelObj.qrcodeExportAllNum = userPool.qrcodeExportAllNum;
//				this.modelObj.qrcodeUnExportAllNum = userPool.qrcodeUnExportAllNum;
//				this.modelObj.qrcodeBuyAllNum = userPool.qrcodeBuyAllNum;
//				this.modelObj.qrcodeRefundAllNum = userPool.qrcodeRefundAllNum;
//				this.modelObj.rpAllCurrentAccount = userPool.rpAllCurrentAccount;
//			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			initSearchData(){
				this.searchObj = {
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortField': 'create_time',
					'sortOrder': 'desc',
					'endTime': this.date.startTime,
					'startTime': this.date.endTime,
					'freezeStatus': 0,
					'authStatus': 0
				}

			},
			onClick_btn($btnId, $itemId)
			{

			},
			onClick_headItem($item)
			{
				trace('$item', $item);
			},
			onClick_bodyitem($itemId)
			{
				trace('$item', $itemId);
			},
			onClick_searchBtn(){
				this.searchObj.page = 1;
				this.onUpdate_userList()
			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.searchObj.page = $page;
				}
				if ($pageSize != this.searchObj.pageSize)
				{
					this.searchObj.pageSize = $pageSize;
					this.searchObj.page = 1;
				}
				this.onUpdate_userList()
			},
			onUpdate_userList(){
				g.ui.showLoading();
				this.searchObj.startTime = this.date.startTimeStr;
				this.searchObj.endTime = this.date.endTimeStr;
				this.searchObj[this.currentType] = this.inputContent;
				getUserList(this.searchObj).then(() =>
				{
					this.initList();
					g.ui.hideLoading();
				});
				this.searchObj[this.currentType] = "";
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
			onClick_freezeStatusItem($id){
				if ($id == this.searchObj.freezeStatus)
				{
					return
				}
				this.searchObj.freezeStatus = $id;
				this.onUpdate_userList();
			},
			onClick_authStatusItem($id){
				if ($id == this.searchObj.authStatus)
				{
					return
				}
				this.searchObj.authStatus = $id;
				this.onUpdate_userList();
			},
			onClick_dropItem($type){
				this.currentType = $type;
				this.isShow_dropList = false;

			},
			onClick_sortBtn($field){
				if (this.searchObj.sortOrder == "desc")
				{
					this.searchObj.sortOrder = "asc"
				}
				else
				{
					this.searchObj.sortOrder = "desc"
				}
				this.searchObj.page = 1;
				this.searchObj.sortField = $field;
				this.onUpdate_userList();

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

//			onChange_date($timeStamp)
//			{
//				trace('$timeStamp========', $timeStamp);
//			},
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
			onGet_refundSuccess($refundCount){
				this.isShow_refundPop = false;
				this.isShow_refundSuccessPop = true;
				this.unexportCount = this.unexportCount - $refundCount;
				this.freezeCount = Number(this.freezeCount) + Number($refundCount);
				this.onChange_searchItem(1)
			},
			onConfirm_operation($type){
				if ($type == 1)
				{
					return "冻结"
				}
				else
				{
					return "解冻"
				}
			},
			onClick_userItem($id){
				g.url = ("/userdetail?id=" + $id)
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/common.scss";
	@import "../css/myBill.scss";

	.date-input {
		/*background: url("../../assets/images/date.png") no-repeat 160px center;*/
	}

	.currentStatus {
		color: #01aaef;
		border: 1px solid #01aaef;

	}

	.first-td-child {
		color: #01aaef;
		text-decoration: underline

	}

	.blue-content {
		color: #01aaef;
	}

	.middle {
		width: 100%;
		height: 100%;
	}

	.relative {
		position: relative;
	}

	.bgc-ff {
		background-color: #ffffff;
	}

	.no-record {
		width: 200px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		top: 50%;
		margin-left: -100px;
		margin-top: -25px;
	}
</style>







