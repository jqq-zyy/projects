/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);

export default class StaticTableHeaderPool {
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
		if (!_hash[itemData.id])
		{
			_hash[itemData.id] = itemData;
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
	d.id = 0;
	d.name = "";
	d.showIdCol = "";
	d.sortBy = "";
	d.params = "";
	d.calTotal = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('id') && (this.id = $dObj.id);
	$dObj.hasOwnProperty('showIdCol') && (this.showIdCol = $dObj.showIdCol);
	$dObj.hasOwnProperty('name') && (this.name = $dObj.name);
	$dObj.hasOwnProperty('sortBy') && (this.sortBy = $dObj.sortBy);
	$dObj.hasOwnProperty('params') && (this.params = $dObj.params);
	$dObj.hasOwnProperty('calTotal') && (this.calTotal = $dObj.calTotal);
}
