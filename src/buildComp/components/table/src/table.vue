<template>
	<div class="out-box relative" :class="[inlineBorder?'out-box-border':'']"
		 ref="scrollCon"
		 :style="{height:boxHeight +'px',width:boxWidth+'px'}">
		<!--<div class="content-box1" style="height: 700px;"></div>-->
		<div class="header header-vertical body-row"
			 :style="{height:headerHeight+'px',top:Math.min(offsetTop,topLimit)-6+'px',width:getTypeWidth('total')+6+'px'}">
			<div class="left-header"
				 :style="{left:Math.min(offsetLeft,getScrollLimit())+'px',width:getTypeWidth('left')+'px'}">
				<div class="header-row" :style="{height:headerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"

						 v-if="checkLeftHeader(item,index)">
						<span>{{item.name}}</span>
						<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
								 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
						></hw-icon>
					</div>
				</div>
			</div>

			<div class="middle-header"
				 :style="{width:getTypeWidth('middle')+'px',left:getTypeWidth('left')+'px',height:headerHeight+'px'}">
				<div class="header-row" :style="{height:headerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 :class="currSort==item.id?'light-color':''"
						 v-if="checkMiddleHeader(item,index)">
						<span>{{item.name}}</span>
						<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
								 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
						></hw-icon>

					</div>
				</div>
			</div>

			<div class="right-header"
				 :style="{right:Math.max(getScrollLimit()-offsetLeft,0)+'px',width:getTypeWidth('right')+'px',height:headerHeight+'px'}">
				<div class="header-row" :style="{height:headerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkRightHeader(item,index)">
						<span>{{item.name}}</span>
						<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
								 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
						></hw-icon>

					</div>
				</div>
			</div>
		</div>
		<div class="body" :style="{width:getTypeWidth('total')+6+'px',height:bodyHeight+'px'}">
			<slot v-if="tableData.body.length < 1"></slot>
			<div class="left-table-body" v-if="tableData.body.length >= 1"
				 :style="{left:Math.min(offsetLeft,getScrollLimit())+'px',width:getTypeWidth('left')+'px'}">
				<div class="body-row"
					 v-for="(item,index) in tableData.body"
					 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
					 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
					 @mouseout="onMouseOut_bodyItem(item.id)"
					 :style="{height: eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item" v-if="checkLeftBody(key,index)"
						 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'">
								<hw-btn :text="value.name" @click.stop="onClick_itemBtn(value.id,item.id)"
										:style="{width: getWidth(value)+'px',height:eachRowHeight+'px',paddingBottom:'30px'}">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>
			<div class="middle-table-body" v-if="tableData.body.length >= 1"
				 :style="{width:getTypeWidth('middle')+'px',left:getTypeWidth('left')+'px'}">
				<div class="body-row" v-for="(item,index) in tableData.body"
					 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
					 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
					 @mouseout="onMouseOut_bodyItem(item.id)"
					 :style="{height: eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item"
						 v-if="checkMiddleBody(key,index)"
						 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
						<span v-if="key==='btn'">
							<hw-btn :text="value.name" @click.stop="onClick_itemBtn(value.id,item.id)"
									:style="{width: getWidth(value)+'px',height:eachRowHeight+'px',paddingBottom:'30px'}">
							</hw-btn>
						</span>
					</div>
				</div>
			</div>
			<div class="right-table-body" v-if="tableData.body.length >= 1"
				 :style="{right:Math.max(getScrollLimit()-offsetLeft,0)+'px',width:getTypeWidth('right')+'px'}">
				<div class="body-row" v-for="(item,index) in tableData.body"
					 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
					 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
					 @mouseout="onMouseOut_bodyItem(item.id)"
					 :style="{height:eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item"
						 v-if="checkRightBody(key,index)"
						 :style="{width: getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'">
								<hw-btn :text="value.name" @click.stop="onClick_itemBtn(value.id,item.id)"
										:style="{width: getWidth(value)+'px',height:eachRowHeight+'px',paddingBottom:'30px'}">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer header-vertical body-row" v-if="tableData.body.length >= 1 && isShowTotal"
			 :style="{height:footerHeight+'px',top:Math.min(offsetTop,topLimit)+eachRowHeight+6+'px',width:getTypeWidth('total')+6+'px'}">
			<div class="left-header"
				 :style="{left:Math.min(offsetLeft,getScrollLimit())+'px',width:getTypeWidth('left')+'px',height:footerHeight+'px'}">
				<div class="header-row" :style="{height:footerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.footer"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkLeftFooter(item,index)">
						<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
					</div>
				</div>
			</div>
			<div class="middle-header"
				 :style="{width:getTypeWidth('middle')+'px',left:getTypeWidth('left')+'px',height:footerHeight+'px'}">
				<div class="header-row" :style="{height:footerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.footer"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkMiddleFooter(item,index)">
						<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
					</div>
				</div>
			</div>
			<div class="right-header"
				 :style="{right:Math.max(getScrollLimit()-offsetLeft,0)+'px',width:getTypeWidth('right')+'px',height:footerHeight+'px'}">
				<div class="header-row" :style="{height:footerHeight+'px'}">
					<div class="header-col" v-for="(item,index) in tableData.footer"
						 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
						 v-if="checkRightFooter(item,index)">
						<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
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
			this.$nextTick(() =>
			{
				this.$refs.scrollCon.addEventListener('scroll', (e) =>
				{
					this.offsetLeft = this.$refs.scrollCon.scrollLeft;
					this.offsetTop = Math.min(this.$refs.scrollCon.scrollTop, this.topLimit);
				});
			})
		},
		data(){
			return {
				count: 1,
				offsetLeft: 0,
				offsetTop: 0,
				currSort: "",
				currHover: ""
			}
		},
		props: {
			tableData: {
				type: Object,
				default: function ()
				{
					return {}
				}
			},
			boxWidth: {
				type: Number,
				default: 1260
			},
			boxHeight: {
				type: Number,
				default: 400
			},
			headerHeight: {
				type: Number,
				default: 60
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
			footerHeight: {
				type: Number,
				default: 60
			},
			stripe: {
				type: Boolean,
				default: false
			},
			isShowIdCol: {
				type: Boolean,
				default: false
			},
			isShowTotal: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			topLimit()
			{
				return this.getContentHeight() > 0 && Math.max(this.getContentHeight() - this.bodyHeight -
								this.headerHeight - 15, 0);
			}
		},
		methods: {
			checkLeftHeader($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index <= this.leftFixedCols;
				}
				return isTrue && index < this.leftFixedCols;
			},
			checkMiddleHeader($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index > this.leftFixedCols && index <= (this.getValidLength("header") -
							this.rightFixedCols)
				}
				return isTrue && index >= this.leftFixedCols && index < (this.getValidLength("header") -
						this.rightFixedCols)
			},
			checkRightHeader($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index > (this.getValidLength("header") - this.rightFixedCols)
				}
				return isTrue && index >= (this.getValidLength("header") - this.rightFixedCols)
			},
			checkLeftBody(key, index)
			{
				var isTrue = !this.isShowIdCol ? key != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index <= this.leftFixedCols
				}
				return isTrue && index < this.leftFixedCols
			},
			checkMiddleBody(key, index)
			{
				var isTrue = !this.isShowIdCol ? key != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index > this.leftFixedCols && index <= (this.getValidLength("header") -
							this.rightFixedCols)
				}
				return isTrue && index >= this.leftFixedCols && index < (this.getValidLength("header") -
						this.rightFixedCols)
			},
			checkRightBody(key, index)
			{
				var isTrue = !this.isShowIdCol ? key != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index > (this.getValidLength("header") - this.rightFixedCols)
				}
				return isTrue && index >= (this.getValidLength("header") - this.rightFixedCols)

			},
			checkLeftFooter($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return isTrue && index <= this.leftFixedCols;
				}
				return isTrue && index < this.leftFixedCols;
			},

			checkMiddleFooter($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (!this.isShowIdCol)
				{
					return index > this.leftFixedCols && index <= (this.getValidLength("footer") -
							this.rightFixedCols);
				}
				return index >= this.leftFixedCols && index < (this.getValidLength("footer") -
						this.rightFixedCols)
			},
			checkRightFooter($item, index)
			{
				if (!this.isShowIdCol)
				{
					return index > (this.getValidLength("footer") - this.rightFixedCols)
				}
				return index >= (this.getValidLength("footer") - this.rightFixedCols)
			},
			onClick_headItem($item)
			{
				if (this.currSort == $item.id)
				{
					this.currSort = "";
				}
				else
				{
					this.currSort = $item.id;
				}
				this.$emit('clickHead', $item);
				var itemData = g.data.staticTableHeaderPool.getDataById($item.id);
				var list = g.data.staticTableHeaderPool.list;
				if ($item.sortBy)
				{
					if ($item.sortBy == "desc")
					{
						itemData.update({
							sortBy: "asc"
						})

					}
					else
					{
						itemData.update({
							sortBy: "desc"
						})
					}
				}
				for (var item of list)
				{
					if (item.sortBy && item.id !== $item.id)
					{
						item.sortBy = "desc";
					}
				}
				g.core.update();

			},
			onMouseOver_bodyItem($itemId)
			{
				this.currHover = $itemId;
			},
			onMouseOut_bodyItem($itemId)
			{
				this.currHover = "";
			},
			onClick_body($id)
			{
				this.$emit('clickBody', $id)
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
					if (!this.isShowIdCol && item.id == 'id')
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
			getValidLength($type)
			{
				const tmpArr = this.tableData[$type].concat();
				for (var item of tmpArr)
				{
					if (!this.isShowIdCol && item.id == 'id')
					{
						tmpArr.length--
					}
				}
				return tmpArr.length;
			},
			getScrollLimit()
			{
				const width = this.getTypeWidth('total');
				return Math.max(width - this.boxWidth, 0);
			},
			getContentHeight()
			{
				return this.tableData.body.length * this.eachRowHeight;
			},
			isEven($index)
			{
				return $index % 2 == 0;
			}
		}
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

<style type="text/scss" lang="sass" rel="stylesheet/scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.out-box {
		font-size: 14px;
		/*border: 1px solid #444444;*/
		overflow: auto;
	}

	.header, .body, .footer {
		position: relative;
	}

	.header {
		z-index: 10;
		/*box-shadow: 0px 3px 3px #999999;*/
	}

	.body {
		z-index: 5;
	}

	.left-table-body,
	.left-header {
		z-index: 9;
		box-shadow: 1px 0 0 #999999;
		/*background-color: #ffff00 !important;*/
	}

	.right-table-body,
	.right-header {
		z-index: 9;
		box-shadow: -1px 0 0 #999999;
		/*background-color: #ff3300 !important;*/
	}

	.middle-header {
		z-index: 8;
	}

	.middle-table-body {
		z-index: 0;
	}

	.body-col, .header-col {
		/*display: inline-block;*/
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
	}

	.absolute {
		position: absolute;
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

	.left-table-body, .middle-table-body, .right-table-body,
	.left-header, .middle-header, .right-header {
		position: absolute;
		top: 0;
		background-color: #ffffff;
	}

	.left-header, .middle-header, .right-header {
		background-color: #eceef4;
	}

	.left-table-body, .left-header {
		left: 0;
	}

	.body-row, .header-row {
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
		/*border: 1px solid #444444;*/
		/*border-right-color: transparent;*/
		/*border-bottom-color: transparent;*/
	}

	.out-box-border .footer .header-col {
		border-top-color: transparent;
	}

	.header-col, .body-col {
		padding-left: 6px;
		padding-top: 17px;
		cursor: pointer;

	}

	.transparent {
		color: transparent;
	}

	.body-col span, .header-col span {
		display: inline-block;
		text-align: center;
		word-wrap: break-word;
	}

	.header-col span {
		width: 70px;
		height: 40px;
		line-height: 20px;
	}

	.footer .header-col span, .body-col span {
		width: 100px;
		height: 20px;
		line-height: 20px;
	}



	.absolute-right {
		position: absolute;
		top: 18px;
		left: 80px;
	}

	.header,
	.body,
	.footer {
		border: 1px solid #dbdee7;
		border-bottom-width: 0;
		border-left-width: 0;
	}

	.out-box {
		border-top: 1px solid #cccccc;
	}

	.footer {
		border-bottom: 1px solid #dbdee7;
	}

	.header, .footer {
		background-color: #eceef4;
	}

	.bgc-f8 {
		background-color: #f8f8f8;
	}

	.light-color {
		color: #01aaef;
	}
	.body-row-hover {
		color: #01aaef;
		background-color: #eeeeee;
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