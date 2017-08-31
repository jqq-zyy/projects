<template>
	<div class="page-box">
		<div v-show="page==2">
			<div class="mask">第一页</div>
			<div class="line"></div>
			<div class="t001-bg-wrap left-page">
				<div class="phone-box">
					<div class="phone-bg">
						<div class="screen-bg ">
							<img class="phone-top" :src="g.config.path.images+'/phone-top.png'" alt="">
							<div class="phone-header">
								<div><span class="back-icon"></span>返回</div>
								<div>{{dataObj.rpTitle}}</div>
								<div>...</div>
								<span class="connect-line title-line"><span class="horn"></span></span>

							</div>
							<div class="head-img">
								<img :src="dataObj.rpLogoUrl" alt="">
							</div>
							<p class="nick-name">{{dataObj.rpBrand}}</p>
							<p class="blessing-text">{{dataObj.rpWish}}!</p>
							<div class="open-bag" id="chooseBtn">
								{{g.lang("拆红包")}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-show="page==3">
			<div class="mask">第二页</div>
			<div class="line"></div>
			<div class="t001-receive-wrap left-page">
				<div class="phone-box">
					<div class="phone-bg ">
						<div class="screen-bg screen">
							<img class="phone-top" :src="g.config.path.images+'/phone-top.png'" alt="">
							<div class="phone-header">
								<div><span class="back-icon"></span>返回</div>
								<div>{{dataObj.rpTitle}}</div>
								<div>...</div>
							</div>

							<div class="phone-body">
								<div class="head-pic"><img :src="dataObj.rpLogoUrl"></div>
								<p class="bag-from">{{dataObj.rpBrand}}</p>
								<p class="willing-text">{{dataObj.rpWish}}</p>
								<p class="money"><span>6.66</span>元</p>
								<p class="plat">商家红包8.22(金牌会员*2.1倍)<br>平台红包0.50</p>
								<p class="total-pay">已累计消费<span>89</span>次</p>
								<div class="save pointer">拆红包</div>
								<p class="company">再有10次就可以升级XXX会员 </p>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="page==4">
			<div class="mask">第三页</div>
			<div class="line"></div>
			<div  class="left-page success-page middle">
				<div class="phone-box">
					<div class="phone-bg ">
						<div class="screen-bg screen step_3">
							<img class="phone-top" :src="g.config.path.images+'/phone-top.png'" alt="">
							<div class="phone-header">
								<div>&lt返回</div>
								<div>{{dataObj.rpTitle}}</div>
								<div>...</div>
							</div>
							<div class="phone-body">
								<div class="m-money">
									<p class="total-money"><span>6.66</span>元</p>
									<p class="save-money">已存入您的余额</p>
								</div>

								<div class="zfb">
									<img :src="g.config.path.images+'/zfb.png'" alt="">
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="page==5">
			<div>

				<!--<qrcode ></qrcode>-->
				<p class="mask">请用手机支付宝扫码预览</p>
				<div class="line"></div>
				<div class="left-page middle">
					<div class="phone-box">
						<div class="phone-bg">
							<div class="screen-bg step_3">
								<img class="phone-top" :src="g.config.path.images+'/phone-top.png'" alt="">
								<div class="phone-header">
									<div><span class="back-icon"></span>返回</div>
									<div>{{dataObj.rpTitle}}</div>
									<div>...</div>
								</div>
								<div class=" code-border">
									<qrcode></qrcode>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div v-show="page==2||page==3" class="right-page">
			<div class="edit-form">
				<span>{{g.lang("显示标题")}}</span>
				<input type="text" v-model="dataObj.rpTitle">
			</div>
			<div class="edit-form">
				<span>{{g.lang("显示图片")}}</span>

				<div class="upload-box">
					<img class="upload-img" :src="g.config.path.images+'/upload.png'" alt="">
					<div class="upload">
						<input type="file" class="load-img pointer"
							   @change="onChange_uploadPicInput($event)"
							   accept="image/jpeg,image/gif,image/png">
						<p>更换</p>
					</div>
					<span class="rule-tip">*品牌名称不可更改</span>
				</div>


			</div>
			<!--<div class="edit-form">-->
			<!--<p>{{g.lang("品牌植入")}}</p>-->
			<!--<input type="text" v-model="dataObj.rpBrand">-->
			<!--</div>-->
			<div class="edit-form">
				<span>{{g.lang("祝福文字")}}</span>
				<textarea type="text" v-model="dataObj.rpWish"></textarea>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import RouterList from './../../../router';
	import g from './../../../global';
	import * as AppManager from './../../../js/manager/AppManager';
	import qrcode from './../qrcode.vue';

	export default {
		created(){
			this.initData();
			this.removeEvents();
			g.event.addEventListener("SAVE_ACTIVITY_PAGE", this.onSave_pageContent);

		},
		data(){
			return {
				g: g,
				dataObj: {},
				isInit: true
			}
		},
		watch: {
			page($val){
				if ($val == 2 && this.isInit)
				{
					this.initData();
					this.isInit = false
				}
			}
		},
		components: {
			qrcode
		},
		props: {
			page: {
				type: Number
			}
		},
		methods: {
			initData(){
				var id = g.currentRoute.query.id;
				if (id)
				{
					var activityRole = g.data.activityRolePool;
					this.dataObj = {
						"rpTitle": activityRole.rpTitle,
						"rpLogoUrl": activityRole.rpLogoUrl,
						"rpBrand": activityRole.rpBrand,
						"rpWish": activityRole.rpWish
					}
				}
				else
				{
					this.dataObj = {
						"rpTitle": "领红包",
						"rpWish": "恭喜发财，万事如意",
						"rpLogoUrl": "",
						"rpBrand": ""
					};
					this.onUpdate_defaultLogo()
				}
			},
			onUpdate_defaultLogo(){
				g.net.call("user/queryShopLogoInfo").then(($data) =>
				{
					this.dataObj.rpLogoUrl = $data.shopLogo;
					this.dataObj.rpBrand = "来自" + $data.brandName + "的现金红包";

				}, (err) =>
				{
					g.func.dealErr(err);
				});
			},
			onChange_uploadPicInput($e){
				var eve = $e.target.files[0];
				g.func.getBase64(eve, 1, 100, 100).then(($base64)=>
				{
					this.dataObj.rpLogoUrl = $base64
				});

			},
			onSave_pageContent(){
				if (this.dataObj.rpTitle == "")
				{
					g.ui.toast("请填写标题");
					return
				}
				else if (this.dataObj.rpLogoUrl == "")
				{
					g.ui.toast("请上传logo");
					return
				}
				else if (this.dataObj.rpBrand == "")
				{
					g.ui.toast("请填写品牌植入");
					return
				}
				else if (this.dataObj.rpWish == "")
				{
					g.ui.toast("请填写祝福文字");
					return
				}
				this.$emit('click', this.dataObj);
				this.$emit('next')
			},
			removeEvents(){
				g.event.removeEventListener("SAVE_ACTIVITY_PAGE", this.onSave_pageContent)
			}
		}

	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../../../css/step.scss";

	.connect-line {
		//display: inline-block;
		width: 300%;
		border: 1px solid #dbdee7;
		position: absolute;
		z-index: 2;
		.horn {
				 border: 10px solid transparent;
				 border-left: 10px solid #dbdee7;
				 float: right;
			 }
	}
	.title-line {
		left: 75%;
		top: 30px;
	}

	.right-page {
		position: relative;
		background: #ffffff;
		z-index: 999;
	}
</style>

