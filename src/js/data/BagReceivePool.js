/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;

export default class BagReceivePool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('totalPage') && (_totalPage = $dObj.totalPage);
		for (var item of $dObj.data)
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.totalAmount = 0;
	d.rewardAmount = 0;
	d.receiveAmount = 0;
	d.receiveTime = "";
	d.activityName = "";
	d.batchNo = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('receiveId') && (this.id = $dObj.receiveId);

	$dObj.hasOwnProperty('receiveAmount') && (this.receiveAmount =  Number($dObj.receiveAmount)/100);
	$dObj.hasOwnProperty('platformRewardAmount') && (this.rewardAmount = Number($dObj.platformRewardAmount)/100);
	$dObj.hasOwnProperty('receiveTime') && (this.receiveTime = $dObj.receiveTime);
	$dObj.hasOwnProperty('activityName') && (this.activityName = $dObj.activityName);
	$dObj.hasOwnProperty('batchNo') && (this.batchNo = $dObj.batchNo);
	this.totalAmount = this.receiveAmount + this.rewardAmount
}




