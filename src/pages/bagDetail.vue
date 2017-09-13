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
							<div class="right-bar">
								<p class="g-title">
									红包账户详情
								</p>
								<div class="activity-bar-top">
									<div class="type-item pointer " @click="onClick_changeType(0)"
										 :class="{'acticity-process':isCurrentType(-1)}">
										<span>全部</span>
									</div>
									<div class="type-item pointer" v-for="(item,index) in statusList"
										 @click="onClick_changeType(index)"
										 :class="{'acticity-process':isCurrentType(index)}">
										{{item}}
									</div>
								</div>
							</div>

							<div class="drop-box pointer">
								<div @click.stop="onClick_dropListBtn">
									{{typeList[dataObj.inOutType]}}
											<span :class="['pointer','drop-icon',isShow_dropList?'rotate':'']"
												  @click.stop="onClick_dropListBtn"></span>
								</div>
								<ul class="droplist" v-show="isShow_dropList">
									<li v-for="(item,index) in typeList" class="pointer"
										@click="onClick_dropItem(index)">{{item}}
									</li>
								</ul>
							</div>
							<input type="text" v-model="dataObj.inOutContent">
							<div class="button pointer search-btn bg-btn" @click="onClick_searchBtn">查询</div>
							<div class="admin-calendar-table">
								<div @click="onClick_exportBtn">导出全部</div>
								<table>
									<thead>
									<tr>
										<th class="first-col">流水ID</th>
										<th class="s-col" @click="onClick_sortBtn('received_amount')">流水类型
											<common-sort :type="dataObj.sortOrder"
														 :target="'received_amount'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('received_amount')" class="pointer m-width">商家红包金额
											<common-sort :type="dataObj.sortOrder"
														 :target="'received_amount'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</th>
										<th @click="onClick_sortBtn('activity_start_time')" class="pointer m-width">

											<div>
												平台红包金额

												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_start_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th class="pointer m-width">
											<div>
												状态
												<common-sort :type="dataObj.sortOrder"
															 :target="'activity_end_time'"
															 :currentField="dataObj.sortField"
												></common-sort>
											</div>
										</th>
										<th class="pointer m-width">
											<div>
												用户
											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												扫码设备
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												地区
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												扫码时间
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												活动名称
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												品牌名称
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
										<th @click="onClick_sortBtn('create_time')" class="pointer m-width">
											<div>
												企业全称
												<common-sort :type="dataObj.sortOrder"
															 :target="'create_time'"
															 :currentField="dataObj.sortField"
												></common-sort>

											</div>
										</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in bagDetailList">
										<td>{{item.id}}</td>
										<td></td>
										<td>{{item.shopAmount}}</td>
										<td>{{item.platformAmount}}</td>
										<td>{{item.statusDesc}}</td>
										<td>{{item.alipayAccount}}</td>
										<td>{{item.mobileType}}</td>
										<td>{{item.cityName}}</td>
										<td>{{item.createTime}}</td>
										<td>{{item.activityName}}</td>
										<td>{{item.rpBrand}}</td>
										<td>{{item.companyFullName}}</td>
									</tr>
									</tbody>
									<tfoot>
									<tr>
										<td colspan="2"></td>
										<td>{{shopRpAmount}}</td>
										<td>{{platformRpAmount}}</td>
										<td colspan="8"></td>
									</tr>
									</tfoot>
								</table>
							</div>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="totalPage>1"></common-page>
							<common-prompt v-show="bagDetailList.length==0"></common-prompt>
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
				g: g,
				totalPage: 1,
				statusList: ["成功", "失败"],
				bagDetailList: [],
				dataObj: {
					ruleType: "",
					activityName: "",
					page: 1,
					pageSize: g.param.pageSizeList[0],
					activityStatusList: [-1],
					sortField: "create_time",
					sortOrder: "desc",
					inOutType: 0,
					inOutContent: ""
				},
				typeList: ['流水ID', '品牌名称', '活动名称', '企业全称'],
				platformRpAmount: 0,
				shopRpAmount: 0

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
				var info = g.data.bagDetailPool;
				this.totalPage = info.totalPage;
				this.bagDetailList = info.list;
				this.shopRpAmount = info.shopRpAmount;
				this.platformRpAmount = info.platformRpAmount;
			},

			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_bagList()
			},
			onUpdate_bagList(){
				g.ui.showLoading();
				g.net.call("/activity/queryActivityStatisticByPage", this.dataObj).then(($data) =>
				{
					g.data.activityPool.removeAll();
					var obj = {};
					obj.resultPageList = $data;
					g.data.activityPool.update(obj);
					this.activityList = g.data.activityPool.list;
					g.ui.hideLoading();
					this.initData();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_dropItem($type){
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
				this.dataObj.page = 1;
				var activityStatusList = this.dataObj.activityStatusList;
				if ($typeId == -1)
				{
					this.dataObj.activityStatusList = [-1]
				}
				else
				{
					if (activityStatusList.indexOf(-1) > -1)
					{
						this.dataObj.activityStatusList = []

					}
					var index = activityStatusList.indexOf($typeId);
					if (index > -1)
					{
						this.dataObj.activityStatusList.splice(index, 1)
					}
					else
					{
						this.dataObj.activityStatusList.push($typeId)
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
				if (this.dataObj.activityStatusList.indexOf($type) > -1)
				{
					return true
				}
				return false
			},
			onClick_exportBtn(){

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
</style>