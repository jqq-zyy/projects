<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<div class="right-body personal-box">
							<div class="g-title"><span>商户列表</span>/商户详情</div>
							<div class="admin-calendar-table">
								<div>基本信息</div>
								<span>商户ID:{{infoObj.shopId}}</span>
								<span>用户名:{{infoObj.logon}}</span>
								<span>手机号：{{infoObj.telphone}}</span>
								<span>企业联系人：{{infoObj.contacts}}</span>
								<span>联系邮箱：{{infoObj.mail}}</span>
								<span>状态：{{infoObj.freezeStatusDesc}}
									<span class="button pointer" v-text="onConfirm_freezeStatus(infoObj.freezeStatus)"
										  @click="onClick_changeStatus(infoObj.freezeStatus)"></span>
								</span>
								<span>创建时间：{{infoObj.createTime}}</span>
							</div>
							<div class="admin-calendar-table">
								<div>企业认证信息 <span>{{infoObj.authStatusDesc}}</span></div>
								<div>企业证照：
									<div>
										<img :src="infoObj.businessLicense" alt="" v-show="infoObj.businessLicense">
										<span v-show="infoObj.businessLicense==''">暂无</span>
										<span>营业执照</span>
									</div>
									<div>
										<img :src="infoObj.taxRegister" alt="" v-show="infoObj.taxRegister">
										<span v-show="infoObj.taxRegister==''">暂无</span>
										<span>税务登记证</span>
									</div>
									<div>
										<img :src="infoObj.organizeCertificate" alt=""
											 v-show="infoObj.organizeCertificate">
										<span v-show="infoObj.organizeCertificate==''">暂无</span>
										<span>组织结构代码证</span>
									</div>

								</div>
								<div>法人身份证照：
									<div>
										<img :src="infoObj.idcardImagA" alt="" w-show="infoObj.idcardImagA">
										<span v-show="infoObj.idcardImagA==''">暂无</span>
										<span>正面</span>
									</div>
									<div>
										<img :src="infoObj.idcardImagB" alt="" w-show="infoObj.idcardImagB">
										<span v-show="infoObj.idcardImagB==''">暂无</span>
										<span>反面</span>
									</div>
								</div>
								<div>
									企业全称：{{infoObj.companyFullName}}
								</div>
								<div>企业logo:
									<img :src="infoObj.shopLogo" alt="">
									<div>
										<img :src="infoObj.shopLogo" alt="" w-show="infoObj.shopLogo">
										<span v-show="infoObj.shopLogo==''">暂无</span>
									</div>
								</div>
								<div>品牌授权书：
									<div v-for="item in infoObj.brandList">
										<img :src="item.brandAuthorize" alt="">{{item.brandName}}
									</div>
								</div>
								<div v-show="infoObj.authStatus==3">
									<div class="button pointer">通过申请</div>
									<div class="button pointer" @click="onClick_refuseBtn">拒绝申请</div>
								</div>

							</div>
							<div class="admin-calendar-table">
								<div>活动信息</div>
								<div>
									<span>全部活动数：{{infoObj.activityTotalNum}}</span>
									<span>进行中的活动数：{{infoObj.activityIngNum}}</span>
									<span>全部活动数：{{infoObj.activityFreezeNum}}</span>
								</div>
							</div>
							<div class="admin-calendar-table">
								<div>财务流水信息</div>
								<div>
									<span>二维码购买笔数：{{infoObj.qrcodeBuyTime}}（总金额：¥{{infoObj.qrcodeBuyAmount}}）</span>
									<span>二维码退款笔数：{{infoObj.qrcodeRefundTime}}（总金额：¥{{infoObj.qrcodeRefundAmount}}）</span>
									<span>红包账户充值笔数：{{infoObj.rpRechargeTime}}（总金额：¥{{infoObj.rpRechargeAmount}}）</span>
									<span>红包账户退款笔数：{{infoObj.rpRefundTime}}（总金额：¥{{infoObj.rpRefundAmount}}）</span>
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
						<div class="pop-body tree-box">
							<div>确认{{currentTypeDesc}}该用户么</div>
							<div class="m-title">
								<div class="button pointer" @click="onClick_closeBtn">暂不{{currentTypeDesc}}</div>
								<div class="button pointer" @click="onClick_confirmChange">确认{{currentTypeDesc}}</div>
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
						<div class="pop-body add-level-body">
							<div class="m-title"><span class="name">请输入拒绝原因：</span>
								<textarea name="" id="" cols="30" rows="10" class="describle-reasons"
										  v-model="refuseContent"  @focus="onFocus_refuseInput"></textarea>
								<div v-show="isShow_hasError">拒绝原因不能为空</div>
							</div>
							<div class="m-title">
								<div class="save-button pointer bg-btn" @click="onClick_closeBtn">暂不拒绝</div>
								<div class="save-button pointer bg-btn" @click="onClick_sumbitBtn">确认拒绝并告知商户</div>
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
	import MainLayout from './common/mainLayout.vue';
	import CommonNav from './common/CommonNav.vue';
	import CommonTopNav from './common/CommonTopNav.vue';
	import CommonFooter from './common/CommonFooter.vue';
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
				currentType: "冻结",
				currentTypeDesc: "",
				refuseContent: "",
				shopId: "",
				g: g,
				infoObj: {}
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods: {
			init(){
				this.infoObj = g.data.userDetailPool.hash;
				this.shopId = this.infoObj.shopId;
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
			},
			onClick_confirmChange(){
				var obj = {};
				if (this.currentType == 1)
				{
					obj = {
						"freezeStatus": 0,
						"freezeStatusDesc": "冻结"
					}
				}
				else
				{
					obj = {
						"freezeStatus": 1,
						"freezeStatusDesc": "正常"
					}
				}
				/*g.net.call("/getActivityDetail",{
				 "id":this.shopId
				 }).then(($data) =>
				 {*/
				g.data.userDetailPool.update(obj);
				this.init();
				this.isShow_changeTypePop = false;
//				}, (err) =>
//				{
//					g.func.dealErr(err);
//				});
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
			},
			onFocus_refuseInput(){
				this.isShow_hasError = false
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">

	@import "../css/common.scss";
</style>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../css/personlInfo.scss";

	img {
		width: 50px;
		height: 50px;
	}
</style>






