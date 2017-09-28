/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from "vue";

const TipsConstructor = Vue.extend(require("./tips.vue"));
let instance = null;

let getAnInstance = () =>
{
	if (instance)
	{
		return instance;
	}
	return new TipsConstructor({
		el: document.createElement('div')
	});
};

let removeDom = () =>
{
	if (instance.$el)
	{
		instance.event.target.removeChild(instance.$el);
	}
};

TipsConstructor.prototype.hide = function ()
{
	removeDom();
};

let Tips = (options = {}, $event) =>
{
	instance = getAnInstance();
	instance.position = options.position || "top";
	instance.text = typeof options === 'string' ? options : options.text;
	instance.event = typeof options === 'string' ? $event : options.event;
	if (instance.$el)
	{
		instance.event.target.appendChild(instance.$el);
	}
	Vue.nextTick(() =>
	{
		if (instance.$el.parentNode)
		{
			instance.$el.parentNode.style.position = "relative"
		}
	});

	return instance;
};

export default Tips;