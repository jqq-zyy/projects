<template>
	<div class="pop-edit-password pop-edit">
		<div class="show-close-btn" @click.stop="onClick_closeBtn">
			<img :src="g.config.path.images+'/close.png'"/>
		</div>
		<div class="pop-tit">
			{{g.lang("关联红包活动")}}
		</div>

		<div class="pop-body">
			<div class="m-title">
				<span class="m-name">{{g.lang("选择活动")}}：</span>
				<div class="m-drop-box pointer">
						<span class="m-drop" v-model="relateData.activityId" @click="onClick_activityBtn">
							{{activityName}}
							<span class="m-icon pointer">
								<img :class="['m-rotete',isShow_activityList?'rotate':'']"
									 :src="g.config.path.images+'/icon-down.png'" alt="">
							</span>
						</span>
					<div class="drop-list" v-show="isShow_activityList">
						<ul>
							<li v-for="item in activityNameList"
								@click="onClick_activityItem(item.activityId,item.activityName)">
								{{item.activityName}}
							</li>
						</ul>
					</div>
				</div>
				<span class="border-btn add-btn pointer" @click="onClick_addBtn">添加活动</span>
			</div>
			<div class="line"></div>
			<div class="m-title pay-way">
				<span class="name">二维码范围：</span>
				<ul>
					<li :class="{'m-checked':relateData.relateType==1}">
						<label>
								<span class="me-radio">
									<input class="me-radio-input" type="radio" name="type" value="1"
										   v-model="relateData.relateType">
									<span class="me-radio-core"></span>
								</span>
							按导出批次选择
						</label>
					</li>
					<li :class="{'m-checked':relateData.relateType==2}">
						<label>
								<span :class="me-radio">
									<input type="radio" class="me-radio-input" name="type" value="2"
										   v-model="relateData.relateType">
									<span class="me-radio-core"></span>
								</span>
							输入二维码的编码范围
						</label>
					</li>

				</ul>
			</div>
			<div class="table-box">
				<div v-show="relateData.relateType ==1">
					<div class="out-table">
						<table class="table">
							<thead>
							<tr>
								<td class="m-td1">批次编号</td>
								<td class="m-td2">适用商品</td>
								<td class="m-td3">总数量</td>
								<td class="m-td3">全新</td>
								<td class="m-td3">可覆盖</td>
								<!--<td class="m-td">已扫描</td>-->
								<!--<td class="m-td">已过期</td>-->
							</tr>
							</thead>
							<tbody>
							<tr v-for="item in relateBatchList" class="tr-checked">
								<td class="td1"><label :for="'batch'+item.id">
										<span class="me-radio">
											<input class=" me-radio-input" type="checkbox" name="batch"
												   v-model="contactList"
												   :id="'batch'+item.id"
												   :value="item.id">
											<span class="me-radio-core code-id"></span>
										</span>
									{{item.batchNo}}</label></td>
								<td class="td2"><label :for="'batch'+item.id">{{item.batchUse}}</label></td>
								<td class="td3"><label :for="'batch'+item.id">{{item.qrcodeCount}}</label></td>
								<td class="td3"><label :for="'batch'+item.id">{{item.usableCount}}</label></td>
								<td class="td3"><label :for="'batch'+item.id">{{item.unabledCount}}</label></td>
								<!--<td></td>-->
								<!--<td></td>-->
							</tr>
							</tbody>
						</table>
					</div>
					<label class="all-label">
								<span class="me-radio">
									<input class=" me-radio-input" type="checkbox" @click="onClick_checkAllBtn"
										   v-model="checked"
										   v-show="relateData.relateType ==1">
									<span class="me-radio-core"></span>
								</span>
						全部
					</label>
				</div>
				<div class="m-search" v-show="relateData.relateType ==2">
					<span class="m-border">从</span> <input type="text" v-model="startStr">
					<span class="m-border p-margin">到</span> <input type="text" v-model="endStr">
					<div class="border-btn add-btn pointer" @click="onClick_searchBtn">查找</div>
				</div>
				<div class="m-number">

					<div class="p-number">
						<span>已选择商品二维码:<i class="">{{relateData.qrcodeTotalCount}}</i>个</span>
						<span>不可使用数量:<i>{{unabledQRcodeNum}}</i>个</span>
					</div>
					<div class="p-number">
						<span class="choose">有<i>{{relatedCount}}</i>个二维码已关联活动</span>
							<span class="choose choose1"> 是否覆盖:
								<label :class="{'checked':relateData.coverFlag==1}" class="pointer label">
									<span class="me-radio p-margin">
										<input class=" me-radio-input" type="radio" value="1" name="cover"
											   v-model="relateData.coverFlag">
										<span class="me-radio-core p-margin"></span>
									</span>
										是
								</label>
								<label :class="{'checked':relateData.coverFlag==2}" class="pointer label">
									<span class="me-radio p-margin">
										<input class=" me-radio-input" type="radio" value="2" name="cover"
											   v-model="relateData.coverFlag">
										<span class="me-radio-core p-margin"></span>
									</span>
									否
								</label>
							</span>
					</div>
				</div>
				<div class="line"></div>
				<div class="total">总<span>{{currentCodeNum}}</span>个有效商品二维码</div>
			</div>
			<div class="m-title">
				<div class="pointer bg-btn pay-button" @click="onClick_contactBtn">关联</div>
			</div>
		</div>

	</div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
	import g from './../../global';
	export default{
		data(){
			return {
				g: g,
				activityName: "请选择活动",
				contactList: [],
				checked: false,
				unabledQRcodeNum: 0,
				currentCodeNum: 0,
				relatedCount: 0,
				isShow_activityList: false,
				startStr: "",
				endStr: "",
				relateData: {
					'activityId': -1,
					'relateType': 1,
					'qrcodeTotalCount': 0,
					'coverFlag': 1
				}
			}
		},
		props: {
			activityNameList: {
				type: Array
			},
			relateBatchList: {
				type: Array
			}
		},
		watch: {
			type($val){
				this.initData($val)
			},
			contactList($val){
				this.relateData.qrcodeTotalCount = 0;
				this.unabledQRcodeNum = 0;
				this.currentCodeNum = 0;
				for (var i = 0; i < $val.length; i++)
				{
					var currnetBatch = g.data.batchPool.getDataById($val[i]);
					this.relateData.qrcodeTotalCount += currnetBatch.qrcodeCount;
					this.unabledQRcodeNum += currnetBatch.unabledCount;
					this.currentCodeNum += currnetBatch.usableCount;
					this.relatedCount += currnetBatch.relatedCount;
				}
				if (this.contactList.length == this.relateBatchList.length)
				{
					this.checked = true;
				}
				else
				{
					this.checked = false;
				}
			}
		},
		computed: {
			type(){
				return this.relateData.relateType
			}
		},
		methods: {
			initData($val){
				if ($val == 2)
				{
					this.contactList = [];
				}
				else if ($val == 1)
				{
					this.startStr = "";
					this.endStr = "";
				}
				this.relateData.qrcodeTotalCount = 0;
				this.unabledQRcodeNum = 0;
				this.currentCodeNum = 0;
				this.relatedCount = 0;
			},
			onClick_checkAllBtn(){
				this.contactList = [];
				if (this.checked)
				{
					this.relateBatchList.forEach((item)=>
					{
						this.contactList.push(item.id)
					})
				}
			},
			onClick_contactBtn(){
				if (this.relateData.activityId == -1)
				{
					g.ui.toast('请选择关联活动');
					return
				}
				if (this.relateData.relateType == 1)
				{
					if (this.currentCodeNum == 0)
					{
						g.ui.toast('请选择关联的红包批次');
						return
					}
				}
				else
				{
					if (!this.startStr || !this.endStr)
					{
						g.ui.toast("请填写二维码编码范围");
						return
					}
				}

				this.onPost_relateActivity();
			},
			onPost_relateActivity(){
				var exportedCount = g.data.qrcodePool.exportedCount;
				this.onUpdata_relateParam();
				g.net.call("qrcode/relateActivity", this.relateData).then(($data)=>
				{
					var num = Number(exportedCount) - Number(this.currentCodeNum);
					g.data.qrcodePool.update({
						'exportedQrcode': num
					});
					g.ui.toast('关联成功');
					this.initData(this.relateData.relateType);
					this.$emit('change');
					this.$emit('click');
				}, (err) =>
				{
					g.func.dealErr(err)
				});
			},
			onUpdata_relateParam(){
				if (this.relateData.relateType == 1)
				{
					this.relateData.batchIdList = this.contactList.join(",");
				}
				else
				{
					this.relateData.startQrcodeId = this.startStr;
					this.relateData.endQrcodeId = this.endStr;
				}
			},
			onClick_closeBtn(){
				this.$emit('click');
				this.initData();
			},
			onClick_addBtn(){
				g.url = ("/addactivity")
			},
			onClick_searchBtn(){
				if (!this.startStr || !this.endStr)
				{
					g.ui.toast("请填写二维码编码范围");
					return
				}
				g.net.call("qrcode/startEndQrCodeQuery", {
					"startQrcodeId": this.startStr,
					"endQrcodeId": this.endStr
				}).then(($data)=>
				{
					this.relateData.qrcodeTotalCount = $data.totalQrcodeCount;
					this.unabledQRcodeNum = $data.unusableQrcodeCount;
					this.currentCodeNum = $data.useableQrcodeCount;
				}, (err) =>
				{
					g.func.dealErr(err)
				});
			},
			onClick_activityBtn(){
				if (this.isShow_activityList)
				{
					this.isShow_activityList = false;
				}
				else
				{
					this.isShow_activityList = true;
				}
			},
			onClick_activityItem($id, $name){
				this.activityName = $name;
				this.relateData.activityId = $id;
				this.isShow_activityList = false;
			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop.scss";

	.relate-type {
		display: inline-block;
		width: 20%
	}
</style>

