<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'qrcode'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<!--<p class="note"><img :src="g.config.path.images+'/note.png'" alt="">备注：注册成功赠送100个，购买需要先认证账户 </p>-->
							<div class="bar-top g-title">
								<h3 class="page-name">我的二维码</h3>
								<span class="buy-code pointer  border-btn"
									  @click.stop="onClick_buyBtn">{{g.lang("购买二维码")}}</span>
							</div>
							<div class="right-bar">
								<div class="bar-top">
									<div class="out">
										<span class="m-number"> <i>{{unexportCount}}</i>个</span>
										<span>未导出</span>
										<span class="out-btn pointer border-btn" @click.stop="onClick_exportBtn"
											  :class="{'disabled':unexportCount==0}">{{g.lang("导出")}}</span>
									</div>
									<div class="concat">
										<div class="detail-out">
											<span class="g-number"><i>{{exportedCount}}</i>个</span>
											<span>累计导出 </span>
										</div>
										<div class="detail-out">
											<span class="g-number"><i>{{exportedCount}}</i>个</span>
											<span>已关联</span>
										</div>
										<div class="detail-out">
											<span class="g-number"><i>{{exportedCount}}</i>个</span>
											<span>未关联 </span>
										</div>
										<div class="detail-out">
										<span class="out-btn pointer border-btn" @click.stop="onClick_contactBtn"
											  :class="{'disabled':exportedCount==0}">关联活动</span>
										</div>
									</div>
								</div>
							</div>
							<div class="admin-calendar-table">
								<table>
									<thead>
									<tr>
										<th>二维码批次号</th>
										<th>适用产品</th>
										<th>{{g.lang("包含商品二维码数量")}}</th>
										<th @click="onClick_sortBtn('export_time')" class="pointer">
											<div>
												{{g.lang("导出时间")}}
												<common-sort
														:target="'export_time'"
														:currentField="sortField"
														:type="sortType"
												></common-sort>
											</div>
										</th>
										<th>{{g.lang("操作")}}</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="item in qrcodeList">
										<td>{{item.batchNo}}</td>
										<td class="second-td">{{item.batchUse}}</td>
										<td>{{item.QRcodeTotalCount}}</td>
										<td>{{item.exportTime}}</td>
										<td><span
												@click.stop="onClick_itemDetail(item.id)"
												class="out-align border-btn pointer">{{g.lang("重新导出")}}</span>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<common-page :index="indexPage" :total="totalPage"
										 @change="onChange_searchItem" v-show="totalPage>1"></common-page>
							<common-prompt v-show="qrcodeList.length==0"></common-prompt>

						</div>
						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isBuyCode">
					<buy-code-pop :configData="configData" @click="onClick_closeBtn"
								  @change="initData" ref="buyCodeBox"></buy-code-pop>
					</buy-code-pop>
				</div>
			</transition>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShowExport">
					<export-code-pop @close="onClick_closeBtn" @change="initData"
									 @initList="onUpdate_orderList" ref="exportBox"></export-code-pop>
				</div>
			</transition>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShowContact">
					<contact-pop :activityNameList="activityNameList"
								 :relateBatchList="relateBatchList"
								 @click="onClick_closeBtn" @change="initData"
								 ref="contactBox"></contact-pop>
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
	import BuyCodePop from '../components/QRcodePop/buyCodePop.vue';
	import ExportCodePop from '../components/QRcodePop/exportCodePop.vue';
	import ContactPop from '../components/QRcodePop/contactPop.vue';
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
				g: g,
				isBuyCode: false,
				isShowExport: false,
				isShowContact: false,
				exportedCount: 0,
				unexportCount: 0,
				qrcodeList: [],
				activityNameList: [],
				relateBatchList: [],
				configData: {},
				indexPage: 1,
				totalPage: 1,
				pageSize: g.param.pageSizeList[0],
				code: "",
				sortType: 'desc',
				sortField: 'export_time'
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			BuyCodePop,
			ExportCodePop,
			ContactPop,
			CommonPage,
			CommonFooter,
			CommonPrompt,
			CommonSort
		},
		methods: {
			init(){
				this.removeEvent();
				this.initEvent();
				this.initData();
				this.initConfig();
			},
			initData(){
				this.unexportCount = g.data.qrcodePool.unexportCount;
				this.exportedCount = g.data.qrcodePool.exportedCount;
				this.qrcodeList = g.data.qrcodePool.list;
				this.totalPage = g.data.qrcodePool.totalPage;
			},
			initConfig(){
				this.configData = {
					buyTypeList: [],
					promptList: [],
					assetAmount: 0
				}
			},
			initEvent(){
				document.addEventListener('click', this.onClick_document)
			},
			removeEvent(){
				document.removeEventListener('click', this.onClick_document)
			},
			onClick_document(e){
				if (this.$refs.buyCodeBox && !this.$refs.buyCodeBox.$el.contains(e.target))
				{
					this.isBuyCode = false;
				}
				if (this.$refs.contactBox && !this.$refs.contactBox.$el.contains(e.target))
				{
					this.isShowContact = false;
				}
				if (this.$refs.exportBox && !this.$refs.exportBox.$el.contains(e.target))
				{
					this.isShowExport = false;
				}
			},
			onClick_buyBtn(){
				g.net.call("config/payWayConfig").then(($data) =>
				{
					this.configData.buyTypeList = $data.payWayList;
					this.configData.promptList = $data.stepPriceList;
					this.configData.assetAmount = $data.assetCurrentAmount;
					this.isBuyCode = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_exportBtn(){
				if (this.unexportCount == 0)
				{
					return
				}
				this.isShowExport = true;
			},
			onClick_closeBtn(){
				this.isBuyCode = false;
				this.isShowExport = false;
				this.isShowContact = false;
			},
			onClick_contactBtn(){
				if (this.exportedCount == 0)
				{
					return
				}
				g.net.calls("activity/getActivityNameList",
						"qrcode/relateBatchList").then(($list) =>
				{
					this.activityNameList = $list[0].data;
					g.data.batchPool.removeAll();
					g.data.batchPool.update($list[1].data);
					this.relateBatchList = g.data.batchPool.list;
					this.isShowContact = true;

				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onChange_searchItem($page, $pageSize){
				if ($page)
				{
					this.indexPage = $page
				}
				if ($pageSize)
				{
					this.pageSize = $pageSize
				}
				this.onUpdate_orderList()
			},
			onUpdate_orderList($page, $sortType){
				g.ui.showLoading();
				if ($page)
				{
					this.indexPage = $page
				}
				if ($sortType)
				{
					this.sortType = $sortType
				}
				g.net.call("qrcode/exportRecordPageList", {
					'page': this.indexPage,
					'pageSize': this.pageSize,
					'sortOrder': this.sortType
				}).then(($obj) =>
				{
					var obj = {};
					obj.resultPagerList = $obj;
					g.data.qrcodePool.removeList();
					g.data.qrcodePool.update(obj);
					this.qrcodeList = g.data.qrcodePool.list;
					g.ui.hideLoading();
				}, (err) =>
				{
					g.func.dealErr(err);

				});
			},
			onClick_itemDetail($id){
				var url = g.data.qrcodePool.getDataById($id).resourceUrl;
				window.open(url);
			},
			onClick_sortBtn($field){
				if (this.sortType == "desc")
				{
					this.sortType = "asc"
				}
				else
				{
					this.sortType = "desc"
				}
				this.sortField = $field;
				this.indexPage = 1;
				this.onUpdate_orderList();
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/code.scss";

	.out .disabled {
		background: #999999;
	}

	.out .disabled:hover {
		background: #999999;
	}
</style>