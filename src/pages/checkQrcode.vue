<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'checkqrcode'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title">查询二维码</div>
							<div class=" bar-box">
								<div class="search-code-box">
									<span class="search-name">二维码编码:</span>
									<input type="text" class="search-input" v-model="qrcodeId" placeholder="请输入二维码编码">
									<span class="btn pointer search border-btn hb-fill-middle2-bg"   @click="onClick_searchBtn">查找</span>
								</div>
							</div>
							<div class="admin-calendar-table" style="background: #ffffff" v-if="qrcodeInfo.qrcodeId">
								<div class="check-detail">
									<div class="msg-title">查找结果</div>
									<div class="msg-title">二维码ID：{{qrcodeInfo.qrcodeId}}</div>
									<span class="msg-info">所属活动名称:<i class="text-color"  @click="onClick_activityItem(qrcodeInfo.activityId,qrcodeInfo.activityName)">{{qrcodeInfo
										.activityName}}</i></span>
									<span class="msg-info">活动创建时间:{{qrcodeInfo.createTime}}</span>
									<span class="msg-info">活动状态:{{qrcodeInfo.activityStatusDesc}}</span>
									<span class="msg-info">所属商户ID:<i class="text-color">{{qrcodeInfo.shopId}}</i></span>
                                    <span class="msg-info">企业全称:{{qrcodeInfo.companyFullName}}
                                        <img :src="g.config.path.images+'/cert'+authStatus+'.png'" class="cert-img">
										<span :class="{'cert':authStatus==1}">{{qrcodeInfo.authStatusDesc}}</span>
									</span>
									<span class="msg-info">商户状态:{{qrcodeInfo.freezeStatusDesc}}</span>
								</div>
							</div>
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
	import CommonFooter from './common/CommonFooter.vue';
	export default {
		created(){
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				qrcodeId:"",
				qrcodeInfo:{},
				authStatus:1
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		watch:{
			qrcodeId($val,$oldVal){
				if (isNaN($val))
				{
					this.qrcodeId = $oldVal;
				}
			}
		},
		methods: {
			onClick_searchBtn(){
				g.net.call("qrcode/queryQrcodeInfo", {
					"qrcodeId":this.qrcodeId
				}).then(($data) =>
				{
					this.qrcodeInfo = $data;
					this.authStatus = $data.authStatus
				}, (err) =>
				{
					this.qrcodeInfo = {};
					g.func.dealErr(err);
				});
			},
			onClick_activityItem($id,$name){
				g.url = ({
					"path": "/activitydetail",
					"query": {
						"id": $id,
						"name": $name
					}
				})
			}
		}
	}

</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/checkQrcode.scss";
</style>






