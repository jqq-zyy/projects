/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class ActivityStatusPool {
	constructor()
	{
	}

	update($list)
	{
		for (var item of $list)
		{
			this.add(item);
		}
	}

	add($dObj)
	{
		var itemData = createData($dObj);
		if (!_hash[itemData.stateCode])
		{
			_hash[itemData.stateCode] = itemData;
			_list.push(itemData);
		}
	}

	remove($id)
	{
		var index = _list.indexOf(_hash[$id]);
		if (index != -1)
		{
			_list.splice(index, 1);
		}
	}

	get list()
	{
		return _list;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
	}
}

function createData($dObj)
{
	var d = {};
	d.stateCode = 0;
	d.stateDesc = '';
	d.stateCountDesc = '';
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('stateCode') && (this.stateCode = $dObj.stateCode);
	$dObj.hasOwnProperty('stateDesc') && (this.stateDesc = $dObj.stateDesc);
	$dObj.hasOwnProperty('stateCountDesc') && (this.stateCountDesc = $dObj.stateCountDesc);
}
