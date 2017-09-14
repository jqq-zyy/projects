<template>
	<div class="laydate-box" v-show="value">
		<div class="laydate-top" :class="mainColor">
			<div class="laydate-ym">
				<div @click="onClick_dateSelect('Year')" class="laydate-year">
					<i class="prev triangle year-prev" @click.stop="onClick_prevBtn('year')">
					</i>
					<span class="laydate-date-year">{{date.year}}年 </span>
					<i class="next triangle year-next" @click.stop="onClick_nextBtn('year')">
					</i>
				</div>
				<div class="laydate-sety" v-show="pops.isShowYear">
					<div class="laydate-hmsno ">
						<p v-for="yearNo in yearList" @click="onClick_detailDate('year',yearNo)"
						   class="year-num" :class="date.year==yearNo? mainColor:''">{{yearNo}}年</p>
					</div>
				</div>
			</div>
			<div class="laydate-ym">
				<div @click="onClick_dateSelect('Month')" class="laydate-month">
					<i class="prev triangle year-prev" @click.stop="onClick_prevBtn('month')">
					</i>
					<span class="laydate-date-month">{{date.month}}月</span>
					<i class="next triangle year-next" @click.stop="onClick_nextBtn('month')">
					</i>
				</div>
			</div>
		</div>
		<div class="laydate-setm" v-show="pops.isShowMonth">
			<ul class="ymdropul ">
				<li v-for="n in 12" :class="date.month==n? mainColor:''" @click="onClick_detailDate('month',n)"
					class="month-num">{{n|addZero}}月
				</li>
			</ul>
		</div>
		<table class="laydate-table">
			<thead>
			<tr>
				<th>日</th>
				<th>一</th>
				<th>二</th>
				<th>三</th>
				<th>四</th>
				<th>五</th>
				<th>六</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="n in weekNum">
				<td v-for="item in dateList.list.slice((n-1)*7,n*7)"
					:class="[date.day==item[2]&&date.month==(item[1]+1)&&date.year==item[0]? mainColor :'', checkDisable(item)?'date-disabled':'cursor','']"
					@click.stop="onClick_dayDate(item)">{{item[2]}}
				</td>
			</tr>
			</tbody>
		</table>
		<div v-if="type==='hour'" class="laydate-bottom">
			<div class="bot-flex">
				<ul class="laydate-hms">
					<li @click="onClick_dateSelect('Hour')"><em>{{date.hour}}</em> <i>:</i></li>
					<li @click="onClick_dateSelect('Minute')"><em>{{date.minute}}</em><i>:</i></li>
					<li @click="onClick_dateSelect('Second')"><em>{{date.second}}</em></li>

				</ul>
			</div>
			<div class="bot-flex laydate-btn">
				<span @click="onClick_okBtn" :class="mainColor">确认</span>
				<span @click="onClick_todayBtn" :class="mainColor">今天</span>
				<span @click="onClick_clearBtn" :class="mainColor">清空</span>
			</div>
		</div>
		<div class="laydate-prop-hms laydate-props">
			<div class="laydate-propcon" v-if="pops.isShowHour">
				<div class="laydate-hms-title">小时
					<div class="laydate-hms-close" @click="onClick_dateSelect('Hour')">×</div>
				</div>
				<div class="laydate-hmsnox">
					<p class="hour-num" v-for="n in 24" @click="onClick_detailDate('hour',(n-1))"
					   :class="n-1==date.hour? mainColor:''">{{n-1
						|addZero}}</p>
				</div>
			</div>
			<div class="laydate-propcon" v-if="pops.isShowMinute">
				<div class="laydate-hms-title">分钟
					<div class="laydate-hms-close" @click="onClick_dateSelect('Minute')">×</div>
				</div>
				<div class="laydate-hmsnox">
					<p v-for="n in 60" @click="onClick_detailDate('minute',(n-1))"
					   :class="n-1==date.minute? mainColor:''">{{n-1|addZero}}</p>
				</div>
			</div>
			<div class="laydate-propcon" v-if="pops.isShowSecond">
				<div class="laydate-hms-title">秒数
					<div class="laydate-hms-close" @click="onClick_dateSelect('Second')">×</div>
				</div>
				<div class="laydate-hmsnox">
					<p v-for="n in 60"
					   @click="onClick_detailDate('second',(n-1))" :class="n-1==date.second? mainColor:''">
						{{n-1|addZero}}</p>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../../../global';
	import * as func from './../../../js/func'
	var _showList = ["Year", "Month", 'Hour', 'Minute', 'Second'];
	var _startYear, _endYear, _endMonth;
	const prefixCls = 'hw-date';
	export default {
		name: "hw-date",
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				pops: {},
				date: {},
				currMonth: 0,
				yearList: [],
				isShowDatePicker: this.value
			}
		},
		filters: {
			addZero: (data)=>
			{
				return data < 10 ? "0" + data : data;
			},
		},

		props: {
			type: {
				type: String,
				validator($val)
				{
					return func.oneOf($val, ['date', 'hour'])
				}
			},
			hasBorder: {
				type: Boolean,
				default: false
			},
			startTime: {
				type: Number,
				default: 1279555200000
			},
			endTime: {
				type: Number,
				default: Date.now()
			},
			value: {
				type: Boolean,
				default: true
			},
			mainColor: {
				type: String,
				default: 'color-primary'
			}

		},
		computed: {
			weekNum: function ()
			{
				if (this.dateList.list)
				{
					return this.dateList.list.length / 7;
				}
			},
			dateList()
			{
				return g.timeTool.getMonthByOffset(this.currMonth);
			},
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`, `${prefixCls}-wrap-${this.skin}`, {
						[`${prefixCls}-wrap-border}`]: this.hasBorder
					}
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}-inner`, `${prefixCls}-inner-${this.skin}`, {
						[`${prefixCls}-inner-border}`]: this.hasBorder
					}
				]
			},
		},
		methods: {
			init(){
				_startYear = parseInt(g.timeTool.getDateArray(this.startTime)[0]);
				_endYear = parseInt(g.timeTool.getDateArray(this.endTime)[0]);
				_endMonth = parseInt(g.timeTool.getDateArray(this.endTime)[1]);
				for (var i = _startYear; i <= _endYear; i++)
				{
					this.yearList.push(i);
				}
				this.initPops();
				this.onClick_clearBtn();
			},
			initPops()
			{
				this.pops = {
					isShowYear: false,
					isShowMonth: false,
					isShowHour: false,
					isShowMinute: false,
					isShowSecond: false
				}
			},
			onClick_dateSelect($type)
			{
				if ($type)
				{
					if (this.pops["isShow" + $type] == true)
					{
						this.pops["isShow" + $type] = false;
					}
					else
					{
						this.pops["isShow" + $type] = true
					}
					var copyShows = _showList.concat();
					var index = copyShows.indexOf($type);
					copyShows.splice(index, 1);
					for (var showItem of copyShows)
					{
						this.pops["isShow" + showItem] = false;
					}
				}
			},
			onClick_detailDate($type, $num)
			{
				if ($type)
				{
					var type = $type.substr(0, 1).toUpperCase() + $type.substr(1);
					this.onClick_dateSelect(type);
					this.chooseDate($type, $num);
				}
			},
			chooseDate($type, $num)
			{
				this.date[$type] = this.addZero($num);
				if ($type == "month")
				{
					var nowMonth = new Date().getMonth() + 1;
					var monthNum = this.checkValid("month", $num);
					if (monthNum)
					{
						this.currMonth = int($num - nowMonth);
					}
					else
					{
						this.currMonth = 0;
						this.date.month = this.addZero(nowMonth);
					}
				}
			},
			onClick_dayDate($item)
			{
				trace($item);
				this.date.day = this.addZero($item[2]);
				this.date.month = this.addZero($item[1] + 1);
				this.date.year = $item[0];
				if (this.type === 'date')
				{
					this.onClick_okBtn();
				}
			},
			onClick_clearBtn()
			{
				this.date = {
					year: '',
					month: '',
					day: '',
					hour: '00',
					minute: '00',
					second: '00'
				};
				var date = new Date();
				this.date.year = date.getFullYear();
				this.date.month = this.addZero(date.getMonth() + 1);
				this.date.day = this.addZero(date.getDate());
				this.initPops();
				this.$forceUpdate();
			},
			onClick_todayBtn()
			{
				var now = Date.now();
				var dateArr = g.timeTool.getFullDateArray(now, true);
				this.date = {
					year: dateArr[0],
					month: dateArr[1],
					day: dateArr[2],
					hour: dateArr[3],
					minute: dateArr[4],
					second: dateArr[5]
				};
				this.onClick_okBtn();
			},
			onClick_okBtn()
			{
				this.initPops();
				var timeStamp = this.getTimeStamp();
				this.$emit('input', false);
				this.$emit('change', timeStamp);
			},
			onClick_prevBtn($type)
			{
				if ($type == "year")
				{
					var year = int(this.date.year);
					year--;
					var newYear = this.checkValid("year", year);
					if (newYear)
					{
						this.chooseDate($type, newYear);
					}
				}
				else
				{
					var month = int(this.date.month);
					month--;
					var newMonth = this.checkValid("month", month);
					if (newMonth)
					{
						this.chooseDate($type, newMonth);
					}
				}
			},
			onClick_nextBtn($type)
			{
				if ($type == "year")
				{
					var year = int(this.date.year);
					year++;
					var newYear = this.checkValid("year", year);
					if (newYear)
					{
						this.chooseDate($type, newYear);
					}
				}
				else
				{
					var month = int(this.date.month);
					month++;
					var newMonth = this.checkValid("month", month);
					if (newMonth)
					{
						this.chooseDate($type, newMonth);
					}
				}
			},
			checkDisable(item)
			{
				return this.dateToTime(item) > this.endTime || this.dateToTime(item) < this.startTime || ( (item[1] + 1) !=
						this.date.month);
			},

			checkToday(item)
			{
				return this.dateList.nowYear == item[0] && this.dateList.nowDate == item[2] && this.dateList.nowMonth == item[1];
			},
			dateToTime($date){
				return new Date($date[0], $date[1], $date[2]).getTime();
			},
			addZero($num)
			{
				return int($num) > 9 ? $num : "0" + $num;
			},
			getTimeStamp()
			{
				var date = {};
				var arr = [];
				for (var key in this.date)
				{
					date[key] = int(this.date[key])
				}
				var dateArr = [date.year, date.month, date.day];
				var dateStamp = int(new Date(dateArr).getTime() / 1000);
				var stamp = dateStamp + date.hour * 60 * 60 + date.minute * 60 + date.second;
				return stamp;
			},
			checkValid($type, $num)
			{
				if ($type == "year")
				{
					if ($num <= _endYear && $num >= _startYear)
					{
						return $num
					}
					return false;
				}
				else
				{
					if (this.date.year > _endYear)
					{
						return false;
					}
					else if (this.date.year == _endYear)
					{
						if ($num > _endMonth)
						{
							return false;
						}
						else
						{
							return $num;
						}
					}
					else
					{
						if ($num <= 12 && $num > 0)
						{
							return $num;
						}
					}
				}
			}
		}
	}
</script>
<style lang="sass" type="text/css" rel="stylesheet/scss" scoped>
	@import "./date.scss";
</style>
