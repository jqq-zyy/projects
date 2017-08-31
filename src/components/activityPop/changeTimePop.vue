<template>
	<div class="affix-box default-pos-type">
		<div class="pop-edit-password set-time-pop">
			<div class="show-close-btn">
				<img :src="g.config.path.images+'/close.png'"
					 @click="onClick_closeBtn"/>
			</div>
			<div class="step-about-tit show-recharge-tips text-center">
				{{g.lang("设定活动时间")}}
			</div>
			<div class="set-time-body">
				<div class="set-date">
					<span class="start-time">开始时间</span>
					<div class="date-from">
						<input type="text" class="startTime" v-model="date.startTimeStr" readonly="true"
							   @click.stop="onClick_showCalendar('start')">
						<calendar @click="onClick_chooseDateStart" v-show="isShowStartTime"
								  class="drop-time"
								  ref="timeBox"></calendar>
					</div>

					<div class="clearfix"></div>
				</div>
				<div class="set-date">
					<span class="start-time">结束时间</span>
					<div class="date-from">
						<input type="text" class="endTime" v-model="date.endTimeStr"
							   readonly="true" @click.stop="onClick_showCalendar('end')">
						<calendar @click="onClick_chooseDateEnd" v-show="isShowEndTime"
								  class="drop-time" :startTime="date.startTime"></calendar>
					</div>

					<div class="clearfix"></div>
				</div>
				<div class="confirm-edit-wrap">
					<a class="button cancel-btn pointer" @click="onClick_confirmBtn">{{g.lang("确认并发布")}}</a>
				</div>
			</div>

		</div>
	</div>

</template>
<style>
</style>
<script type="text/ecmascript-6">
	import g from './../../global';
	import Calendar from './../../pages/common/Calendar.vue';
	export default{
		created(){
			this.init()
		},
		data(){
			return {
				g: g,
				isShowStartTime: false,
				isShowEndTime: false,
				date: {
					startTime: 0,
					startTimeStr: "",
					endTimeStr: "",
					endTime: 0
				}
			}
		},
		components: {
			Calendar
		},
		props: {
			id: {
				default: 0
			}
		},
		watch: {},
		methods: {
			init(){
				if (this.id)
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
			onClick_closeBtn(){
				this.$emit('close');
			},
			onClick_confirmBtn(){
				this.$emit('click', this.date.startTimeStr, this.date.endTimeStr);
			},
			onClick_showCalendar(str){
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
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss">
	@import "../../css/pop";
</style>








