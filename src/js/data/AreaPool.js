/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);


export default class AreaPool {
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
	d.id =$dObj.id;
	d.name = $dObj.name;
	d.level = $dObj.level;
	d.upid = $dObj.upid;
	d.useStatus = $dObj.useStatus;
	d.cityList = [];
	return d;




}

