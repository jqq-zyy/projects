<template>
	<hw-page :total="5000"
			 :pageSize="pageSize"
			 :currPage="currPage"
			 :showTotalCount="true"
			 :showElevator="true"
			 :showPageSize="true"
			 :showFirstAndEnd="true"
			 @changepage="onChange_page"
			 @changepageSize="onChange_pageSize"
	></hw-page>
</template>
<script type="text/ecmascript-6">
	export default{
		created(){

		},
		data(){
			return {
				pageSize: 10,
				currPage: 1,
				isShowPageSize: true
			}
		},
		methods: {
			onChange_page($indexPage)
			{
				this.currPage = $indexPage;
			},
			onChange_pageSize($id)
			{

				this.pageSize = $id;
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">

</style>