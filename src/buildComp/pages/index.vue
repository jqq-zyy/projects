<template>
	<div class="flex-collum">
		<button @click="onClick_btn('/button')">Button</button>
		<button @click="onClick_btn('/radiobox')">RadioBox</button>
		<button @click="onClick_btn('/checkbox')">CheckBox</button>
		<button @click="onClick_btn('/input')">Input</button>
		<button @click="onClick_btn('/group')">Group</button>
		<button @click="onClick_btn('/treemenu')">TreeMenu</button>
		<button @click="onClick_btn('/list')">List</button>
		<button @click="onClick_btn('/loading')">Loading</button>
		<button @click="onClick_btn('/switch')">Switch</button>
		<button @click="onClick_btn('/affix')">Affix</button>
		<button @click="onClick_btn('/scrollgroup')">ScrollGroup</button>
		<button @click="onClick_btn('/page')">Page</button>
		<button @click="onClick_btn('/navbar')">NavBar</button>
		<button @click="onClick_btn('/steps')">Steps</button>
		<button @click="onClick_btn('/qrcode')">Qrcode</button>
		<button @click="onClick_btn('/tips')">Tips</button>
		<button @click="onClick_btn('/badge')">Badge</button>
		<button @click="onClick_btn('/code')">Code</button>
		<button @click="onClick_btn('/combobox')">ComboBox</button>
		<button @click="onClick_btn('/tabbar')">TabBar</button>
		<button @click="onClick_btn('/carousel')">Carousel</button>
		<button @click="onClick_btn('/chart')">Chart</button>
		<button @click="onClick_btn('/messagebox')">MessageBox</button>
		<button @click="onClick_btn('/player')">Player</button>
		<button @click="onClick_btn('/popup')">PopUp</button>
		<button @click="onClick_btn('/toast')">Toast</button>
		<button @click="onClick_btn('/upload')">Upload</button>
		<button @click="onClick_btn('/datebox')">DateBox</button>
		<button @click="onClick_btn('/table')">Table</button>
		<button @click="onClick_btn('/alert')">Alert</button>
	</div>
</template>


<script type="text/ecmascript-6">
	import g from './../global';

	export default {
		created()
		{

		},
		data()
		{
			return {
				g: g
			}
		},
		components: {},
		methods: {
			onClick_btn($str)
			{
				g.url = $str;
			}
		}
	}
</script>

<style type="text/css">

	.flex-collum button {
		width: 200px;
		height: 50px;
		margin: 20px 100px;

	}

</style>