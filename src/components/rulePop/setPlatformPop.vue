<template>
    <div class="pop-edit-password pop-edit">
        <div class="show-close-btn">
            <img :src="g.config.path.images+'/close.png'"
                 @click="onClick_closeBtn"/>
        </div>
        <div class="pop-tit">
            设置平台红包金额范围
        </div>
        <div class="pop-body">
            <div class="input-money m-title">
                <span>请输入倍数：</span>
                <input type="text" class="multiple" v-model="min"> ~
                <input type="text" class="multiple" v-model="max">
                <span>倍</span>
            </div>
            <p class="count-tipes">精确到小数点后一位</p>
            <div class="m-title button-box" >
                <div class="button border-btn hb-fill-middle2-bg" @click=" onClick_closeBtn">取消</div>
                <div class="button hb-fill-middle2-rev" @click="onClick_saveBtn">保存</div>
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
                min: 0,
                max: 0
            }
        },
        watch: {
            min($val, $oldVal){
                if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 1) {
                    this.min = $oldVal;
                    return
                }
                else if (isNaN($val) || $val < 0) {
                    this.min = $oldVal;
                    return
                } else if ($val > this.max) {
                    this.min = this.max;
                    return
                }
            },
            max($val, $oldVal){
                if ($val.toString().indexOf(".") > 0 && $val.toString().split(".")[1].length > 1) {
                    this.max = $oldVal;
                    return
                }
                else if (isNaN($val) || $val < 0) {
                    this.max = $oldVal;
                    return
                } else if ($val < this.min) {
                    this.max = this.min;
                    return
                }
            }
        },
        methods: {
            init(){
                this.min = g.data.rulePool.min;
                this.max = g.data.rulePool.max;
            },
            onClick_closeBtn(){
                this.$emit('close');
            },
            onClick_saveBtn(){
                if (!this.min || !this.max) {
                    g.ui.toast("请填写平台红包金额最新与最大倍数范围");
                    return
                }
                g.net.call("config/updatePlatformRpAmountRange", {
                    'min': this.min,
                    'max': this.max
                }).then(($data) => {
                    g.data.rulePool.update({
                        'minPlatformRpMulti': this.min,
                        'maxPlatformRpMulti': this.max
                    })
                    this.$emit('close');
                    this.$emit('init');
                }, (err) => {
                    g.func.dealErr(err);
                });
            }
        }
    }
</script>
