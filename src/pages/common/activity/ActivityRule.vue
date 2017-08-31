<template>
	<div class="border-box">
		<div class="rule border">
			<span class="activity-title">活动名称:</span>
			<input type="text" class="input-activity" v-model="infoObj.activityName">
			<span class="rule-tip">*用于内部记录，消费者不可见</span>
		</div>
		<div class="set-time-body" v-if="status">
			<div class="set-date">
				<span class="start-time">开始时间</span>
				<div class="date-from" v-show="status==1||status==2">
					<input type="text" class="startTime" v-model="date.startTimeStr" readonly="true"
						   @click.stop="onClick_showCalendar('start')">
					<calendar @click="onClick_chooseDateStart" v-show="isShowStartTime"
							  class="drop-time"
							  ref="timeBox"></calendar>
				</div>
				<div class="data-form" v-show="status==3||status==4||status==5">{{date.startTimeStr}}</div>
				<div class="clearfix"></div>
			</div>
			<div class="set-date">
				<span class="start-time">结束时间</span>
				<div class="date-from" v-show="status!=5">
					<input type="text" class="endTime" v-model="date.endTimeStr"
						   readonly="true" @click.stop="onClick_showCalendar('end')">
					<calendar @click="onClick_chooseDateEnd" v-show="isShowEndTime"
							  class="drop-time" :startTime="date.startTime"></calendar>
				</div>
				<div class="data-form" v-show="status==5">{{date.endTimeStr}}</div>
			</div>
		</div>
		<div class="rule border">
			<span class="activity-title">红包规则设定:</span>
			<label class="label">
					<span class="me-radio">
						<input class="me-radio-input" type="checkbox" v-model="infoObj.isPlatformReward">
						<span class="me-radio-core m-check"></span>
					</span>
				<span>接受平台红包加成</span>
			</label>
			<span class="note">*试用账号无平台红包赠送</span>
			<span class="activity-tip">平台红包加成：喜鹊红包平台会在每个红包金额的基础上额外送与消费者 <i>“0.01 ～1.00”</i>(运营后台可编辑) 元不等的优惠红包</span>
		</div>
		<div class="bag-set rule">
			<div class="activity-title">基础红包设定:</div>
			<div class="bag-type-box frame bag-choose">
				<label>
					<span class="me-radio">
						<input class="me-radio-input" type="radio" v-model.number="infoObj.redPacType"
							   value="1" id="random">
						<span class="me-radio-core m-check"></span>
					</span>
					<span class="random">随机红包:</span>
				</label>
				<div class="bag-number">
					<input type="text" class="input-number frame" v-model="infoObj.startAmount"
						   :class="{'disabled':infoObj.redPacType !=1}"><span>~</span>
					<input type="text" class="input-number frame" v-model="infoObj.endAmount"
						   :class="{'disabled':infoObj.redPacType !=1}"><span>元/个</span>
				</div>

				<div class="bag-type">
					<span class="average">平均金额:</span>
					<input type="text" class="input-number frame" v-model="infoObj.randomAvg"
						   :class="{'disabled':infoObj.redPacType !=1}"><span>元/个</span>
					<span class="note">*平均金额相当于本次活动所有红包的均值</span>
				</div>

			</div>
			<div class="bag-type-box frame">
				<label>
					<span class="me-radio">
						<input class="me-radio-input" type="radio" v-model="infoObj.redPacType"
							   value="2" id="fixed">
						<span class="me-radio-core m-check"></span>
					</span>
					<span class="average">固定红包:</span>
				</label>
				<div class="bag-number">
					<input type="text" class="input-number frame"
						   v-model="infoObj.fixAmount" :class="{'disabled':infoObj.redPacType !=2}"><span>
						元/个</span>
				</div>
			</div>
		</div>
		<div class="activity-reward">
			<div class="reward frame">
				<div class="reward-name">
					<label>
						<span class="me-radio">
							<input class="me-radio-input" type="checkbox" name="reward" value="area"
								   v-model="infoObj.reward">
							<span class="me-radio-core"></span>
						</span>
						<span>区域奖励</span>

					</label>
<span class="add-button pointer" @click="onClick_addAreaBtn"
	  :class="{'disabled':infoObj.reward.indexOf('area')==-1}">添加区域</span>
				</div>
				<div class="member-type">
					<activity-area v-for="(item,index) in infoObj.regionRules" :index="index"
								   :regionItem="item" @change="onChange_areaReward">
					</activity-area>
				</div>
			</div>
			<div class="reward frame">
				<div class="reward-name">
					<label>
					<span class="me-radio">
						<input class="me-radio-input" type="checkbox" v-model="infoObj.reward"
							   name="reward"
							   value="member">
						<span class="me-radio-core"></span>
					</span>
						<span>会员奖励</span>

					</label>
					<span class="border-btn pointer add-member" @click="onClick_setMember">添加会员等级</span>
				</div>
				<div class="member-type">
					<p v-for="(item,index) in memberList"><span>{{item.levelName}}</span>
						<input type="number" min="1" class="frame" :value="onSet_defaultReward(item.id)"
							   @change="onChange_memberReward($event,index)"
							   :class="{'disabled':infoObj.reward.indexOf('member')==-1}">倍
					</p>
				</div>
			</div>


			<!--	<div class="explain frame">
				<p>规则说明：</p>
				银卡会员1.4倍，很厉害，金卡会员2.1倍，也很厉害，钻石就更厉害了，3倍啊，牛！
				</div>
				<div class="explain frame">
				<p>规则说明：</p>
				银卡会员1.4倍，很厉害，金卡会员2.1倍，也很厉害，钻石就更厉害了，3倍啊，牛！
				</div>-->
			<p class="rule-tip">*单个红包最高金额不得超过200元</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import RouterList from './../../../router';
	import g from './../../../global';
	import * as AppManager from './../../../js/manager/AppManager';
	import ActivityArea from './ActivityArea.vue';
	import Calendar from './../Calendar.vue';
	export default {
		created(){
			g.event.addEventListener('SAVE_ACTIVITY_RULE', this.onUpdate_rulePool);
		},
		data(){
			return {
				g: g,
				id: 0,
				memberRewardMax: 1,
				areaRewardMax: 1,
				isShowStartTime: false,
				isShowEndTime: false,
				infoObj: {
					reward: [],
					activityName: "",
					redPacType: 1,
					startAmount: 0,
					endAmount: 0,
					fixAmount: 0,
					memberRules: [],
					regionRules: [],
					randomAvg: 0,
					activityStartTime: "",
					activityEndTime: "",
					isPlatformReward: 0
				},
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				}
			}
		},
		components: {
			ActivityArea,
			Calendar
		},
		props: {
			memberList: {
				type: Array
			},
			status: {
				default: 0
			}
		},
		watch: {
			memberList(){
				this.init();

			},
			startAmount($val, $oldVal){

				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.infoObj.startAmount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.infoObj.startAmount = $oldVal;
					return
				}
				else if (this.infoObj.endAmount && $val > this.infoObj.endAmount)
				{
					this.infoObj.startAmount = $oldVal;
					return
				}
				else if ($val > 200)
				{
					this.infoObj.startAmount = $oldVal;
					return
				}
				else if (this.infoObj.randomAvg && $val > this.infoObj.randomAvg)
				{
					this.infoObj.startAmount = this.infoObj.randomAvg;
					return
				}

			},
			endAmount($val, $oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.infoObj.endAmount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.infoObj.endAmount = $oldVal;
					return
				}
				else if (this.infoObj.startAmount && $val < this.infoObj.startAmount)
				{
					this.infoObj.endAmount = $oldVal;
					return
				}
				else if ($val > 200)
				{
					this.infoObj.endAmount = $oldVal;
					return
				}
				else if (this.infoObj.randomAvg && $val < this.infoObj.randomAvg)
				{
					this.infoObj.endAmount = this.infoObj.randomAvg;
					return
				}
			},
			fixAmount($val, $oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.infoObj.fixAmount = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.infoObj.fixAmount = $oldVal;
					return
				}
				else if ($val > 200)
				{
					this.infoObj.fixAmount = $oldVal;
					return
				}
			},
			redPacType($val){
				if ($val == 1)
				{
					this.infoObj.fixAmount = 0;
				}
				else
				{
					this.infoObj.startAmount = 0;
					this.infoObj.endAmount = 0;
				}
			},
			randomAvg($val, $oldVal){
				if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 2)
				{
					this.infoObj.randomAvg = $oldVal;
					return
				}
				else if (isNaN($val) || $val < 0)
				{
					this.infoObj.randomAvg = $oldVal;
					return
				}
				else if (this.startAmount && $val < this.startAmount)
				{
					this.infoObj.randomAvg = this.startAmount;
					return
				}
				else if (this.endAmount && $val > this.endAmount)
				{
					this.infoObj.randomAvg = this.endAmount;
					return
				}
			},
			reward($val){
				if ($val.indexOf("member") != -1)
				{
					if (!this.id || this.infoObj.memberRules.length == 0)
					{
						for (var i = 0; i < this.memberList.length; i++)
						{
							var obj = {};
							if (this.memberList[i].ruleId)
							{
								obj.ruleId = this.memberList[i].ruleId

							}
							obj.rule1Id = this.memberList[i].id;
							obj.ruleType = 1;
							obj.reward = 1;
							this.infoObj.memberRules[i] = obj;

						}
					}
				}
				else
				{
					this.infoObj.memberRules = [];
				}
				if ($val.indexOf("area") == -1)
				{
					this.infoObj.regionRules = [];
				}

			}
		},
		computed: {
			startAmount(){
				return this.infoObj.startAmount
			},
			endAmount(){
				return this.infoObj.endAmount
			},
			fixAmount(){
				return this.infoObj.fixAmount
			},
			redPacType(){
				return this.infoObj.redPacType
			},
			randomAvg(){
				return this.infoObj.randomAvg
			},
			reward(){
				return this.infoObj.reward
			}

		},
		methods: {
			init(){
				this.id = g.currentRoute.query.id;
				if (this.id)
				{
					var activityRole = g.data.activityRolePool
					this.infoObj.activityName = activityRole.activityName;
					this.infoObj.redPacType = activityRole.redPacType;
					this.infoObj.isPlatformReward = activityRole.isPlatformReward;
					this.infoObj.startAmount = activityRole.startAmount;
					this.infoObj.endAmount = activityRole.endAmount;
					this.infoObj.fixAmount = activityRole.fixAmount;
					this.infoObj.randomAvg = activityRole.randomAvg;
					this.infoObj.memberRules = activityRole.memberRules;
					this.infoObj.regionRules = activityRole.regionRules.slice(0);
					if (this.infoObj.memberRules.length > 0)
					{
						this.infoObj.reward.push('member')
					}
					if (this.infoObj.regionRules.length > 0)
					{
						this.infoObj.reward.push('area')
					}

				}

				if (this.id && g.data.activityRolePool.startTime)
				{
					var start = g.data.activityRolePool.startTime;
					var end = g.data.activityRolePool.endTime;
					this.date.startTime = new Date(start).getTime() / 1000;
					this.date.endTime = new Date(end).getTime() / 1000;
				}
				else
				{
					this.date.startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond() + 86400;
					this.date.endTime = this.date.startTime + 86400;
				}
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
			},
			onChange_memberReward($event, $index){
				var reward = $event.target.value;
				if (isNaN(reward) || reward < 0)
				{
					$event.target.value = 1;
					return
				}
				this.infoObj.memberRules[$index].reward = Number(reward)
			},
			onClick_addAreaBtn(){
				this.infoObj.regionRules.push({});
			},
			onChange_areaReward($data, $index){
				this.infoObj.regionRules[$index] = $data;
			},
			onUpdate_rulePool(){
				if (this.infoObj.activityName == "")
				{
					g.ui.toast("请填写活动名称");
					return
				}
				if (this.infoObj.memberRules.length > 0 && this.infoObj.reward.indexOf('member') == -1)
				{
					g.ui.toast("请勾选会员奖励");
					return
				}
				if (this.infoObj.regionRules.length > 0 && this.infoObj.reward.indexOf('area') == -1)
				{
					g.ui.toast("请勾选区域奖励");
					return
				}
				if (this.infoObj.reward.indexOf('member') > -1)
				{
					this.onGet_memberMaxReward();
				}
				if (this.infoObj.reward.indexOf('area') > -1)
				{
					this.onGet_areaMaxReward();
				}
				if (this.infoObj.redPacType == 1)
				{

					if (this.infoObj.startAmount == 0 || this.infoObj.endAmount == 0)
					{
						g.ui.toast("请填写随机金额");
						return
					}
					else if (this.infoObj.endAmount * (this.memberRewardMax + this.areaRewardMax - 1) > 200)
					{
						g.ui.toast("总金额大于200元请调整倍率与最大金额");
						return
					}

				}
				else if (this.infoObj.redPacType == 2)
				{
					if (this.infoObj.fixAmount == 0)
					{
						g.ui.toast("请填写固定金额");
						return
					}
					else if (this.infoObj.fixAmount * (this.memberRewardMax + this.areaRewardMax - 1) > 200)
					{
						g.ui.toast("总金额大于200元请调整倍率与最大金额");
						return
					}
				}
				this.infoObj.activityStartTime = this.date.startTimeStr;
				this.infoObj.activityEndTime = this.date.endTimeStr;
				this.$emit('next');
				this.$emit('click', this.infoObj)

			},
			onGet_memberMaxReward(){
				var memberRules = this.infoObj.memberRules.slice(0);
				memberRules = memberRules.sort(function (a, b)
				{
					return b.reward - a.reward
				});
				if (memberRules[0])
				{
					this.memberRewardMax = memberRules[0].reward;
				}

			},
			onGet_areaMaxReward(){
				var regionRules = this.infoObj.regionRules.slice(0);
				regionRules = regionRules.sort(function (a, b)
				{
					return b.reward - a.reward
				});
				if (regionRules[0])
				{
					this.areaRewardMax = regionRules[0].reward;
				}
			},
			onClick_setMember(){
				g.url = ("/membermanage")
			},
			onSet_defaultReward($id){

				if (this.id)
				{
					var memberRules = this.infoObj.memberRules;
					for (var i = 0; i < memberRules.length; i++)
					{
						if ($id == memberRules[i].rule1Id)
						{
							return memberRules[i].reward;
						}
					}

				}
				return 1;
			},
			onClick_showCalendar(str){
				debugger
				if (str == 'start')
				{
					//this.startTime = 0;
					if (this.isShowStartTime)
					{
						this.isShowStartTime = false;
					}
					else
					{
						this.isShowStartTime = true;
					}
					this.isShowEndTime = false;
				}
				else
				{

					if (this.isShowEndTime)
					{
						this.isShowEndTime = false;
					}
					else
					{
						this.isShowEndTime = true;
					}
					this.isShowStartTime = false;
				}
			},
			onClick_chooseDateStart(dateArr){

				this.date.startTime = new Date(dateArr[0], dateArr[1], dateArr[2]).getTime() / 1000;
				this.date.startTimeStr = g.timeTool.getDate(this.date.startTime, true);
				if (this.date.startTime > this.date.endTime)
				{
					this.onClick_chooseDateEnd(dateArr);
				}
				this.isShowStartTime = false;
			},

			onClick_chooseDateEnd(dateArr){
				this.date.endTime = new Date(dateArr[0], dateArr[1], dateArr[2]).getTime() / 1000;
				this.date.endTimeStr = g.timeTool.getDate(this.date.endTime, true);
				if (this.date.endTime < this.date.startTime)
				{
					this.onClick_chooseDateStart(dateArr);
				}
				this.isShowEndTime = false;
			}
		},
		destroyed(){
			g.event.removeEventListener('SAVE_ACTIVITY_RULE', this.onUpdate_rulePool);
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	@import "../../../css/nav";

	.rule-line {
		margin: 15px 0;
	}

	.member-box {
		width: 300px;
	}

	.disabled {
		pointer-events: none;
		background: #eeeeee;
	}
</style>





















