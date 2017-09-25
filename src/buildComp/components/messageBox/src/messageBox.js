/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from "vue";

const MessageBoxConstructor = Vue.extend(require("./messageBox.vue"));
let instance = null;
let loaded = false;

let getAnInstance = () =>
{
	if (instance)
	{
		return instance;
	}
	return new MessageBoxConstructor({
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

MessageBoxConstructor.prototype.close = function ()
{
	removeDom();
};

// title,message,confirmCallBack,cancelCallBack
// option = {}
let MessageBox = (...args) =>
{
	if (!instance)
	{
		instance = getAnInstance();
	}

	if (typeof args[0] === 'object')
	{
		instance.type = args[0].type || "confirm";
		instance.title = args[0].title || "";
		instance.message = args[0].message || "";
		instance.cancelText = args[0].cancelText || "取消";
		instance.cancelCallBack = args[0].cancelCallBack || null;
		instance.confirmText = args[0].confirmText || "确认";
		instance.confirmCallBack = args[0].confirmCallBack || null;
	}
	else if (typeof args[0] === "string")
	{
		instance.title = args[0] || "";
		instance.message = args[1] || "";
		instance.confirmCallBack = args[2] || null;
		instance.cancelCallBack = args[3] || null;
	}
	if (instance.$el)
	{
		document.body.appendChild(instance.$el);
		loaded = true;
	}
	return instance;
};

export default MessageBox;