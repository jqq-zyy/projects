<template>
	<hw-group :vertical="vertical">
		<ul class="wrapClasses">
			<li v-for="item in data" :class="innerClasses">
				<!--item.status  completed process waiting -->
				<hw-icon :iconUrl="item.icon" :iconType="item.status"></hw-icon>
				<p>{{item.title}}</p>
				<p v-if="!!item.desc">{{item.desc}}</p>
			</li>
		</ul>
		<hw-btn text="下一步" type="info" v-if="hasNextBtn" @click="onClick_nextBtn"></hw-btn>
	</hw-group>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "hw-steps";
	var _statusList = ['waiting', 'process', 'completed'];
	export default{
		name: "hw-steps",
		created(){

		},
		props: {
			data: {
				type: Array,
				default: function ()
				{
					return [];
				}
			},
			vertical: {
				type: Boolean
			},
			hasNextBtn: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				list: this.data
			}
		},
		computed: {
			wrapClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-wrap`]
			},
			innerClasses()
			{
				return [`${prefixCls}`, `${prefixCls}-inner`]
			}
		},
		methods: {
			onClick_nextBtn()
			{
				var index;
				for (var i in this.list)
				{
					if (this.list[i].status == "process")
					{
						index = parseInt(i);
						break;
					}
				}
				for (var i = Math.max(index - 1, 0); i < Math.min(index + 2, this.list.length); i++)
				{
					for (var j = 0; j < _statusList.length; j++)
					{
						if (this.list[i].status == _statusList[j])
						{
							this.list[i].status = _statusList[j + 1] || _statusList[j];
							break;
						}
					}
				}
				this.$emit('next', this.list);
			}

		}

	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>