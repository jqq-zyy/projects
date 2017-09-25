/**
 * Created by Administrator on 2017/7/9.
 */
import Vue from "vue";
const AlertConstructor = Vue.extend(require('./alert.vue'));

let instance = null;
let loaded = false;
const getAnInstance = function ()
{
	if (instance)
	{
		return instance;
	}
	return new AlertConstructor({
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

AlertConstructor.prototype.close = () =>
{
	removeDom();
};

let Alert = (options = {}) =>
{
	if (!instance)
	{
		instance = getAnInstance();
	}
	instance.title = options.title || "系统提示";
	instance.desc = options.desc || "";
	instance.btnType = options.btnType || "primary";
	instance.btnText = options.btnText || "确定";
	instance.iconType = options.iconTyp;
	instance.iconUrl = options.iconUrl;
	instance.iconClass = options.iconClass;
	instance.callback = options.callback;

	trace('instance===============1',instance);
	if (instance.$el)
	{
		document.body.appendChild(instance.$el);
		loaded = true;
	}
	return instance;
};

export default Alert;