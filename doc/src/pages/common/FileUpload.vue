<template>
	<form action="" class="formBox">
		<input type="file" name="uploadfile" @change="onFileChange" :accept="accept">
	</form>
</template>
<script type="text/babel">
	import g from '../../global';
	export default {
		name: 'fileupload',
		create(){
		},
		props: {
			target: {
				type: String
			},
			action: {
				type: String
			},
			accept: {
				type: String
			}
		},

		data () {
			return {
				file: null
			}
		},
		methods: {
			emitter (event, data) {
				this.$emit(event, data)
			},
			updateProgress (oEvent) {
				let vm = this
				if (oEvent.lengthComputable)
				{
					let percentComplete = Math.round(oEvent.loaded * 100 / oEvent.total)
					vm.emitter('progress', percentComplete)
				}
				else
				{
					// Unable to compute progress information since the total size is unknown
					vm.emitter('progress', false)
				}
			},
			onFileChange (e) {
				let vm = this;
				if (!this.target || this.target === '')
				{
					console.log('Please provide the target url')
				}
				else if (!this.action || this.action === '')
				{
					console.log('Please provide file upload action ( POST / PUT )')
				}
				else if (this.action !== 'POST' && this.action !== 'PUT')
				{
					console.log('File upload component only allows POST and PUT Actions')
				}
				else
				{
					let files = e.target.files || e.dataTransfer.files;

					if (!files.length)
					{
						return
					};
					/*global FormData XMLHttpRequest:true*/
					/*eslint no-undef: "error"*/
					var fileNodeList = document.getElementsByName('uploadfile');
					var parentNodeList = document.getElementsByClassName('formBox');
					for(var i = 0;i<fileNodeList.length;i++){
						var node = fileNodeList[i].cloneNode(true);
						parentNodeList[i].removeChild(fileNodeList[i]);
						parentNodeList[i].appendChild(node);
						document.getElementsByName('uploadfile')[i].addEventListener('change',this.onFileChange );
					}

					this.file = files[0];
					var type = this.file.type;
					if(this.accept.indexOf(type)==-1){
						g.ui.toast('文件格式错误，请从新选择');
						return
					}
					let formData = new FormData();
					formData.append('uploadfile', this.file);
					var xhr = new XMLHttpRequest();
					xhr.open(this.action, this.target);
					xhr.withCredentials ="true";
					xhr.onloadstart = function (e)
					{
						vm.emitter('start', e)
					};
					xhr.onloadend = function ()
					{
						vm.emitter('finish', xhr.responseText)
					};
					xhr.upload.onprogress = vm.updateProgress;
					xhr.send(formData)
				}
			}
		}
	}
</script>