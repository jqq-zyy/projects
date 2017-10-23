<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'user'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body">
							<div class="g-title"><span>商户列表</span>/商户详情</div>
							<div class="admin-calendar-table user-detail-box">
								<div class="detail-msg">
									<div class="msg-title">基本信息</div>
									<span class="msg-info">商户ID： {{infoObj.shopId}}</span>
									<span class="msg-info">用户名： {{infoObj.logon}}</span>
									<span class="msg-info">手机号： {{infoObj.telphone}}</span>
									<span class="msg-info">企业联系人： {{infoObj.contacts}}</span>
									<span class="msg-info">联系邮箱： {{infoObj.mail}}</span>
									<span class="msg-info">状态： {{infoObj.freezeStatusDesc}}
										<span class="border-btn pointer status-btn	hb-fill-middle2-bg"
											  v-text="onConfirm_freezeStatus(infoObj.freezeStatus)"
											  @click="onClick_changeStatus(infoObj.freezeStatus)"></span>
									</span>
									<span class="msg-info">创建时间：{{infoObj.createTime}}</span>
								</div>
								<div class="detail-msg">
									<div class="msg-title">企业认证信息 <span>{{infoObj.authStatusDesc}}</span></div>
									<div class="upload-box">
										<span class="company">企业证照：</span>
										<div class="enterprise-msg">
											<img :src="infoObj.businessLicense" alt="" v-show="infoObj.businessLicense" class="pointer" @click="onClick_seeImage(infoObj.businessLicense)">
											<img v-show="!infoObj.businessLicense" :src="g.config.path.images+'/noHas.png'">
											<span>营业执照</span>
										</div>
										<div class="enterprise-msg">
											<img :src="infoObj.taxRegister" alt="" v-show="infoObj.taxRegister" class="pointer" @click="onClick_seeImage(infoObj.taxRegister)">
											<img v-show="!infoObj.taxRegister":src="g.config.path.images+'/noHas.png'">
											<span>税务登记证</span>
										</div>
										<div class="enterprise-msg">
											<img :src="infoObj.organizeCertificate" alt="" v-show="infoObj.organizeCertificate" class="pointer" @click="onClick_seeImage(infoObj.organizeCertificate)">
											<img v-show="!infoObj.organizeCertificate" :src="g.config.path.images+'/noHas.png'">
											<span>组织结构代码证</span>
										</div>

									</div>
									<div class="upload-box">
										<span class="company">法人身份证照：</span>
										<div class="enterprise-msg">
											<img :src="infoObj.idcardImagA" alt="" v-show="infoObj.idcardImagA" class="pointer" @click="onClick_seeImage(infoObj.idcardImagA)">
											<img v-show="!infoObj.idcardImagA"  :src="g.config.path.images+'/noHas.png'">
											<span>正面</span>
										</div>
										<div class="enterprise-msg">
											<img :src="infoObj.idcardImagB" alt="" v-show="infoObj.idcardImagB" class="pointer" @click="onClick_seeImage(infoObj.idcardImagB)">
											<img v-show="!infoObj.idcardImagB" :src="g.config.path.images+'/noHas.png'">
											<span>反面</span>
										</div>
									</div>
									<div class="enterprise-name upload-box">

										<span class="company">企业全称：</span>
										<span v-if="infoObj.companyFullName" >{{infoObj.companyFullName}}</span>
										<img v-if="!infoObj.companyFullName" :src="g.config.path.images+'/noHas.png'">
									</div>
									<div class="upload-box">
										<span class="company">企业logo：</span>
										<div class="enterprise-msg">
											<img :src="infoObj.shopLogo" alt="" v-show="infoObj.shopLogo" class="pointer" @click="onClick_seeImage(infoObj.shopLogo)">
											<img v-show="!infoObj.shopLogo" :src="g.config.path.images+'/noHas.png'">
										</div>

									</div>
									<div class="upload-box">
										<span class="company">品牌授权书：</span>
										<div v-for="item in infoObj.brandList" class="enterprise-msg" v-if="infoObj.brandList.length>0">
											<img :src="item.brandAuthorize" alt="" @click="onClick_seeImage(item.brandAuthorize)" class="pointer">
											<span>{{item.brandName}}</span>
										</div>
										<img v-if="infoObj.brandList.length==0" :src="g.config.path.images+'/noHas.png'">

									</div>
									<div v-show="infoObj.authStatus==3" class="status-button-box">
										<div class="applicate-btn pointer border-btn " @click="onClick_passBtn">通过申请
										</div>
										<div class=" applicate-btn pointer bg-btn" @click="onClick_refuseBtn">拒绝申请</div>
									</div>
								</div>
								<div class="detail-msg">
									<div class="msg-title">活动信息</div>
									<div>
										<span class="msg-info">全部活动数：{{infoObj.activityTotalNum}}</span>
										<span class="msg-info">进行中的活动数：{{infoObj.activityIngNum}}</span>
										<span class="msg-info">冻结中的活动数：{{infoObj.activityFreezeNum}}</span>
									</div>
								</div>

								<div class="detail-msg">
									<div class="msg-title">财务流水信息</div>
									<div>
										<span class="msg-info msf-info-width">二维码购买笔数：{{infoObj.qrcodeBuyTime}}（总金额：¥{{infoObj.qrcodeBuyAmount}}）</span>
										<span class="msg-info msf-info-width">二维码退款笔数：{{infoObj.qrcodeRefundTime}}（总金额：¥{{infoObj.qrcodeRefundAmount}}）</span>
										<span class="msg-info msf-info-width">红包账户充值笔数：{{infoObj.rpRechargeTime}}（总金额：¥{{infoObj.rpRechargeAmount}}）</span>
										<span class="msg-info msf-info-width">红包账户退款笔数：{{infoObj.rpRefundTime}}（总金额：¥{{infoObj.rpRefundAmount}}）</span>
									</div>
								</div>
							</div>
						</div>

						<common-footer></common-footer>
					</div>
				</div>
			</div>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_changeTypePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body">
							<div class="m-title text-center">确认{{currentTypeDesc}}该用户么</div>
							<div class="m-title button-box">
								<div class="border-btn pointer button hb-fill-middle2-bg" @click="onClick_closeBtn">
									暂不{{currentTypeDesc}}
								</div>
								<div class="bg-btn pointer button hb-fill-middle2-rev" @click="onClick_confirmChange">
									确认{{currentTypeDesc}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="bounce">
				<div class="affix-box default-pos-type" v-show="isShow_refusePop">
					<div class="pop-edit-password pop-edit">
						<div class="show-close-btn">
							<img :src="g.config.path.images+'/close.png'"
								 @click="onClick_closeBtn"/>
						</div>
						<div class="pop-tit"></div>
						<div class="pop-body">
							<div class="m-title">
								<span class="">请输入拒绝原因：</span>
								<textarea name="" id="" cols="30" rows="10" class="describle-reasons"
										  v-model="refuseContent" @focus="onFocus_refuseInput"></textarea>
								<div v-show="isShow_hasError">拒绝原因不能为空</div>
							</div>
							<div class="button-box" style="margin-top: 20px">
								<div class="refuse-button pointer border-btn" @click="onClick_closeBtn">暂不拒绝</div>
								<div class="refuse-button pointer bg-btn" @click="onClick_sumbitBtn">确认拒绝并告知商户</div>
							</div>
						</div>

					</div>
				</div>
			</transition>
			<see-image v-show ="isShow_seeImage" :imageUrl="currentUrl" @close="onClick_closeBtn"></see-image>
		</div>
	</main-layout>
</template>

<script type="text/ecmascript-6">
	import g from '../global';
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
	import SeeImage from './common/SeeImage.vue';
	import {queryShopDetail} from './userDetail';
	export default {
		created(){
			this.isLoad = true;
			this.init();
		},
		data(){
			return {
				isLoad: false,
				isShow_changeTypePop: false,
				isShow_refusePop: false,
				isShow_hasError: false,
				isShow_seeImage:false,
				currentType: "冻结",
				currentTypeDesc: "",
				refuseContent: "",
				currentStatus:"",
				shopId: "",
				g: g,
				infoObj: {},
				currentUrl:""
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter,
			SeeImage
		},
		methods: {
			init(){
				this.infoObj = g.data.userDetailPool.hash;
				this.shopId = this.infoObj.shopId;
			},
			onClick_seeImage($url){
				this.currentUrl = $url;
				this.isShow_seeImage = true;

			},
			onConfirm_freezeStatus($type){
				if ($type == 1)
				{
					return "冻结该商户"
				}
				else
				{
					return "解冻该商户"
				}
			},
			onClick_changeStatus($type){
				this.currentType = $type;
				if ($type == 1)
				{
					this.currentTypeDesc = "冻结"
				}
				else
				{
					this.currentTypeDesc = "解冻"
				}
				this.isShow_changeTypePop = true

			},
			onClick_closeBtn(){
				this.isShow_changeTypePop = false;
				this.isShow_refusePop = false;
				this.isShow_seeImage = false;

			},
			onClick_confirmChange(){
				var obj = {};
				var freezeStatus;
				if (this.currentType == 1)
				{
					obj = {
						"freezeStatus": 0,
						"freezeStatusDesc": "冻结"
					}
					freezeStatus = 2
				}
				else
				{
					obj = {
						"freezeStatus": 1,
						"freezeStatusDesc": "正常"
					}
					freezeStatus = 1
				}
				g.net.call("user/updateShopFreeze",{
				 	"shopId":this.shopId,
					"freezeStatus":freezeStatus
				 }).then(($data) =>
				 {
					g.data.userDetailPool.update(obj);
					this.init();
					this.isShow_changeTypePop = false;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onClick_refuseBtn(){
				this.isShow_refusePop = true;
			},
			onClick_sumbitBtn(){
				if (this.refuseContent == "")
				{
					this.isShow_hasError = true;
					return
				}
				this.currentStatus = 3
				this.updateShopAuth();
			},
			onClick_passBtn(){
				this.currentStatus = 2
				this.updateShopAuth();
			},
			updateShopAuth(){
				g.net.call("user/updateShopAuth", {
					"shopId": this.shopId,
					"auditStatus":this.currentStatus,
					"remark":this.refuseContent,
					"auditRecordId":this.infoObj.auditRecordId
				}).then(($data) =>
				{
					g.ui.toast("审核成功");
					this.isShow_refusePop = false;
					queryShopDetail(this.shopId,this.init)
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onFocus_refuseInput(){
				this.isShow_hasError = false
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/pop.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";
	@import "../css/userDetail.scss";
</style>






