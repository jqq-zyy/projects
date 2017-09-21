<template>
	<div class="out-box relative" :class="inlineBorder?'out-box-border':''" ref="scrollCon"
		 :style="{height:boxHeight+'px',width:boxWidth+'px'}">
		<div class="table-header header-vertical body-row"
			 :style="{height:headerHeight+'px',top:offsetTop+'px',width:getTypeWidth('total')+'px'}">
			<div class="left-header"
				 :style="{left:Math.min(offsetLeft-6,getScrollLimit())+'px',width:getTypeWidth('left')+'px'}">
				<div class="header-row">
					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkLeftHeader(item,index)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>

			<div class="middle-header"
				 :style="{width:getTypeWidth('middle')+'px',left:getTypeWidth('left')+'px',height:headerHeight+'px'}">
				<div class="header-row">

					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkMiddleHeader(item,index)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>

			<div class="right-header"
				 :style="{right:Math.max(getScrollLimit()-offsetLeft+6,0)+'px',width:getTypeWidth('right')+'px',height:headerHeight+'px'}">
				<div class="header-row">
					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkRightHeader(item,index)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
		</div>


		<div class="body" :style="{width:getTypeWidth('total')+'px',height:bodyHeight+'px'}">
			<div class="left-table-body"
				 :style="{left:Math.min(offsetLeft-6,getScrollLimit())+'px',width:getTypeWidth('left')+'px'}">
				<div class="body-row" v-for="item in tableData.body"

					 :style="{height: eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item" v-if="checkLeftBody(key,index)"
						 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'">
								<hw-btn :text="value.name" @click="onClick_itemBtn(value.id,item.id)">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>


			<div class="middle-table-body" :style="{width:getTypeWidth('middle')+'px',left:getTypeWidth('left')+'px'}">
				<div class="body-row" v-for="item in tableData.body"
					 :style="{height: eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item"
						 v-if="checkMiddleBody(key,index)"
						 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
						<span v-if="key==='btn'">
							<hw-btn :text="value.name" @click="onClick_itemBtn(value.id,item.id)">
							</hw-btn>
						</span>
					</div>
				</div>
			</div>

			<div class="right-table-body"
				 :style="{right:Math.max(getScrollLimit()-offsetLeft+6,0)+'px',width:getTypeWidth('right')+'px'}">
				<div class="body-row" v-for="item in tableData.body"
					 :style="{height:eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item"
						 v-if="checkRightBody(key,index)"
						 :style="{width: getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'">
								<hw-btn :text="value.name" @click="onClick_itemBtn(value.id,item.id)">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
	let flag = true, _lastTop = 0, _lastLeft = 0;
	export default{
		name: "hw-table",
		created(){
			this.tableData = this.data;
			trace('this.tableData', this.data);
			this.$nextTick(() =>
			{
				this.$refs.scrollCon.addEventListener('scroll', (e) =>
				{
//					this.direction = getDirection(e);
					this.offsetLeft = this.$refs.scrollCon.scrollLeft;
					this.offsetTop = this.$refs.scrollCon.scrollTop;
				});
			})
		},
		data(){
			return {
				tableData: {},
				count: 1,
//				direction: "vertical",
				offsetLeft: 0,
				offsetTop: 0,
			}
		},
		props: {
			data: {
				type: Object,
				default: function ()
				{
					return {}
				}
			},
			boxWidth: {
				type: Number,
				default: 1250
			},
			boxHeight: {
				type: Number,
				default: 350
			},
			headerHeight: {
				type: Number,
				default: 50
			},
			bodyHeight: {
				type: Number,
				default: 300
			},
			fixHeader: {
				type: Boolean,
				default: false
			},
			leftFixedCols: {
				type: Number,
				default: 0
			},
			rightFixedCols: {
				type: Number,
				default: 0
			},
			eachRowHeight: {
				type: Number
			},
			eachColWidth: {
				type: Number
			},
			inlineBorder: {
				type: Boolean,
				default: true
			},
			stripe: {
				type: Boolean,
				default: false
			}

		},
		computed: {},
		methods: {
			checkMiddleHeader($item, index)
			{
				return $item.id != 'id' && index > this.leftFixedCols && index <= (this.getValidLength() -
						this.rightFixedCols)
			},
			checkLeftHeader($item, index)
			{
				return $item.id != 'id' && index <= this.leftFixedCols;
			},
			checkRightHeader($item, index)
			{
				return $item.id != 'id' && index > (this.getValidLength() - this.rightFixedCols)
			},
			checkMiddleBody(key, index)
			{
				return key != 'id' && index > this.leftFixedCols && index <= (this.getValidLength() -
						this.rightFixedCols)
			},
			checkLeftBody(key, index)
			{
				return key != 'id' && index <= this.leftFixedCols
			},
			checkRightBody(key, index)
			{
				return key != 'id' && index > (this.getValidLength() - this.rightFixedCols)
			},
			onClick_headItem($item)
			{

				if ($item.supportSort)
				{
					if (flag)
					{
						this.tableData.body = this.tableData.body.sort(function (a, b)
						{
							return a[$item.id] - b[$item.id]
						})
						flag = false;
					}
					else
					{
						this.tableData.body = this.tableData.body.sort(function (a, b)
						{
							return b[$item.id] - a[$item.id];
						});
						flag = true;
					}

				}
				this.$emit('sort', this.tableData.body);
			},
			onClick_itemBtn($btnId, $itemId)
			{
				this.$emit('clickBtn', $btnId, $itemId)
			},
			getWidth($item)
			{
				return $item.width ? $item.width : this.eachColWidth;
			},
			getName($item)
			{
				return $item.name ? $item.name : $item;
			},
			getTypeWidth($type)
			{
				let width = 0;
				const tmpArr = this.tableData.header.concat();
				for (var item of tmpArr)
				{
					if (item.id == 'id')
					{
						tmpArr.length--
					}
				}
				let start, end;
				if ($type == 'total')
				{
					start = 0, end = tmpArr.length;
				}
				else if ($type == 'left')
				{
					start = 0, end = this.leftFixedCols;
				}
				else if ($type == 'middle')
				{
					start = this.leftFixedCols, end = tmpArr.length - this.rightFixedCols;
				}
				else
				{
					start = tmpArr.length - this.rightFixedCols , end = tmpArr.length;
				}

				if (this.eachColWidth)
				{
					for (var i = start; i < end; i++)
					{
						if (tmpArr[i].width)
						{
							width += int(tmpArr[i].width);
						}
						else
						{
							width += int(this.eachColWidth);
						}
					}
				}
				return width;
			},
			getValidLength()
			{
				const tmpArr = this.tableData.header.concat();
				for (var item of tmpArr)
				{
					if (item.id == 'id')
					{
						tmpArr.length--
					}
				}
				return tmpArr.length;
			},
			getScrollLimit()
			{
				const width = this.getTypeWidth('total');
				return width - this.boxWidth;
			},
			getRightLimit()
			{

			},
			isEven($index)
			{
				return $index % 2 == 0;
			}
		},

	};

	function getDirection(e)
	{
		var offsetTop = e.target.scrollTop - _lastTop;
		var offsetLeft = e.target.scrollLeft - _lastLeft;

		_lastTop = e.target.scrollTop;
		_lastLeft = e.target.scrollLeft;

		if (offsetTop != 0 || offsetLeft == 0)
		{
			return "vertical";
		}
		return "horizontal";
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	* {
		margin: 0;
		padding: 0;
	}

	.out-box {
		font-size: 14px;
		overflow: auto;
		border: 1px solid #444444;
	}

	.table-header, .body {
		white-space: nowrap;
		position: relative;
	}

	.table-header {
		z-index: 1000;
		box-shadow: 0px 3px 3px #999999;
	}

	.body {
		z-index: 995;
	}

	.left-table-body,
	.left-header {
		z-index: 999;
		box-shadow: -2px 1px 4px #999999;
		/*background-color: #ffff00 !important;*/
	}

	.right-table-body,
	.right-header {
		z-index: 999;
		box-shadow: -2px 1px 4px #999999;
		/*background-color: #ff3300 !important;*/
	}

	.left-header,
	.middle-header,
	.right-header {
		white-space: nowrap;
	}

	.middle-header {
		z-index: 998;
	}

	.middle-table-body {
		z-index: 990;
	}

	.body-col, .header-col {
		display: inline-block;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.absolute {
		position: absolute;
		top: 0;
		left: 0;
	}

	.relative {
		position: relative;
	}

	.header-vertical {
		background-color: #ffffff;
		position: relative;
	}

	.fixed-left {
		position: absolute;
		left: 0;
	}

	.left-table-body, .middle-table-body, .left-header, .middle-header, .right-header, .right-table-body {
		position: absolute;
		top: 0;
		background-color: #ffffff;
	}

	.left-table-body, .left-header {
		left: 0;
	}

	.body-row {
		white-space: nowrap;
		position: relative;
		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
		display: -moz-box; /* Firefox 17- */
		display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
		display: -moz-flex; /* Firefox 18+ */
		display: -ms-flexbox; /* IE 10 */
		display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
		flex-direction: row;
		-webkit-box-orient: horizontal;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}

	.out-box-border .body-col, .out-box-border .header-col {
		border: 1px solid #444444;
		border-right-color: transparent;
		border-bottom-color: transparent;
	}
</style>


<!-- display  宽高-->
<!-- header body  高度-->
<!--固定列数 左固定 右固定-->
<!--每列的宽度 定宽 和限宽 -->
<!--每列的宽度 定高 和限高 -->
<!--数据格式 -->

<!--boxWidth-->
<!--boxHeight-->
<!--headerHeight-->
<!--bodyHeight-->


<!--fixHeader-->
<!--leftFixedCol-->
<!--rightFixedCol-->

<!--eachColHeight-->
<!--eachColWidth-->

<!--inlineBorder-->
<!--stripe-->


<!--headerItem：{-->
<!--allSupported-->
<!--}-->

<!--bodyItem:{-->
<!--width:-->
<!--height:-->
<!--}-->




