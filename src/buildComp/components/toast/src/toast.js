/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from "vue";
;

const ToastConstructor = Vue.extend(require("./toast.vue"));
let instance = null;
let loaded = false;

let getAnInstance = () =>
{
	if (instance)
	{
		return instance;
	}
	return new ToastConstructor({
		el: document.createElement('div')
	});
};

let destroyInstance = () =>
{
	instance = null;
}

let removeDom = () =>
{
	if (loaded && instance.$el)
	{
		document.body.removeChild(instance.$el);
		loaded = false;
		destroyInstance();
	}
};

ToastConstructor.prototype.hide = function ()
{
	removeDom();
};

let Toast = (options = {}, duration = 3000) =>
{
	if (!instance)
	{
		instance = getAnInstance();
	}
	clearTimeout(instance.timer);
	instance.text = typeof options === 'string' ? options : options.text;
	instance.duration = typeof options === 'string' ? duration : options.duration;
	instance.position = options.position || "middle";
	instance.iconClass = options.iconClass;
	instance.iconType = options.iconType;
	if (instance.$el)
	{
		document.body.appendChild(instance.$el);
		loaded = true;
	}
	Vue.nextTick(() =>
	{
		instance.timer = setTimeout(() =>
		{
			instance.hide();
		}, instance.duration)
	});

	return instance;
};

export default Toast;