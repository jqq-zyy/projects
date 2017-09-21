<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap my-activity">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav @click="onClick_msgContent"></common-top-nav>
					<div class="admin-data-items">
						<p class="right-header">
							系统通知
						</p>
						<div class="right-body">
							<div class="activity-bar">
								<div class="activity-bar-top">
								<span class="type-item pointer " @click="onClick_changeType('')"
									  :class="{'acticity-process':dataObj.status===''}">全部({{countData.totalCount}})</span>
									<span class="type-item pointer " @click="onClick_changeType(1)"
										  :class="{'acticity-process':dataObj.status===1}">已读({{countData.readCount}})</span>
									<span class="type-item pointer " @click="onClick_changeType(0)"
										  :class="{'acticity-process':dataObj.status===0}">未读({{countData.unReadCount}})</span>

								</div>
								<div class="activity-bar-bottom">

									<div class="search-box">
										<input type="text" placeholder="搜索内容" v-model="dataObj.messageContent"
											   @keyup.enter="onClick_searchBtn">
										<span class="button pointer bg-btn"
											  @click="onClick_searchBtn">{{g.lang("查找")}}</span>
									</div>
								</div>
							</div>

							<div class="admin-calendar-table">
								<table>
									<tr>
										<td class="first-col">标题</td>
										<td>内容</td>
										<td>类型</td>
										<td @click="onClick_sortBtn('send_time')" class="pointer">发送时间

											<common-sort :type="dataObj.sortOrder"
														 :target="'send_time'"
														 :currentField="dataObj.sortField"
											></common-sort>
										</td>
									</tr>
									<tr v-for="item in messageList" @click="onClick_msgContent(item.id)">
										<td>{{item.title}}</td>
										<td v-html="item.content" class="message-box"></td>
										<td v-text="onGet_typeContent(item.type)"></td>
										<td>{{item.time}}</td>
									</tr>
									<!--</transition>-->
								</table>
							</div>
							<common-page :index="dataObj.page" :total="totalPage"
										 @change="onChange_currentPage" v-show="totalPage>1"></common-page>
							<common-prompt v-show="messageList.length==0"></common-prompt>
						</div>
						<common-footer></common-footer>
					</div>
				</div>
				<transition name="bounce">
					<div class="affix-box default-pos-type" v-show="isShow_msgContent">
						<div class="pop-edit-password add-level-pop refund-pop">
							<div class="show-close-btn">
								<img :src="g.config.path.images+'/close.png'"
									 @click="onClick_closeBtn"/>
							</div>
							<div class="step-about-tit show-recharge-tips">
								系统通知
							</div>
							<div class="pop-body add-level-body">
								<div>
									<span class="title">通知标题：</span>
									<input type="text" v-model="title" disabled>
								</div>
								<div>
									<span class="title">通知内容：</span>
									<div class="msg-content" v-html="content"></div>
								</div>
							</div>
							<div class="confirm-edit-wrap">
								<div class="save-button pointer bg-btn" @click="onClick_closeBtn">确认</div>
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
	import CommonFooter from './common/CommonFooter.vue';
	import CommonPrompt from './common/CommonPrompt.vue';
	import CommonSort from './common/CommonSort.vue';
	import {getMessage} from './index';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_msgContent: false,
				g: g,
				totalPage: 1,
				messageList: [],
				dataObj: {},
				title: "",
				content: "",
				countData: {
					totalCount: 0,
					readCount: 0,
					unReadCount: 0
				}
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
				this.initList();
				this.initData();
				g.event.addEventListener('UPDATE_MSG_LIST', this.onUpdate_messageList);
//				var id = g.currentRoute.query.id;
//				if (id)
//				{
//					this.onClick_msgContent(id)
//				}
				g.event.addEventListener('SHOW_MSG_CONTENT', this.onClick_msgContent);
			},
			initData(){
				this.dataObj = {
					'messageContent': "",
					'page': 1,
					'pageSize': g.param.pageSizeList[0],
					'sortField': 'send_time',
					'sortOrder': 'desc',
					'status': ""
				}
			},
			initList(){
				this.countData.readCount = g.data.messagePool.readCount;
				this.countData.unReadCount = g.data.messagePool.unreadCount;
				this.countData.totalCount = this.countData.readCount + this.countData.unReadCount;
				this.messageList = g.data.messagePool.list;
				this.totalPage = g.data.messagePool.totalPage;
			},
			onClick_closeBtn(){
				this.isShow_msgContent = false;
			},
			onChange_currentPage($page, $pageSize){
				this.dataObj.page = $page;
				this.dataObj.pageSize = $pageSize;
				this.onUpdate_messageList()
			},
			onUpdate_messageList(){
				getMessage(this.dataObj, this.initList);
			},
			onClick_searchBtn(){
				this.onUpdate_messageList()
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
				this.dataObj.sortField = $field;
				this.dataObj.page = 1;
				this.onUpdate_messageList();

			},
			onClick_changeType($type){
				if (this.dataObj.status === $type)
				{
					return
				}
				this.dataObj.status = $type;
				this.dataObj.page = 1;
				this.onUpdate_messageList()
			},
			onClick_msgContent($id){
				this.isShow_msgContent = true;
				var msgItem = g.data.messagePool.getDataById($id);
				if (msgItem)
				{
					this.title = msgItem.title;
					this.content = msgItem.content;
					if (msgItem.status == 0)
					{
						this.onUpdate_msgStatus($id)
					}
				}
			},
			onUpdate_msgStatus($id){
				g.net.call("message/updateMessageStatus", {
					'msgIds': $id,
					'status': 1
				}).then(($data) =>
				{
					this.onUpdate_messageList();
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onGet_typeContent($type){
				if ($type == 1)
				{
					return "活动开始预警"
				}
				else if ($type == 2)
				{
					return "活动开始"
				}
				else if ($type == 3)
				{
					return "活动结束预警"
				}
				else if ($type == 4)
				{
					return "活动结束"
				}
				else if ($type == 5)
				{
					return "红包余额"
				}
			}
		}
	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/myActivity.scss";

	.my-activity .me-checkbox-core {
		margin-left: 10px;
		margin-right: 10px;
	}

	.message-box {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.msg-content{
		width:334px;
		height:150px;
		border:1px solid #ccc;
		float:left;
		padding:10px;

	}
</style>


