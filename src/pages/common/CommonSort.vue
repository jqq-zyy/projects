<template>
	<span :class="getCurrnetType()">
		<!--<span class="icon-border s-icon m-rotate">-->

		<!--</span>-->
	</span>
</template>

<script type="text/ecmascript-6">
	import g from './../../global';
	export default {
		props: ['target', 'currentField', 'type'],
		created(){
		},
		data () {
			return {
				g: g
			}
		},
		computed: {},
		methods: {
			getCurrnetType(){
				if (this.target == this.currentField)
				{
					return this.type
				}
				else
				{
					return 'position'
				}
			}
		}

	}
</script>

<style>
	..sortBox{
		margin-left: 5px;
	}
	.position,.desc,.asc{
		position: relative;
	}
	.position:before, .asc:before, .desc:before {
		content: "";
		width: 26px;
		height: 22px;
		/*border: 1px solid #dbdee7;*/
		border-radius: 2px;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.position:after {
		/*content: "\e150";*/
		content: "";
		position: absolute;
		top: 7px;
		left: 8px;
		/*font-family: 'Glyphicons Halflings';*/
		width: 8px;
		height: 8px;
		border-left: 2px solid #666;
		border-bottom: 2px solid #666;
		cursor: pointer;
		transform: rotate(135deg);
	}

	.asc:after {
		content: "";
		width: 8px;
		height: 8px;
		border-left: 2px solid #666;
		border-bottom: 2px solid #666;
		position: absolute;
		left: 8px;
		top: 9px;
		transition: transform .2s;
		transform: rotate(135deg);
	}

	.desc:after {
		content: "";
		width: 8px;
		height: 8px;
		border-left: 2px solid #666;
		/*border-right: 5px solid transparent;*/
		/*border-bottom: 10px solid #b7b8ba;*/
		border-bottom: 2px solid #666;
		position: absolute;
		left: 8px;
		top: 3px;
		transition: transform .2s;
		transform: rotate(-45deg);
	}

</style>  