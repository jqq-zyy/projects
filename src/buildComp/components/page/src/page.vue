<template>
	<div :class="wrapClass" class="operate">
		<span class="total-page" v-if="showTotalCount">共 <span>{{total}}</span> 条</span>
		<div v-show="showPageSize" class="page-input">
			<div @click="onClick_adjustPageSize">
				<span class="page-middle">{{pageSize}} 条/页</span>
				<hw-icon :iconClass="isShowAdjustSize?'icon-xiajiantou':'icon-youjiantou'"
						 class="absolute-icon"></hw-icon>
			</div>
			<div class="page-select-dropdown" :class="isShowAdjustSize?'is-absoluted':''" v-if="isShowAdjustSize">
				<ul class="page-select-list">
					<li v-for="item in pageSizeList" @click="onClick_pageSize(item)"
						:class="item==pageSize? 'selected':''">
						{{item.name}}条/页
					</li>
				</ul>
			</div>
		</div>

		<ul class="pager" :class="innerClass" style="float: left">
			<li class="number" @click="onClick_pageBtn(1)" v-if="showFirstAndEnd">
				{{defaultTextList[0]}}
			</li>
			<li class="number" :class="indexPage== 1 ?'page-disabled':''" @click="onClick_prevBtn">
				{{defaultTextList[1]}}
			</li>
			<li class="number" v-for="page in pageList" @click="onClick_pageBtn(page)"
				:class="indexPage == page?'active-page':''">
				{{page}}
			</li>

			<li class="number" @click="onClick_nextBtn" :class="indexPage== totalPage ?'page-disabled':''">
				{{defaultTextList[2
				]}}
			</li>
			<li class="number" @click="onClick_pageBtn(totalPage)" v-if="showFirstAndEnd">{{defaultTextList[3]}}</li>

			<span class="to-page" v-if="showElevator">到第<input type="text" class="to" v-model.number.trim="selectPage"
															   @keyup.enter="onKeyUpEnter_pageBtn"
															   @change="onKeyUpEnter_pageBtn"
															   @focus="onFocus_input" ref="inputPage">页
			</span>
		</ul>
	</div>
</template>
<script>
	import * as util from './../../../js/util'
	const prefixCls = "hw-page";
	export default{
		name: "hw-page",
		created(){
		},
		data(){
			return {
				g: g,
				selectPage: 1,
				indexPage: this.currPage,
				isShowAdjustSize: false
			}
		},
		props: {
			type: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["primary", "mini"]);
				}
			},
			textType: {
				type: String,
				validator($val)
				{
					return util.oneOf($val, ["en", "cn", "char"]);
				},
				default: "char"
			},
			total: {
				type: Number,
				validator($val)
				{
					return $val >= 1;
				}
			},
			currPage: {
				type: Number
			},
			pageSize: {
				type: Number,
				default: 10
			},
			pageSizeList: {
				type: Array,
				default: function ()
				{
					return [10, 20, 50];
				}
			},
			showPageSize: {
				type: Boolean,
				default: false
			},
			showTotalCount: {
				type: Boolean,
				default: false
			},
			showElevator: {
				type: Boolean,
				default: false
			},
			showFirstAndEnd: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			pageList()
			{
				if (this.totalPage <= 7)
				{
					return this.getPageList(1, this.totalPage)
				}
				var leftArr = [], rightArr = [];
				var tempArr$1 = [], tempArr$2 = [];
				if ((this.indexPage - 3) <= 1)
				{
					leftArr = this.getPageList(1, this.indexPage)
				}
				else
				{
					tempArr$1 = [1, '...'];
					tempArr$2 = this.getPageList(this.indexPage - 2, this.indexPage);
					leftArr = tempArr$1.concat(tempArr$2);
				}
				if ((this.indexPage + 3) >= this.totalPage)
				{
					rightArr = this.getPageList(this.indexPage + 1, this.totalPage)
				}
				else
				{
					tempArr$1 = ['...', this.totalPage];
					tempArr$2 = this.getPageList(this.indexPage + 1, Math.max(this.indexPage + 2, 6));
					rightArr = tempArr$2.concat(tempArr$1);
				}
				return leftArr.concat(rightArr);
			},

			defaultTextList()
			{
				if (this.textType == "char")
				{
					return ["<<", "<", ">", ">>"]
				}
				else if (this.textType == "en")
				{
					return ["First", "Prev", "Next", "Last"]
				}
				else
				{
					return ["首页", "上一页", "下一页", "尾页"]
				}
			},
			wrapClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-wrap`, `${prefixCls}-wrap-${this.type}`
				]
			},
			innerClass()
			{
				return [
					`${prefixCls}`, `${prefixCls}-inner`, `${prefixCls}-inner-${this.type}`
				]
			},
			totalPage()
			{
				return this.total / this.pageSize;
			}
		},
		watch: {
			selectPage($val)
			{
				var reg = /(^[0-9]*$)/;
				if ($val != "")
				{
					if (!reg.test($val))
					{
						this.selectPage = "";
					}
					if ($val > this.totalPage)
					{
						this.selectPage = this.totalPage;
					}
				}
				if ($val == 0)
				{
					this.selectPage = 1;
				}
			}
		},
		methods: {
			onClick_pageBtn($page)
			{
				if (isNaN(int($page)))
				{
					return;
				}
				this.indexPage = int($page);
				this.$emit('changepage', this.indexPage);
			},
			onClick_nextBtn()
			{
				if (this.isValid(this.indexPage + 1))
				{
					this.onClick_pageBtn(this.indexPage + 1);
				}
			},
			onClick_prevBtn()
			{
				if (this.isValid(this.indexPage - 1))
				{
					this.onClick_pageBtn(this.indexPage - 1);
				}
			},
			onKeyUpEnter_pageBtn()
			{
				if (this.isValid(this.selectPage))
				{
					this.onClick_pageBtn(this.selectPage);
				}
			},
			isValid($page)
			{
				var page = int($page);
				if (page <= this.totalPage && page >= 1)
				{
					return true;
				}
				return false;
			},
			getPageList($startPos, $endPos)
			{
				var list = [];
				for (var i = $startPos; i <= $endPos; i++)
				{
					list.push(i);
				}
				return list;
			},
			onClick_pageSize($pageSize)
			{
				this.isShowAdjustSize = false;
				this.$emit('changepageSize', $pageSize);
				this.$forceUpdate();
				this.onClick_pageBtn(1);
			},
			onFocus_input()
			{
				this.$refs.inputPage.select();
			},
			onClick_adjustPageSize()
			{
				if (this.isShowAdjustSize)
				{
					this.isShowAdjustSize = false;
				}
				else
				{
					this.isShowAdjustSize = true;
				}

			}
		}
	}
</script>
<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
	.operate {
		font-size: 12px;
		line-height: 22px;
		position: absolute;
		bottom: 300px;
		right: 46px;
		color: #909ca7;
		min-width: 773px;
		.op {
			float: right;
		}

		.page-input {
			float: left;
			background-color: #ffffff;
			background-image: none;
			position: relative;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			box-sizing: border-box;
			font-size: inherit;
			height: 28px;
			outline: none;
			padding: 0px 10px;
			transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
			width: 110px;
			margin: 0 10px 0 0;
			span {
				height: 28px;
				display: block;
				line-height: 28px;
			}
			&:hover {
				border-color: #20a0ff;
			}
			.page-select-dropdown {
				position: absolute;
				z-index: 2001;
				min-width: 100px;
				margin: 5px 0;
				overflow: hidden;
				border: 1px solid #d1dbe5;
				background-color: #ffffff;
				border-radius: 2px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
				box-sizing: border-box;
				-webkit-transition: height .4s cubic-bezier(.645, .045, .355, 1);
				-moz-transition: height .4s cubic-bezier(.645, .045, .355, 1);
				-ms-transition: height .4s cubic-bezier(.645, .045, .355, 1);
				-o-transition: height .4s cubic-bezier(.645, .045, .355, 1);
				transition: height .4s cubic-bezier(.645, .045, .355, 1);
				.page-select-list {
					padding: 6px 0;
					margin: 0;
					box-sizing: border-box;
					position: relative;
					li {
						font-size: 14px;
						padding: 0px 10px;
						position: relative;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						color: #48576a;
						height: 36px;
						line-height: 36px;
						box-sizing: border-box;
						cursor: pointer;
						-webkit-transition: background-color .3s ease-in-out;
						-moz-transition: background-color .3s ease-in-out;
						-ms-transition: background-color .3s ease-in-out;
						-o-transition: background-color .3s ease-in-out;
						transition: background-color .3s ease-in-out;
						&:hover {
							background-color: #e4e8f1;
						}
						&.selected {
							background-color: #1c8de0;
							color: #ffffff;

						}
					}

				}
			}
			.is-absoluted {
				top: 30px;
				left: 4px;
			}
		}

		.number {
			height: 25px;
			text-align: center;
			line-height: 25px;
			border: 1px solid transparent;
			border-radius: 4px;
			margin: 0 2px;
			background-color: #f2f5f6;
			display: inline-block;
			cursor: pointer;
			float: left;
			font-size: 14px;
			-webkit-transition: all .3s ease;
			-moz-transition: all .3s ease;
			-ms-transition: all .3s ease;
			-o-transition: all .3s ease;
			padding: 0 10px;
			transition: all .3s ease;
			&:hover {
				border-color: #108ee9;
				color: #108ee9;
			}
		}

		.active-page {
			color: #ffffff;
			background-color: #108ee9;
			&:hover {
				color: #ffffff;
				background-color: #108ee9;
			}
		}

		.total-page, .to-page {
			float: left;
			height: 25px;
			line-height: 25px;
			margin: 0 10px;
			font-size: 14px;
			.to {
				display: inline;
				resize: none;
				height: 25px;
				width: 35px;
				text-align: center;
				border-radius: 3px;
				background: #f7f9fa;
				margin: 0 2px;
				padding: 0 10px;
				color: #909ca7;
				border: 1px solid transparent;
				-webkit-transition: all .3s ease;
				-moz-transition: all .3s ease;
				-ms-transition: all .3s ease;
				-o-transition: all .3s ease;
				transition: all .3s ease;
				&:hover {
					border-color: #108ee9;
				}
			}

		}

		.show-size {
			display: inline-block;
			height: 22px;
			width: 6em;
			color: #ffffff;
			background-color: #5baade;
			line-height: 22px;
			text-align: center;
			border-radius: 5px;
			margin-right: 4px;
			vertical-align: top;
			margin-top: 1px;
			border: none;
			font-size: 12px;
		}

	}

	.mint-toast {
		z-index: 10000;
	}

	.page-disabled {
		pointer-events: none;
		background-color: #cccccc;
	}

	.absolute-icon {
		position: absolute;
		right: 18px;
		top: 2px;
	}

	.page-middle {
		padding-left: 5px;
	}
</style>