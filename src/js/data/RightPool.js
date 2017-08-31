/**
 * Created by billy on 2016/12/19.
 */
var _list = []; //string[]

export default class RightPool {
	constructor()
	{

	}

	/**
	 * 更新权限列表
	 * @param $list
	 */
	update($list)
	{
		for (var right of $list)
		{
			this.add(right);
		}
	}

	/**
	 * 增加权限
	 * @param right 权限key
	 */
	add(right)
	{
		_list.indexOf(right) < 0 && _list.push(right);
	}

	/**
	 * 删除权限
	 * @param right 权限key
	 */
	remove(right)
	{
		_list.indexOf(right) >= 0 && _list.splice(_list.indexOf(right), 1);
	}

	/**
	 * 判断是否拥有权限
	 * @param args 权限key参数组
	 * @returns {boolean}
	 */
	hasRight(...args)
	{
		if (_list.length == 0)
		{
			return false;
		}

		if (_list.indexOf("*") >= 0)
		{
			return true;
		}

		for (var i = 0; i < args.length; i++)
		{
			if (_list.indexOf(args[i]) < 0)
			{
				return false;
			}
		}

		return true;
	}
}