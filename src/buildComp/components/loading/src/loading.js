/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from "vue";

const LoadingConstructor = Vue.extend(require("./loading.vue"));
let instance = null;
let loaded = false;

let getAnInstance = () =>
{
	if (instance)
	{
		return instance;
	}
	return new LoadingConstructor({
		el: document.createElement('div')
	});
};

let destroyInstance = () =>
{
	instance = null;
};

let removeDom = () =>
{
	if (loaded && instance.$el)
	{
		document.body.removeChild(instance.$el);
		loaded = false;
		destroyInstance();

	}
};

let insertDom = () =>
{
	if (instance.$el)
	{
		document.body.appendChild(instance.$el);
		loaded = true;
	}
};

LoadingConstructor.prototype.show = function ()
{
	insertDom();
};

LoadingConstructor.prototype.hide = function ()
{
	removeDom();
};

let Loading = (options = {}) =>
{
	instance = getAnInstance();
	instance.size = options.size || "middle";
	instance.text = typeof options === 'string' ? options : options.text;
	instance.type = options.type || "ball";
	instance.bgColor = options.bgColor || "#ffffff";
	instance.fontColor = options.fontColor || "#555555";
	return instance;
};

export default Loading;