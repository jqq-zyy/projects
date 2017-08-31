<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<common-top-nav></common-top-nav>
			<div class="admin-main-wrap">
				<common-nav></common-nav>
				<div class="right-content-wrap">
					<div class="admin-data-items">
						<p class="right-header">
							{{g.lang("账户信息")}}
						</p>
						<div class="right-nav">
							<div @click="onClick_goPersonalBtn">{{g.lang("基本信息")}}</div>
							<div class="current-item">{{g.lang("企业认证信息")}}</div>
						</div>
						<div class="right-body">
							<div class="license-box">
								<div class="title">{{g.lang("企业营业执照")}}</div>
								<a href="javaScript:void(0)" class="file license-file"
								   :style="{backgroundImage:'url('+infoObj.businessLicense+')'}">

									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'businessLicense')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
								<a href="javaScript:void(0)" class="file license-file"
								   :style="{backgroundImage:'url('+infoObj.taxRegister+')'}">

									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'taxRegister')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
								<a href="javaScript:void(0)" class="file license-file"
								   :style="{backgroundImage:'url('+infoObj.organizeCertificate+')'}">

									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'organizeCertificate')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
							</div>
							<div class="idcard-box">
								<div class="title"> {{g.lang("法人身份证号")}}</div>
								<a href="javaScript:void(0)" class="file idcard-file"   :style="{backgroundImage:'url('+infoObj.idcardImagA+')'}">
									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'idcardImagA')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
								<a href="javaScript:void(0)" class="file idcard-file" :style="{backgroundImage:'url('+infoObj.idcardImagB+')'}">
									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'idcardImagB')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
							</div>
							<div class="line">
								<div class="title">{{g.lang("企业全称")}}</div>
								<input type="text" v-model="infoObj.companyFullName">
								<div class="title">品牌名称</div>
								<input type="text" v-model="infoObj.brandName">
							</div>
							<div class="logo-box">
								<div class="title">{{g.lang("企业logo")}}</div>
								<a href="javaScript:void(0)" class="file logo-file"  :style="{backgroundImage:'url('+infoObj.shopLogo+')'}">
									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'shopLogo')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
								<div class="title">品牌授权书</div>
								<a href="javaScript:void(0)" class="file logo-file"  :style="{backgroundImage:'url('+infoObj.brandAuthorize+')'}">
									<input type="file" class="load-img"
										   @change="onChange_uploadPicInput($event,'brandAuthorize')"
										   accept="image/jpeg,image/gif,image/png">
								</a>
							</div>
							<div>
								<div class="button" @click="onClick_submitBtn" v-if="auditStatus ==0">{{g.lang("提交审核")}}</div>
								<div class="button"  @click="onClick_submitBtn"
									 v-if="auditStatus ==2||auditStatus==3">{{g.lang("提交修改申请")}}</div>
								<div class="button disabled" v-if="auditStatus ==1">{{g.lang("企业信息审核中")}}</div>
							</div>
						</div>

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

	export default {
		created(){
			this.init();
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				g: g,
				auditStatus:1,
				infoObj: {
					'companyFullName': '',
					'shopLogo': '',
					'businessLicense': '',
					'idcardImagA': '',
					'idcardImagB': '',
					'brandName':'',
					'brandAuthorize':'',
					'taxRegister':'',
					'organizeCertificate':''

				}
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav
		},
		methods: {
			init(){
				this.initInfo();
			},
			initInfo(){
				this.auditStatus = g.data.userInfo.auditStatus;
				this.infoObj.companyFullName = g.data.userInfo.fullName;
				this.infoObj.shopLogo = g.data.userInfo.logo;
				this.infoObj.businessLicense = g.data.userInfo.license;
				this.infoObj.idcardImagA = g.data.userInfo.imagA;
				this.infoObj.idcardImagB = g.data.userInfo.imagB;
				this.infoObj.brandName = g.data.userInfo.brandName;
				this.infoObj.brandAuthorize = g.data.userInfo.warrantImg;
				this.infoObj.taxRegister = g.data.userInfo.taxImg;
				this.infoObj.organizeCertificate = g.data.userInfo.organizeImg;
			},
			onClick_goPersonalBtn(){
				g.url = ("/personal")
			},
			onClick_submitBtn(){
				for(var key in this.infoObj){
					if(this.infoObj[key] ==""){
						g.ui.toast('请填写全部信息');
						return
					}
				}
				g.net.call("user/uploadCompanyAptitude", this.infoObj
				).then(($data) =>
				{
					this.infoObj.auditStatus =1;
					g.data.userInfo.update(this.infoObj);
					this.auditStatus = g.data.userInfo.auditStatus;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onChange_uploadPicInput($e, $type){
				var eve = $e.target.files[0];
				if ($type == 'shopLogo')
				{
					g.func.getBase64(eve, 1, 100, 100).then(($base64)=>
					{
						this.onUpload_img( $base64,$type)
					});
				}
				else
				{
					g.func.getBase64(eve, 1).then(($base64)=>
					{
						this.onUpload_img( $base64,$type)
					});
				}

			},
			onUpload_img($base64,$type){
				g.net.call("user/uploadFile", {
					"file":$base64
				}).then(($data) =>
				{
					this.infoObj[$type] = $data.fileUrl
				}, (err) =>
				{
					g.func.dealErr(err);
				});
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
</style>











