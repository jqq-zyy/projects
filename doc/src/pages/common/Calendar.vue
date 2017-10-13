<template>
	<div class="choose-date">
		<div class="date-title">
			<span class="forward cursor" @click.stop="onClick_arrow(-1)">&lt</span>
			<span class="month">{{dateList.month+1}}月 {{dateList.year}}</span>
			<span class="backward cursor" @click.stop="onClick_arrow(1)">&gt</span>
		</div>
		<div class="date-table">
			<table class="table">
				<thead>
				<tr>
					<td>日</td>
					<td>一</td>
					<td>二</td>
					<td>三</td>
					<td>四</td>
					<td>五</td>
					<td>六</td>
				</tr>
				</thead>
				<tbody>
				<tr v-for="n in weekNum">
					<td v-for="item in dateList.list.slice((n-1)*7,n*7)"
						:class="[checkToday(item) ? 'date-active' :'',checkBefore(item)?'disabled':'']"
						@click.stop="onClick_td(item)" :ref="parseInt(item.join(''))">{{item[2]}}
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import g from './../../global';
	//	var _startTime = 0;
	//	var _currMonth = -1;

	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				dateList: {
					list: [],
					month: 0,
					year: 0
				},
				_startTime: 0,
				_currMonth: -1,
				currMonth: 0
			}
		},
		props: {
			startTime: {
				default: 0
			},
			endTime: {
				type: Number,
				default: int(Date.now()/1000)
			},
			isCanBefore:{
				type:Boolean
			}
		},
//		updated(){
//			this.init();
//		},
		computed: {
			weekNum: function ()
			{
				return this.dateList.list.length / 7;
			}
		},
		methods: {
			init()
			{
				if (this._startTime != this.startTime || this._startTime == 0)
				{
					var a = g.timeTool.getDateArray(this.startTime);
					var b = g.timeTool.getDateArray(this._startTime);
					a.pop();
					b.pop();
					if (a[0] != b[0] || a[1] != b[1])
					{
						this.currMonth += a[0] * 12 + a[1] - b[0] * 12 - b[1];
					}
					this._startTime = this.startTime;
				}

				if (this._currMonth != this.currMonth || this._currMonth == -1)
				{
					this._currMonth = this.currMonth;
					this.dateList = g.timeTool.getMonthByOffset(this.currMonth);
				}
			},
			checkDisable(item)
			{
				return this.dateToTime(item) > this.endTime || this.dateToTime(item) < this.startTime;
			},
			checkToday(item)
			{
				return this.dateList.nowYear == item[0] && this.dateList.nowDate == item[2] && this.dateList.nowMonth == item[1];
			},
			checkBefore(item){
				if(this.isCanBefore){
					return false;
				}
				return this.dateToTime(item)<(g.timeTool.getNowStamp() - g.timeTool.getPastSecond()+86400);
			},
			onClick_arrow(num)
			{
				this.currMonth += num;
				this.init();
			},
			onClick_td($dateArr)
			{
				this.$emit("click", $dateArr);
			},
			dateToTime($date){
				return (new Date($date[0], $date[1], $date[2]).getTime())/1000;
			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css" scoped>
	.choose-date {
		position: absolute;
		width: 238px;
		height: auto;
		border: 1px solid #efefef;
		box-shadow: 0 0 3px #f4f4f4;
		border-radius: 5px;
		left: 90px;
		margin-left: -90px;
		top: 100%;
		color: #000000;
		background: #ffffff;
		z-index: 10;
		padding: 10px;
		.date-title {
			display: flex;
			height: 30px;
			line-height: 30px;
			flex-direction: row;
			.forward, .backward {
				width: 30px;
				text-align: center;
			}
			.month {
				flex: 1;
				text-align: center;
			}

		}
		.date-table {
			.table {
				thead tr{
					float: left;
				}
				thead tr td {
					width: 30px;
					height: 30px;
					line-height: 30px;
					margin: 2px;
					text-align: center;
					float: left;
				}
				tbody tr {
					height: 30px;
					float: left;
					td {
						width: 30px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						margin: 2px;
						border-radius: 50%;
						float: left;
					}

					td:hover {
						background: #01aaef;
						border-radius: 50%;
						color: #fff;
					}

					.date-active {
						background: #01aaef;
						color: #fff;
						border-radius: 50%;
					}

				}

			}
		}
		.disabled {
			pointer-events: none;
			cursor: default;
			color: #ddd;
			border-radius: 5px;
		}
		.disabled:hover {
			background: #aaaaaa !important;
			cursor: default;
		}
		.cursor {
			cursor: pointer;
			color: #000000;
		}
	}

</style>



