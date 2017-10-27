<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav :nav="'activity'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav>
						<input type="text">
					</common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<p class="g-title">
								活动列表
							</p>
							<div class="bar-box activity-bar-box">
								<div class="bar-top">
									<ul>
										<li>活动状态:</li>
										<li class="type-item pointer " @click="onClick_changeType(0)"
											:class="{'acticity-process':isCurrentType(0)}">
											<span>全部活动</span>
										</li>
										<li class="type-item pointer" v-for="item in statusList"
											@click="onClick_changeType(item.stateCode)"
											:class="{'acticity-process':isCurrentType(item.stateCode)}">
											{{item.stateDesc}}
										</li>
									</ul>
								</div>
								<div class="bar-bottom">
									<div class="date-margin">
										<div class="date-box">
											<span class="creat-time">开始时间：从</span>
											<div class="date-from">
												<input type="text" class="startTime date-input pointer"
													   v-model="dataObj.activitySQueryStartTime"
													   readonly="true"
													   @click.stop="onClick_showCalendar('isShow_SQueryStartTime')">
												<img class="date-del" :src="g.config.path.images+'/close.png'"
													  @click.stop="onClick_resetTime('activitySQueryStartTime')">
												<hw-date type="date" skin="simple"
														 @change="onClick_chooseSQueryStartTime"
														 v-model="isShow_dataObj.isShow_SQueryStartTime"></hw-date>
											</div>
										</div>
										<span class="goto">至</span>
										<div class="date-box">
											<div class="date-from">
												<input type="text" class="endTime date-input pointer"
													   v-model="dataObj.activitySQueryEndTime"
													   readonly="true"
													   @click.stop="onClick_showCalendar('isShow_SQueryEndTime')">
												<img class="date-del" :src="g.config.path.images+'/close.png'"
													  @click.stop="onClick_resetTime('activitySQueryEndTime')">
												<hw-date type="date" skin="simple" @change="onClick_chooseSQueryEndTime"
														 v-model="isShow_dataObj.isShow_SQueryEndTime"></hw-date>
											</div>
										</div>
									</div>
									<div class="date-margin">
										<div class="date-box">
											<span class="creat-time">结束时间：从</span>
											<div class="date-from">
												<input type="text" class="startTime date-input pointer"
													   v-model="dataObj.activityEQueryStartTime"
													   readonly="true"
													   @click.stop="onClick_showCalendar('isShow_EQueryStartTime')">
												<img class="date-del" :src="g.config.path.images+'/close.png'"
													  @click.stop="onClick_resetTime('activityEQueryStartTime')">
												<hw-date type="date" skin="simple"
														 @change="onClick_chooseEQueryStartTime"
														 v-model="isShow_dataObj.isShow_EQueryStartTime"></hw-date>
											</div>
										</div>
										<span class="goto">至</span>
										<div class="date-box">
											<div class="date-from">
												<input type="text" class="endTime date-input pointer"
													   v-model="dataObj.activityEQueryEndTime"
													   readonly="true"
													   @click.stop="onClick_showCalendar('isShow_EQueryEndTime')">
												<img class="date-del" :src="g.config.path.images+'/close.png'"
													  @click.stop="onClick_resetTime('activityEQueryEndTime')">
												<hw-date type="date" skin="simple" @change="onClick_chooseEQueryEndTime"
														 v-model="isShow_dataObj.isShow_EQueryEndTime"></hw-date>
											</div>
										</div>
									</div>
									<div class="drop-box pointer" @click.stop="onClick_dropListBtn">
										<div>
											{{currentSearchType}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"></span>

										</div>
										<ul class="droplist" v-show="isShow_dropList">
											<li v-for="item in typeList" class="pointer"
												@click.stop="onClick_dropItem(item.id)">{{item.name}}

											</li>
										</ul>
									</div>
									<input type="text" v-model="inputContent" class="float-left search-input">
								<span class="btn pointer search-btn border-btn hb-fill-middle2-bg"
									  @click="onClick_searchBtn">查找</span>
									<div class="clearfix"></div>
								</div>
							</div>
							<div class="all-out">
								<div class=" pointer all-out-btn bg-btn hb-fill-middle2-rev float-right
									" @click="onClick_exportAllBtn">导出全部
								</div>
							</div>
							<hw-table :tableData="tableData"
									  :boxWidth="boxWidth"
									  :boxHeight="boxHeight"
									  :headerHeight="headerHeight"
									  :bodyHeight="bodyHeight"
									  :footerHeight="footerHeight"
									  :fixHeader="true"
									  :eachRowHeight="eachRowHeight"
									  :eachColWidth="boxWidth/11"
									  :isShowTotal="true"
									  @clickHead="onClick_headItem"
									  @clickBody="onClick_bodyItem"
									  :lightColsList="[1]">
								<div class="relative middle bgc-ff" :style="{minHeight:bodyHeight+'px'}">

									<p v-show="g.data.activityPool.list.length==0" class="absolute no-record"
									   :style="{left:boxWidth/2+'px'}">
										暂无记录...</p>
								</div>
							</hw-table>

							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="activityList.length>0"></common-page>
							<!--<common-prompt v-show="activityList.length==0"></common-prompt>-->
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
	import {getFooterList, convertList} from './userList';
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
				g: g,
				isLoad: false,
				isShow_dropList: false,
				isShow_dataObj: {
					isShow_SQueryStartTime: false,
					isShow_SQueryEndTime: false,
					isShow_EQueryStartTime: false,
					isShow_EQueryEndTime: false
				},
				totalPage: 0,
				statusList: [],
				activityId: 0,
				activityList: [],
				// activitySQueryBeginTime: '',
				// activitySQueryEndTime: '',
				// activityEQueryStartTime: '',
				// activityEQueryEndTime: '',
				dataObj: {},
				currentType: "activityName",
				inputContent: "",
				typeList: [
					{
						id: 'activityName',
						name: '活动名称'
					}, {
						id: "brandName",
						name: "品牌名称"
					}, {
						id: "companyFullName",
						name: "企业名称"
					}

				],
				activityStatus: [0],
				resultTotalObj: {
					totalQrCodeNum: 0,
					totalScanCount: 0,
					RpAmount: 0,
					platformAmount: 0
				},
				tableData: {},
				boxWidth: window.innerWidth * 0.81,
				eachRowHeight: 60,
				headerHeight: 60,
				footerHeight: 60,
				boxHeight: 610,
				bodyHeight: 420

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
				this.initSearchData();
				this.initData();
			},
			initData(){

				var info = g.data.activityPool;
				this.totalPage = info.totalPage;
				this.activityList = info.list;
				var obj = {};
				obj.header = g.data.staticTableHeaderPool.list.concat();
				obj.body = convertList(g.data.activityPool.list, g.data.staticTableHeaderPool.list);
				obj.footer = getFooterList(4, g.data.staticTableHeaderPool.list, g.data.activityPool);
				this.tableData = obj;
				this.statusList = g.data.activityStatusPool.list;
			},
			initDate(){
				this.dataObj.activitySQueryStartTime = g.timeTool.getDate(this.dataObj.activitySQueryStartTime, true);
				this.dataObj.activitySQueryEndTime = this.dataObj.activitySQueryStartTime;
				this.dataObj.activityEQueryStartTime = this.dataObj.activitySQueryStartTime;
				this.dataObj.activityEQueryEndTime = this.dataObj.activitySQueryStartTime;
			},
			initSearchData(){
				this.dataObj = {
					page: 1,
					pageSize: g.param.pageSizeList[0],
					activityStatus: "",
					sortField: "create_time",
					sortOrder: "desc",
					activitySQueryStartTime: '',
					activitySQueryEndTime: '',
					activityEQueryStartTime: '',
					activityEQueryEndTime: ''
				}

			},
			onClick_headItem($item)
			{
				this.onClick_sortBtn($item);
			},
			onClick_bodyItem($itemId)
			{
				this.onClick_detailBtn($itemId)
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				if ($pageSize != this.dataObj.pageSize)
				{
					this.dataObj.pageSize = $pageSize;
					this.dataObj.page = 1
				}

				this.onUpdate_activityList(true)
			},
			onUpdate_activityList($isByPage){
				g.ui.showLoading();
				this.dataObj.activityStatus = this.activityStatus.join(",");
				this.dataObj.companyFullName = "";
				this.dataObj.activityName = "";
				this.dataObj.applyUserLogon = "";
				this.dataObj[this.currentType] = this.inputContent;
				var url = "";
				if($isByPage){
					url = "activity/queryActivitiesStatisticList"
				}else{
					url = "activity/queryActivitiesStatisticOverview"
				}
				g.net.call(url, this.dataObj).then(($data) =>
				{
					if($isByPage){
						g.data.activityPool.removeList();
					}else{
						g.data.activityPool.removeAll();
					}

					g.data.activityPool.update($data.resultPageList);
					g.ui.hideLoading();
					this.initData();
					this.dataObj[this.currentType] = "";
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
				var activityStatusList = this.activityStatus;
				if ($typeId == 0)
				{
					this.activityStatus = [0]
				}
				else
				{
					if (activityStatusList.indexOf(0) > -1)
					{
						this.activityStatus = []

					}
					var index = activityStatusList.indexOf($typeId);
					if (index > -1)
					{
						this.activityStatus.splice(index, 1)
					}
					else
					{
						this.activityStatus.push($typeId)
					}
				}

				this.onUpdate_activityList()
			},
			onClick_searchBtn(){
				this.dataObj.page = 1;
				this.onUpdate_activityList()
			},
			onUpdate_allData(){
				g.net.call("activity/getActivityOverview", this.dataObj).then(($data) =>
				{

					g.data.activityPool.removeAll();
					g.data.activityPool.update($data);
					this.init();

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_itemDetail($id){
				g.url = {
					path: "/activitydetail",
					query: {"activityId": $id}
				}
			},
			onClick_sortBtn($item){
				if ($item.sortBy)
				{
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
					this.onUpdate_activityList(true);


				}
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
			onClick_detailBtn($id){

				g.url = ("/activitydetail?id=" + $id)

			},
			isCurrentType($type){
				if (this.activityStatus.indexOf($type) > -1)
				{
					return true
				}
				return false
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
			onClick_showCalendar($str){
				trace(this.isShow_dataObj)
				for (var key in this.isShow_dataObj)
				{
					if (key == $str)
					{
						if (this.isShow_dataObj[key])
						{
							this.isShow_dataObj[key] = false;
						}
						else
						{
							this.isShow_dataObj[key] = true;
						}
					}
					else
					{
						this.isShow_dataObj[key] = false;
					}
				}
				trace(this.isShow_dataObj);
			},
			onClick_chooseSQueryStartTime($timeStamp){
				this.dataObj.activitySQueryStartTime = g.timeTool.getDate($timeStamp, true);
				;
				//this.activitySQueryBeginTime = g.timeTool.getDate($timeStamp, true);
				if (this.dataObj.activitySQueryStartTime > this.dataObj.activitySQueryEndTime)
				{
					this.onClick_chooseSQueryEndTime($timeStamp);
				}
				this.isShow_dataObj.isShow_SQueryStartTime = false;

			},

			onClick_chooseSQueryEndTime($timeStamp){
				this.dataObj.activitySQueryEndTime = g.timeTool.getDate($timeStamp, true);
				;
				// this.activitySQueryEndTime = g.timeTool.getDate($timeStamp, true);
				if (this.dataObj.activitySQueryEndTime < this.dataObj.activitySQueryStartTime)
				{
					this.onClick_chooseSQueryStartTime($timeStamp);
				}
				this.isShow_dataObj.isShow_SQueryEndTime = false;
			},
			onClick_chooseEQueryStartTime($timeStamp){
				this.dataObj.activityEQueryStartTime = g.timeTool.getDate($timeStamp, true);
				//this.activityEQueryStartTime = g.timeTool.getDate($timeStamp, true);
				if (this.dataObj.activityEQueryStartTime > this.dataObj.activityEQueryEndTime)
				{
					this.onClick_chooseEQueryEndTime($timeStamp);
				}
				this.isShow_dataObj.isShow_EQueryStartTime = false;
			},
			onClick_chooseEQueryEndTime($timeStamp){
				this.dataObj.activityEQueryEndTime = g.timeTool.getDate($timeStamp, true);
				//this.activityEQueryEndTime = g.timeTool.getDate($timeStamp, true);
				if (this.dataObj.activityEQueryEndTime < this.dataObj.activityEQueryStartTime)
				{
					this.onClick_chooseEQueryStartTime($timeStamp);
				}
				this.isShow_dataObj.isShow_EQueryEndTime = false;
			},
			onClick_resetTime($resetType){
				this.dataObj[$resetType] = "";
				this[$resetType] = "";

			},
			onClick_exportAllBtn(){
				window.open(g.webParam.url.server
						+ "/export/exportActivityStatisticList?page=0&pageSize=0&activityStatus="
						+ this.activityStatus.join(",")
						+ "&activitySQueryStartTime=" + this.dataObj.activitySQueryStartTime
						+ "&activitySQueryEndTime=" + this.dataObj.activitySQueryEndTime
						+ "&activityEQueryStartTime=" + this.dataObj.activityEQueryStartTime
						+ "&activityEQueryEndTime=" + this.dataObj.activityEQueryEndTime
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&" + this.currentType + "=" + this.inputContent
				)
				trace(g.webParam.url.server
						+ "/export/exportActivityStatisticList?page=0&pageSize=0&activityStatus="
						+ this.activityStatus.join(",")
						+ "&activitySQueryStartTime=" + this.dataObj.activitySQueryStartTime
						+ "&activitySQueryEndTime=" + this.dataObj.activitySQueryEndTime
						+ "&activityEQueryStartTime=" + this.dataObj.activityEQueryStartTime
						+ "&activityEQueryEndTime=" + this.dataObj.activityEQueryEndTime
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&" + this.currentType + "=" + this.inputContent)

			}
		}
	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/myActivity";

	.my-activity .me-checkbox-core {
		margin-left: 10px;
		margin-right: 10px;
	}

	.first-td-child:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.blue-content {
		color: #01aaef;
	}
</style>