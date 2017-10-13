<template>
    <div class="affix-box default-pos-type" v-show="isShow_addPop">
        <div class="img-box">
            <div :style="{backgroundImage:'url('+imageUrl+')'}" class="img-url">
            </div>
            <div class="show-close-btn">
                <img :src="g.config.path.images+'/close.png'"
                     @click="onClick_closeBtn"/>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import g from '../../global';
    export default {
        create(){
        },
        props: {
            imageUrl: {
                type: String
            },

        },

        data () {
            return {
                g:g
            }
        },
        methods: {
            onClick_closeBtn(){
                this.$emit('close')
            }
        }
    }
</script>
<style>
	.img-box{
		width:60%;
		height:800px;
		position:relative;
	}
    .img-url{
         width:100%;
        height:100%;
        background-size:contain;
        background-repeat:no-repeat;
        background-position:center;
    }

</style>




