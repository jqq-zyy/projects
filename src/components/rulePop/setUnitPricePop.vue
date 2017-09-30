<template>
    <div class="pop-edit-password pop-edit">
        <div class="show-close-btn">
            <img :src="g.config.path.images+'/close.png'"
                 @click="onClick_closeBtn"/>
        </div>
        <div class="pop-tit">
            设置二维码单价
        </div>
        <div class="pop-body set-code-price">
            <div class="input-money m-title">
                <span class="count">数量：</span>

                <div class="count-set" v-for="(item,index) in dataList">
                    <div v-if="item.max!='*'">
                        <div class="count-left"><input type="number" v-model="item.min"
                                                       @change="onChange_range($event,index,'min')"> ~
                            <input type="number" v-model="item.max" @change="onChange_range($event,index,'max')"></div>
                        <div class="count-right">
                            单价：¥ <input type="number" v-model="item.unitPrice"
                                        @change="onChange_unitPrice($event,index)">元 / 个
                        </div>
                        <span @click="onClick_pushBtn(index)" class="push-line">+</span><span v-show="index!=0"
                                                                            @click="onClick_deleteBtn(index)" class="push-line">-</span>
                    </div>
                    <div class="count-set" v-if="item.max=='*'">
                        <div class="count-left">
                            <input type="number" v-model="item.min" @change="onChange_range($event,index,'min')">
                            以上
                        </div>
                        <div class="count-right">
                            单价：¥ <input type="number" v-model="item.unitPrice">元 / 个
                        </div>
                    </div>
                </div>
            </div>
            <!--<p class="count-tips">请输入有效数量</p>-->
            <div class="m-title button-box">
                <div class="button pointer border-btn hb-fill-middle2-bg" @click="onClick_closeBtn">取消</div>
                <div class="button pointer bg-btn hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import g from './../../global';

    export default{
        created(){
            this.init()
        },
        data(){
            return {
                g: g,
                dataList: [{
                    min: 1
                }, {
                    max: "*"
                }]
            }
        },
        watch: {},
        methods: {
            init(){
                this.dataList = g.data.rulePool.dataList;
            },
            onClick_closeBtn(){
                this.$emit('close');
            },
            onClick_saveBtn(){

                for (var i = 0; i < this.dataList.length; i++) {
                    if (!this.dataList[i].min || !this.dataList[i].max || !this.dataList[i].unitPrice) {
                        g.ui.toast("请填写全部内容");
                        return
                    }
                    if (isNaN(this.dataList[i].min) || this.dataList[i].min < 0 || (isNaN(this.dataList[i].max)&this.dataList[i].max!="*" || this.dataList[i].max < 0)) {
                        g.ui.toast("数量区间应为整数且不能小于0");
                        return
                    }

                    if (isNaN(this.dataList[i].unitPrice) || this.dataList[i].unitPrice < 0 || (this.dataList[i].unitPrice.toString().indexOf(".") > 0 && this.dataList[i].unitPrice.toString().split(".")[1].length > 2)) {
                        g.ui.toast("二维码价格应为精确到小数点后两位的正数");
                        return
                    }
                    if(this.dataList[i].min>this.dataList[i].max){
                        g.ui.toast("数量区间最小值不得大于最大值");
                        return

                    }
                    if (this.dataList[i - 1] && this.dataList[i - 1].max) {
                        if (this.dataList[i].min-1 != this.dataList[i - 1].max) {
                            g.ui.toast("数量区间不能间断");
                            return
                        }
                    }
                    if(this.dataList[i + 1] && this.dataList[i + 1].min){
                        if (this.dataList[i + 1].min-1 != this.dataList[i].max) {
                            g.ui.toast("数量区间不能间断");
                            return
                        }
                    }
                }
                var data = JSON.stringify(this.dataList)
                g.net.call("config/updateQrcodeUnitPrice", {
                    'data': data
                }).then(($data) => {
                    g.data.rulePool.update(this.dataList)
                    this.$emit('close');
                    this.$emit('init');
                }, (err) => {
                    g.func.dealErr(err);

                });
            },
            onChange_range($e, $index, $type){
                this.dataList[$index][$type] = $e.target.value;
            },
            onChange_unitPrice($e, $index){
                this.dataList[$index].unitPrice = $e.target.value;
            },
            onClick_pushBtn($index){
                var max, min;
                if (this.dataList[$index].max) {
                    min = this.dataList[$index].max - 0 + 1
                }
                var obj = {}
                obj.min = min;
                obj.max = max;
                obj.unitPrice = "";
                this.dataList.splice(Number($index) + 1, 0, obj);
            },
            onClick_deleteBtn($index){
                this.dataList.splice($index, 1)
            }
        }
    }
</script>





