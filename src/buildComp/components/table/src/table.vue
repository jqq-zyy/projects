<template>
	<div class="out-box relative" :class="[inlineBorder?'out-box-border':'']"
		 :style="{height:boxHeight +'px',width:boxWidth+'px'}">
		<div class="header header-vertical body-row" ref="header"
			 :style="{height:headerHeight+'px',width:boxWidth+'px'}">
			<div class="header-row" :style="{height:headerHeight+'px'}">
				<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}" v-if="checkLeftHeader(item)">
					<span>{{item.name}}</span>
					<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
							 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
					></hw-icon>
				</div>
			</div>
		</div>
		<div class="body"
			 :style="{width:boxWidth+'px',maxHeight:bodyHeight+'px',overflowX:!isShowTotal?'auto':'hidden',
			 overflowY:rightFixedCols==0?'auto':'hidden'}" ref="scrollCon">
			<slot v-if="tableData.body.length < 1" :style="{minHeight:bodyHeight+'px'}"></slot>
			<div class="body-row" v-for="(item,index) in tableData.body" v-if="tableData.body.length>=1"
				 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
				 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
				 @mouseout="onMouseOut_bodyItem(item.id)"
				 :style="{height: eachRowHeight+'px',width:getValidLength('header')*eachColWidth+'px'}">
				<div class="body-col" v-for="(value,key,index) in item" v-if="checkLeftBody(key)"
					 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}"
					 :class="lightColsList.indexOf(index)>= 0?'light-color':''">
					<span v-if="key !== 'btn'">{{getName(value)}}</span>
					<span v-if="key==='btn'" :style="{paddingBottom:'30px'}">
						<hw-btn @click.stop="onClick_itemBtn(btnItem.id,item.id)" v-for="btnItem in value"
								:text="btnItem.name" class="margin-10" :class="btnItem.className">
						</hw-btn>
					</span>
				</div>
			</div>
		</div>

		<div class="footer body-row" v-if="tableData.body.length >= 1 && isShowTotal" ref="footer"
			 :style="{height:footerHeight+8+'px',overflowX:'auto'}">
			<div class="header-row" :style="{height:footerHeight+'px'}">
				<div class="header-col" v-for="(item,index) in tableData.footer"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
					 v-if="checkLeftFooter(item)">
					<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
				</div>
			</div>
		</div>

		<div class="left-header" v-if="leftFixedCols>0">
			<div class="header-row">
				<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
					 v-if="checkLeftHeader(item,index)">
					<span>{{item.name}}</span>
					<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
							 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
					></hw-icon>
				</div>
			</div>
			<div ref="leftTable" class="left-table-body" :style="{maxHeight:bodyHeight-6+'px'}">
				<div class="body-row"
					 v-for="(item,index) in tableData.body"
					 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
					 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
					 @mouseout="onMouseOut_bodyItem(item.id)"
					 :style="{height: eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item" v-if="checkLeftBody(key,index)"
						 :style="{width:getWidth(value)+'px',height:eachRowHeight+'px'}"
						 :class="lightColsList.indexOf(index)>= 0?'light-color':''">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'" :style="{paddingBottom:'30px'}">
								<hw-btn @click.stop="onClick_itemBtn(btnItem.id,item.id)" v-for="btnItem in value"
										:text="btnItem.name" class="margin-10" :class="btnItem.className">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>
			<div class="header-row" :style="{height:footerHeight+'px'}"  v-if="tableData.body.length >= 1 && isShowTotal">
				<div class="header-col" v-for="(item,index) in tableData.footer"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
					 v-if="checkLeftFooter(item,index)">
					<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
				</div>
			</div>
		</div>
		<div class="right-header" v-if="rightFixedCols>0">
			<div class="header-row">
				<div class="header-col" v-for="(item,index) in tableData.header" @click="onClick_headItem(item)"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
					 v-if="checkRightHeader(item,index)">
					<span>{{item.name}}</span>
					<hw-icon :iconType="item.sortBy ? item.sortBy == 'desc' ? 'bottom-arrow' : 'top-arrow' : ''"
							 v-if="item.sortBy" class="absolute-right" :class="currSort==item.id?'light-color':''"
					></hw-icon>
				</div>
			</div>
			<div ref="rightTable" class="right-table-body"
				 :style="{maxHeight:bodyHeight-6+'px',width:rightFixedCols*eachColWidth+'px',overflowY:rightFixedCols != 0?'auto':'hidden'}">
				<div class="body-row" v-for="(item,index) in tableData.body"
					 :class="[isEven(index)?'bgc-f8':'bgc-ff',currHover==item.id?'body-row-hover':'']"
					 @click="onClick_body(item.id)" @mouseover="onMouseOver_bodyItem(item.id)"
					 @mouseout="onMouseOut_bodyItem(item.id)" :style="{height:eachRowHeight+'px'}">
					<div class="body-col" v-for="(value,key,index) in item"
						 v-if="checkRightBody(key,index)" :class="lightColsList.indexOf(index)>= 0?'light-color':''"
						 :style="{width: getWidth(value)+'px',height:eachRowHeight+'px'}">
						<span v-if="key !== 'btn'">{{getName(value)}}</span>
							<span v-if="key==='btn'" :style="{paddingBottom:'30px'}">
								<hw-btn v-for="btnItem in value" @click.stop="onClick_itemBtn(btnItem.id,item.id)"
										:text="btnItem.name" class="margin-10" :class="btnItem.className">
								</hw-btn>
							</span>
					</div>
				</div>
			</div>
			<div class="header-row" :style="{height:footerHeight+'px'}"  v-if="tableData.body.length >= 1 && isShowTotal">
				<div class="header-col" v-for="(item,index) in tableData.footer"
					 :style="{width:getWidth(item)+'px',height:eachRowHeight+'px'}"
					 v-if="checkRightFooter(item,index)">
					<span :class="item.name===undefined?'transparent':''">{{item.name===undefined?"空":item.name}}</span>
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
				var self = this;
				if (this.isShowTotal && this.tableData.body.length >= 1)
				{
					this.$refs.footer.addEventListener('scroll', (e) =>
					{
						self.offsetLeft = self.$refs.footer.scrollLeft;
						self.$refs.scrollCon.scrollLeft = self.offsetLeft;
						self.$refs.header.scrollLeft = self.offsetLeft;
					});

				}
				else
				{
					this.$refs.scrollCon.addEventListener('scroll', (e) =>
					{
						self.offsetLeft = self.$refs.scrollCon.scrollLeft;
						self.$refs.header.scrollLeft = self.offsetLeft;
					})
				}

				if (this.rightFixedCols === 0)
				{
					this.$refs.scrollCon.addEventListener('scroll', (e) =>
					{
						self.offsetTop = self.$refs.scrollCon.scrollTop;
						self.$refs.leftTable && (self.$refs.leftTable.scrollTop = self.offsetTop);
//						self.$refs.rightTable.scrollTop = self.offsetTop;
					});
				}
				else
				{
					this.$refs.rightTable.addEventListener('scroll', (e) =>
					{
						self.offsetTop = self.$refs.rightTable.scrollTop;
						self.$refs.leftTable && (self.$refs.leftTable.scrollTop = self.offsetTop);
						self.$refs.scrollCon && (self.$refs.scrollCon.scrollTop = self.offsetTop);
					});
				}

			})
		},
		data()
		{
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
			},
			lightColsList: {
				type: Array,
				default: function ()
				{
					return [];
				}
			}
		},
		methods: {
			checkLeftHeader($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (index != undefined)
				{
					return isTrue && index < this.leftFixedCols
				}
				return isTrue;
			},
			checkRightHeader($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (index != undefined)
				{
					return isTrue && index >= (this.getValidLength("header") - this.rightFixedCols)
				}
				return isTrue;
			},
			checkLeftBody(key, index)
			{
				var isTrue = !this.isShowIdCol ? key != 'id' ? true : false : true;
				if (index != undefined)
				{
					return isTrue && index < this.leftFixedCols
				}
				return isTrue;
			},
			checkRightBody(key, index)
			{
				var isTrue = !this.isShowIdCol ? key != 'id' ? true : false : true;
				if (index != undefined)
				{
					return isTrue && index >= (this.getValidLength("header") - this.rightFixedCols)
				}
				return isTrue;
			},
			checkLeftFooter($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (index != undefined)
				{
					return isTrue && index < this.leftFixedCols;
				}
				return isTrue;
			},
			checkRightFooter($item, index)
			{
				var isTrue = !this.isShowIdCol ? $item.id != 'id' ? true : false : true;
				if (index != undefined)
				{
					return index >= (this.getValidLength("footer") - this.rightFixedCols)
				}
				return isTrue;
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
			onMouseOut_bodyItem()
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
		overflow: hidden;
	}

	.header {
		z-index: 2;
		overflow: hidden;
	}

	.body {
		z-index: -1;
		overflow-y: auto;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

	}

	.left-header {
		z-index: 0;
		box-shadow: 1px 0 0 #999999;
		position: absolute;
		left: 0;
		top: 3px;
		overflow: hidden;
	}

	.right-header {
		z-index: 0;
		box-shadow: -1px 0 0 #999999;
		position: absolute;
		right: 0;
		top: 2px;
		overflow: hidden;
	}

	.body-row {
		z-index: -1;
	}

	.body-col, .header-col {
		/*display: inline-block;*/
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
	}

	.left-table-body,
	.right-table-body {
		overflow-x: hidden;
	}

	.left-table-body {
		overflow-y: hidden;
	}

	.left-header, .middle-header, .right-header {
		background-color: #eceef4;
	}

	.body-row, .header-row {

		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
		display: -moz-box; /* Firefox 17- */
		/*display: -webkit-flex; !* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 *!*/
		/*display: -moz-flex; !* Firefox 18+ *!*/
		/*display: -ms-flexbox; !* IE 10 *!*/
		/*display: flex; !* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ *!*/
		/*flex-direction: row;*/
		/*-webkit-box-orient: horizontal;*/
		/*-webkit-flex-direction: row;*/
		/*-ms-flex-direction: row;*/
		/*flex-direction: row;*/
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
	.body {
		border: 1px solid #dbdee7;
		border-bottom-width: 0;
		border-left-width: 0;
		border-right-width: 0;
	}

	.footer {
		border-bottom: 1px solid #dbdee7;
	}

	.out-box {
		border-top: 1px solid #cccccc;
	}

	.footer {
		border-bottom: 1px solid #dbdee7;
		z-index: 1;
		overflow-y: hidden;
		margin-bottom: 2px;
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

	.body-row-hover span {
		color: #01aaef !important;
	}

	.margin-10 {
		margin-left: 10px;
	}

	.absolute {
		position: absolute;
	}

	.relative {
		position: relative;
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