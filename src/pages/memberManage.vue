<template>
	<main-layout :isLoad="isLoad">
		<div slot="content" class="content-box">
			<div class="admin-main-wrap">
				<common-nav :nav="'member'"></common-nav>
				<div class="right-content-wrap">
					<common-top-nav></common-top-nav>
					<div class="admin-data-items">
						<!--<div class="right-header">-->
						<!--我的顾客会员-->
						<!--<span class="activity-total">(共<i>{{memberCount}}</i>个会员)</span>-->
						<!--</div>-->
						<div class="right-body ">
							<p class="member-title g-title">会员设置 <span>会员等级设置</span></p>
							<div class=" member-manage">
								<div class="col-4"  v-for="(item,index) in memberList">
									<div class="level-panel panel-choosed">
										<img :src="g.config.path.images+'/close2.png'" alt="" class="icon-close pointer">
										<div class="panel-heading">Lv.{{index}}</div>
										<div class="panel-body">
											<p>等级名称：<span>{{item.levelName}}</span></p>
											<p>等级门槛：<span>{{item.levelSill}}</span></p>
											<span class="edit-button pointer"
												  @click="onClick_editBtn(item.id)">编辑</span>
										</div>
									</div>
								</div>
								<div class="col-4">
									<div class="level-panel add-panel pointer" @click="onClick_addBtn">
										<!--<img :src="g.config.path.images+'/upload.png'" alt="">-->
										<p>添加新等级</p>
										<p>
											<span class="h-line"></span>
											<span class="v-line"></span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<common-footer></common-footer>
					</div>
					<transition name="bounce">
						<div class="affix-box default-pos-type" v-show="isShow_addPop">
							<div class="pop-edit-password pop-edit">
								<div class="show-close-btn">
									<img :src="g.config.path.images+'/close.png'"
										 @click="onClick_closeBtn" />
								</div>
								<div class="pop-tit">
									添加等级
								</div>
								<div class="pop-body">
									<div class="m-title m-level"><span class="title">等级名称:</span>
										<input type="text" placeholder="请输入等级名称" v-model="name"></div>
									<div class="m-title m-level"><span class="title">等级门槛:累计输入</span>
										<input class="sum-input" type="text" placeholder="请输入累计领红包次数" v-model="sill">次

									</div>
									<div class="m-title">
										<span class="save-button pointer bg-btn" @click="onClick_saveModBtn">保存修改</span>
									</div>
								</div>

							</div>
						</div>
					</transition>
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
			this.memberList = g.data.memberPool.list;
			this.memberCount = g.data.memberPool.memberCount;
			this.isLoad = true;
		},
		data(){
			return {
				isLoad: false,
				isShow_addPop: false,
				g: g,
				memberList: [],
				memberCount: 0,
				name: "",
				sill: "",
				levelId: ""
			}
		},
		watch: {
			sill($val, $oldVal){
				if ($val.toString().indexOf(".") > 0)
				{
					this.unitCount = $oldVal;
				}
				else if (isNaN($val) || $val < 0)
				{
					this.unitCount = $oldVal;
				}
			}
		},
		components: {
			MainLayout,
			CommonNav,
			CommonTopNav,
			CommonFooter
		},
		methods: {
			onClick_addBtn(){
				this.levelId = "";
				this.isShow_addPop = true;
				this.name = "";
				this.sill = "";
			},
			onClick_saveModBtn(){
				g.net.call("memberLevel/publish", {
					"levelId": this.levelId,
					"levelName": this.name,
					"levelSill": this.sill
				}).then(($data) =>
				{
					if (this.levelId)
					{
						g.data.memberPool.getDataById(this.levelId).update({
							"levelName": this.name,
							"levelSill": this.sill
						});
					}
					else
					{
						g.data.memberPool.add($data);
					}
					this.memberList = g.data.memberPool.list;

					this.isShow_addPop = false;
				}, (err) =>
				{
					g.func.dealErr(err);
				});

			},
			onClick_editBtn($id){
				this.levelId = $id;
				this.isShow_addPop = true;
				var memberObj = g.data.memberPool.getDataById($id);
				this.name = memberObj.levelName;
				this.sill = memberObj.levelSill;
			},
			onClick_closeBtn(){
				this.isShow_addPop = false;
			}
		}
	}
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../css/common.scss";
	@import "../css/membeManage.scss";
	@import "../css/pop.scss";
</style>





