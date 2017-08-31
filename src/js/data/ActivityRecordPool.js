/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;

export default class ActivityRecordPool {
	constructor()
	{
	}

	update($Obj)
	{
		$Obj.hasOwnProperty('totalPage') && (_totalPage = $Obj.totalPage);
		for (var item of $Obj.data)
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

	get totalPage()
	{
		return _totalPage;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_totalPage = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.time = 0;
	d.ruleType = '';
	d.receivedCount = 0;
	d.receivedAmount = 0;
	d.modifyTime = '';
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('id') && (this.id = $dObj.id);
	$dObj.hasOwnProperty('validTimeSlot') && (this.time = $dObj.validTimeSlot);
	$dObj.hasOwnProperty('ruleType') && (this.ruleType = $dObj.ruleType);
	$dObj.hasOwnProperty('receivedCount') && (this.receivedCount = $dObj.receivedCount);
	$dObj.hasOwnProperty('receivedAmount') && (this.receivedAmount = $dObj.receivedAmount);
	$dObj.hasOwnProperty('modifyTime') && (this.modifyTime = $dObj.modifyTime);
}
