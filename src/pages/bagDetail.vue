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
								红包账户详情
							</p>
							<div class="bar-box">
								<div class="bar-top">
									<ul>
										<li>状态：</li>
										<li class="type-item pointer " @click="onClick_changeType(0)"
											:class="{'acticity-process':isCurrentType(0)}">
											<span>全部</span>
										</li>
										<li class="type-item pointer " @click="onClick_changeType(3)"
											:class="{'acticity-process':isCurrentType(3)}">
											<span>成功</span>
										</li>
										<li class="type-item pointer " @click="onClick_changeType(-1)"
											:class="{'acticity-process':isCurrentType(-1)}">
											<span>失败</span>
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
									  :eachColWidth="boxWidth/12"
									  :isShowIdCol="true"
									  :isShowTotal="true"
									  @clickHead="onClick_headItem"
							>
								<div class="relative middle bgc-ff" :style="{minHeight:bodyHeight+'px'}">
									<p v-show="g.data.bagDetailPool.list.length==0" class="absolute no-record"
									   :style="{left:boxWidth/2+'px'}">
										暂无记录...</p>
								</div>
							</hw-table>
							<!--<div class="admin-calendar-table">-->
							<!--<table>-->
							<!--<thead>-->
							<!--<tr>-->
							<!--<th class="">流水ID</th>-->
							<!--<th class="" @click="onClick_sortBtn('received_amount')"><span>|</span>流水类型-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'received_amount'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th @click="onClick_sortBtn('received_amount')" class=" "><span>|</span>商家红包金额-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'received_amount'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th @click="onClick_sortBtn('activity_start_time')" class=" ">-->
							<!--<span>|</span> 平台红包金额-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'activity_start_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th class="pointer m-width">-->
							<!--<span>|</span>状态-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'activity_end_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th class="pointer m-width">-->
							<!--<span>|</span>用户-->

							<!--</th>-->
							<!--<th @click="onClick_sortBtn('create_time')">-->
							<!--<span>|</span>-->
							<!--扫码设备-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->

							<!--</th>-->
							<!--<th @click="onClick_sortBtn('create_time')">-->
							<!--<span>|</span>地区-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->


							<!--</th>-->
							<!--<th @click="onClick_sortBtn('create_time')" class="pointer m-width">-->
							<!--<span>|</span>扫码时间-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->

							<!--<th @click="onClick_sortBtn('create_time')" class="pointer m-width">-->
							<!--<span>|</span>活动名称-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th @click="onClick_sortBtn('create_time')" class="pointer m-width">-->
							<!--<span>|</span>品牌名称-->
							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--<th @click="onClick_sortBtn('create_time')" class="pointer m-width">-->
							<!--<span>|</span>企业全称-->

							<!--<common-sort :type="dataObj.sortOrder"-->
							<!--:target="'create_time'"-->
							<!--:currentField="dataObj.sortField"-->
							<!--&gt;</common-sort>-->
							<!--</th>-->
							<!--</tr>-->
							<!--</thead>-->
							<!--<tbody>-->
							<!--<tr v-for="item in bagDetailList">-->
							<!--<td>{{item.id}}</td>-->
							<!--<td></td>-->
							<!--<td>{{item.shopAmount}}</td>-->
							<!--<td>{{item.platformAmount}}</td>-->
							<!--<td>{{item.statusDesc}}</td>-->
							<!--<td>{{item.alipayAccount}}</td>-->
							<!--<td>{{item.mobileType}}</td>-->
							<!--<td>{{item.cityName}}</td>-->
							<!--<td>{{item.createTime}}</td>-->
							<!--<td>{{item.activityName}}</td>-->
							<!--<td>{{item.rpBrand}}</td>-->
							<!--<td>{{item.companyFullName}}</td>-->
							<!--</tr>-->
							<!--</tbody>-->
							<!--<tfoot>-->
							<!--<tr>-->
							<!--<td colspan="2"></td>-->
							<!--<td>{{shopRpAmount}}</td>-->
							<!--<td>{{platformRpAmount}}</td>-->
							<!--<td colspan="8"></td>-->
							<!--</tr>-->
							<!--</tfoot>-->
							<!--</table>-->
							<!--</div>-->
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="bagDetailList.length>0"></common-page>
							<!--<common-prompt v-show="bagDetailList.length==0"></common-prompt>-->


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
				g: g,
				totalPage: 1,
				statusList: ["全部", "成功", "失败"],
				bagDetailList: [],
				currentType: "receiveId",
				inputContent: "",
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
						id: 'receiveId',
						name: '流水ID'
					}, {
						id: "brandName",
						name: '品牌名称'
					}, {
						id: "activityName",
						name: '活动名称'
					}, {
						id: "companyFullName",
						name: '企业全称'
					}
				],
				resultTotalObj: {
					shopRpAmount: 0,
					platformRpAmount: 0
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
				this.initDate();
				this.initData();
				this.initSearchData();

			},
			initData(){
				var info = g.data.bagDetailPool;
				this.totalPage = info.totalPage;
				var obj = {};
				obj.header = g.data.staticTableHeaderPool.list.concat();
				obj.body = convertList(g.data.bagDetailPool.list, g.data.staticTableHeaderPool.list);
				obj.footer = getFooterList(4, g.data.staticTableHeaderPool.list, g.data.bagDetailPool);
				this.tableData = obj;
				trace("this.tableDat====", this.tableData);
				this.bagDetailList = info.list;
			},
			initSearchData(){
				this.dataObj = {
					status: "",
					startTime: "",
					endTime: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					sortField: "create_time",
					sortOrder: "desc"
				}
			},
			initDate(){
				this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
				this.date.endTime = this.date.startTime;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},

			onClick_headItem($item)
			{
				this.onClick_sortBtn($item);
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
				this.dataObj.startTime = this.date.startTimeStr;
				this.dataObj.endTime = this.date.endTimeStr;
				if (this.currentType)
				{
					this.dataObj[this.currentType] = this.inputContent;
				}
				g.net.call("order/queryRpReceiveList", this.dataObj).then(($data) =>
				{
					g.data.bagDetailPool.removeAll();
					g.data.bagDetailPool.update($data);
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
				this.dataObj.status = $typeId;
				this.onUpdate_qrcodeList()
			},
			onClick_searchBtn(){
				this.dataObj.page = 1
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
			isCurrentType($type){
				if (this.dataObj.status == $type)
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

			onClick_qrcodeItem($type){

			},
			onClick_exportAllBtn(){
				window.open(g.webParam.url.server
						+ "/export/exportRpReceiveList?page=0&pageSize=0&startTime="
						+ this.date.startTimeStr
						+ "&endTime=" + this.date.endTimeStr
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&status=" + this.dataObj.status
						+ "&" + this.currentType + "=" + this.inputContent
				)
				trace(g.webParam.url.server
						+ "/export/exportRpReceiveList?page=0&pageSize=0&startTime="
						+ this.date.startTimeStr
						+ "&endTime=" + this.date.endTimeStr
						+ "&sortField=" + this.dataObj.sortField
						+ "&sortOrder=" + this.dataObj.sortOrder
						+ "&status=" + this.dataObj.status
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
</style>