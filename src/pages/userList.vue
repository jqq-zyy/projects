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

							<hw-table :tableData="tableData"
									  :boxWidth="boxWidth"
									  :boxHeight="boxHeight"
									  :headerHeight="headerHeight"
									  :bodyHeight="bodyHeight"
									  :footerHeight="footerHeight"
									  :fixHeader="true"
									  :leftFixedCols="4"
									  :rightFixedCols="1"
									  :eachRowHeight="eachRowHeight"
									  :eachColWidth="120"
									  :isShowIdCol="true"
									  :isShowTotal="true"
									  @clickBtn="onClick_btn"
									  @clickHead="onClick_headItem"
									  @clickBody="onClick_bodyitem"
									  :lightColsList="[0]">

								<div class="relative middle bgc-ff" :style="{minHeight:bodyHeight+'px'}">
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
				currentType: "logon",

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
				boxHeight: 610,
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
				obj.body = convertList(g.data.userPool.list, g.data.staticTableHeaderPool.list, "userList");
				obj.footer = getFooterList(4, g.data.staticTableHeaderPool.list, g.data.userPool);
				this.tableData = obj;
				this.totalPage = g.data.userPool.totalPage;
				g.core.update();
			},
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
				this.onClick_userItem($itemId);
			},
			onClick_headItem($item)
			{
				this.onClick_sortBtn($item)
			},
			onClick_bodyitem($itemId)
			{
				this.onClick_userItem($itemId);
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
				this.onUpdate_userList(true)
			},
			onUpdate_userList($isByPage){
				g.ui.showLoading();
				this.searchObj.startTime = this.date.startTimeStr;
				this.searchObj.endTime = this.date.endTimeStr;
				this.searchObj[this.currentType] = this.inputContent;
				var url ;
				if($isByPage){
					url = "user/queryShopStatisticListByPage";
				}else{
					url = "user/queryShopStatisticList";
				}
				g.net.call(url, this.searchObj).then(($data) =>
				{
					if($isByPage){
						g.data.userPool.removeList();
					}else{
						g.data.userPool.removeAll();
					}
					g.data.userPool.update($data);
					this.initList();
					this.searchObj[this.currentType] = "";
					g.ui.hideLoading();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
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
			onClick_sortBtn($item){
				if ($item.sortBy)
				{
					if ($item.sortBy == "desc")
					{
						this.searchObj.sortOrder = "asc"
					}
					else
					{
						this.searchObj.sortOrder = "desc"
					}
					this.searchObj.page = 1;
					this.searchObj.sortField = $item.params;
					this.onUpdate_userList(true);

				}
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
			onGet_refundSuccess($refundCount){
				this.isShow_refundPop = false;
				this.isShow_refundSuccessPop = true;
				this.unexportCount = this.unexportCount - $refundCount;
				this.freezeCount = Number(this.freezeCount) + Number($refundCount);
				this.onChange_searchItem(1)
			},
//			onConfirm_operation($type){
//				if ($type == 1)
//				{
//					return "冻结"
//				}
//				else
//				{
//					return "解冻"
//				}
//			},
			onClick_userItem($id){
				g.url = ("/userdetail?id=" + $id)
			},
			onClick_exportBtn(){
			},
//			onClick_lookItem($id){
//				g.url = ("/userdetail?id=" + $id)
//			},

//			onClick_userItem($id){
//				g.url = ("/userdetail?id=" + $id)
//
//			}

		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
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







