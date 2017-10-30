<template>
    <div class="common-page-show">
        <div class="inner-page-style">
            <ul>
                <li class="before-page fisrt-li " @click="goto(indexPage-1)">&lt;</li>
                <li
                        :class="['page-num','',indexPage == index?'selected-style':'',isNaN(index)?'not-valid-page':'']"
                        v-for="index in pages"
                        @click="goto(index)">{{index}}
                </li>
                <li class="before-page last-li" @click="goto(indexPage+1)">
                    &gt;</li>
            </ul>
            <span class="total-page">共{{totalPage}}页</span>
            <div class="page-input">到第 <input type="text" :max="totalPage" min="1" v-model="intentPage"
                                              class="number-input">页
				<span class="pointer sure-btn"
                      @click="onClick_confirmBtn">确认</span>
            </div>
            <!--<span v-for="item in pageSizeList" @click="onClick_changePageSizeBtn(item)"-->
            <!--:class="[item == currentPageSize?'selected-style':'']">{{item}}</span>-->
            <div class="page-size">
                <span v-for="item in pageSizeList" @click="onClick_changeSize(item)" class="pointer"
                      :class="{'size-choosed':currentPageSize==item}"> {{item}}</span>
                <!--<span class="size-choosed pointer" @click="onClick_changeSize(10)">10</span><span class="pointer">25</span>-->

            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import g from './../../global';

    export default {
        created(){
            this.init();
        },
        data(){
            return {
                g: g,
                totalPage: this.total,
                indexPage: this.index,
                pageSizeList: g.param.pageSizeList,
                currentPageSize: 10,
                pages: [],
                intentPage: ""
            }
        },
        props: ['total', 'index'],
        watch: {
            total: function ($val) {
                this.totalPage = $val;
                this.init();
            },
            index: function ($val) {
                this.indexPage = $val;
                this.init();
            },
            intentPage: function ($val, $oldVal) {
                if (isNaN($val)) {
                    this.intentPage = $oldVal;
                }
                else if ($val < 1 && $val != "") {
                    this.intentPage = 1;
                }
                else if ($val > this.totalPage) {
                    this.intentPage = this.totalPage;
                }

            }
        },
        methods: {

            init: function () {
                var pageList = [];
                if (this.totalPage <= 5) {
                    for (var i = 1; i <= this.totalPage; i++) {
                        pageList.push(i);
                    }
                }
                else {
                    if (this.indexPage <= 3) {
                        pageList = [1, 2, 3, 4, "...", this.totalPage];
                    }
                    else if (this.indexPage > this.totalPage - 3) {
                        pageList = [1, "...", this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];
                    }
                    else {
                        pageList = [1, "...", this.indexPage - 1, this.indexPage, this.indexPage + 1, "...", this.totalPage]
                    }
                }
                this.pages = pageList;
            },
            goto: function ($index) {
                if ($index == this.indexPage) {
                    return
                }
                if ($index >= 1 && $index <= this.totalPage) {
                    this.indexPage = $index;
                }
                else {
                    return
                }
                this.upDateOrder();
            },
            onClick_changePageSizeBtn: function ($pageSize) {
                if ($pageSize == this.currentPageSize) {
                    return
                }
                this.indexPage = 1;
                this.currentPageSize = $pageSize;
                this.upDateOrder();
            },
            onClick_confirmBtn: function () {
                if (this.intentPage == this.indexPage ||!this.intentPage) {
                    return
                }
                this.indexPage = Number(this.intentPage);
                this.upDateOrder();
            },
            upDateOrder: function () {
                this.$emit('change', this.indexPage, this.currentPageSize);
            },
            onClick_changeSize: function ($size) {
                this.intentPage = "";
                this.indexPage = 1;
                this.currentPageSize = $size;
                this.upDateOrder();
            }
        }
    }

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    .btn-type span.active {
        background: #108ee9 !important;
        color: #ffffff; }

        .inner-page-style .not-valid-page {
            background-color: #ffffff;
    }

        .common-page-show {
            overflow:hidden;
    }

        .inner-page-style {
            float:left;
            margin-top: 34px;
            overflow:hidden;
            width: 100%;
    }

        .inner-page-style ul {
            float:left;
            margin-right: 16px;
    }

        .inner-page-style ul li {
            display:inline-block;
            height: 40px;
            width: 38px;
            line-height: 38px;
            text-align:center;
            background: #ffffff;
            border: 1px solid #dbdee7;
            border-left:none;
            cursor:pointer;
            color: #4a4a4a;
            font-size: 14px;
    }
        .inner-page-style ul .fisrt-li {
            margin-right: 5px;
            border: 1px solid #dbdee7;
    }
        .inner-page-style ul .last-li {
            margin-left: 5px;
            border: 1px solid #dbdee7;
    }
        .inner-page-style ul li:hover {
            background: #01aaef;
            color: #ffffff;

    }

        .inner-page-style .show-dots {
            line-height: 27px;
    }

        .inner-page-style .selected-style {
            background: #01aaef;
            color: #eb9480;
    }

        .page-input {
            display:inline-block;
            color: #979797;
    }

        .number-input {
            height: 40px;
            width: 40px;
            outline:none;
            resize:none;
            border-radius: 4px;
            border: 1px solid #efefef;
            margin: 0 10px;
    }

        .page-size {
            float:right;
            border: 1px solid #dbdee7;
            span {
                width: 50px;
                height: 40px;
                line-height: 40px;
                text-align:center;
                display:inline-block;
                background: #ffffff;
                color: #979797;
        }
            span:first-child {
                border-right: 1px solid #dbdee7;
        }
            .size-choosed {
                background: #f8f9fb;
                color: #252332;
        }
    }
        .sure-btn{
            width: 112px;
            height: 38px;
            line-height: 38px;
            margin-left: 72px;
            display:inline-block;
            background: #fff;
            text-align:center;
            border: 1px solid #01aaef;
    }
        .sure-btn:hover{
            background: #01aaef;
            color: #fff;
    }
        .total-page{
            color: #979797;
            font-size: 14px;
    }
</style>