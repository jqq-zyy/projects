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
	.position,.desc,.asc{
		position: relative;
	}
	.position:before, .asc:before, .desc:before {
		content: "";
		width: 26px;
		height: 22px;
		border: 1px solid #dbdee7;
		border-radius: 4px;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.position:after {
		/*content: "\e150";*/
		content: "";
		position: absolute;
		top: 5px;
		left: 8px;
		/*font-family: 'Glyphicons Halflings';*/
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 10px solid #b7b8ba;
		cursor: pointer;
	}

	.asc:after {
		content: "";
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		/*border-bottom: 10px solid #b7b8ba;*/
		border-bottom: 10px solid #01aaef;
		position: absolute;
		left: 8px;
		top: 7px;
		transition: transform .2s;
		transform: rotate(-180deg);
	}

	.desc:after {
		content: "";
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		/*border-bottom: 10px solid #b7b8ba;*/
		border-bottom: 10px solid #01aaef;
		position: absolute;
		left: 8px;
		top: 7px;
		transition: transform .2s;
		transform: rotate(0deg);
	}

</style>  