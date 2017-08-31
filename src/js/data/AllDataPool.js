/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _receiveCount = 0;
var _memberCount = 0;
var _newMemberCount = 0;
var _totalAmount = 0;
var _averageAmount = 0;
var _totalPage = 0;

export default class AllDataPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('receiveRpCount') && (_receiveCount = $dObj.receiveRpCount);
		$dObj.hasOwnProperty('receiveRpMemberCount') && (_memberCount = $dObj.receiveRpMemberCount);
		$dObj.hasOwnProperty('memberIncreasedCount') && (_newMemberCount = $dObj.memberIncreasedCount);
		$dObj.hasOwnProperty('totalRpAmount') && (_totalAmount = $dObj.totalRpAmount);
		$dObj.hasOwnProperty('averageRpAmount') && (_averageAmount = $dObj.averageRpAmount);
		$dObj.resultList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultList.totalPage);
		for (var item of $dObj.resultList.data)
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

	get receiveCount()
	{
		return _receiveCount;
	}

	get memberCount()
	{
		return _memberCount;
	}

	get newMemberCount()
	{
		return _newMemberCount;
	}

	get totalAmount()
	{
		return _totalAmount;
	}

	get averageAmount()
	{
		return _averageAmount;
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
		_receiveCount = 0;
		_memberCount = 0;
		_newMemberCount = 0;
		_totalAmount = 0;
		_averageAmount = 0;
		_totalPage = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.activityName = '';
	d.receivedCountStr = "";
	d.memberCountStr = "";
	d.newMemberCountStr = "";
	d.totalAmountStr = "";
	d.averageAmountStr = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('activityId') && (this.id = $dObj.activityId);
	$dObj.hasOwnProperty('activityName') && (this.activityName = $dObj.activityName);
	$dObj.hasOwnProperty('receiveRpCountStr') && (this.receivedCountStr = $dObj.receiveRpCountStr);
	$dObj.hasOwnProperty('receiveRpMemberCountStr') && (this.memberCountStr = $dObj.receiveRpMemberCountStr);
	$dObj.hasOwnProperty('memberIncreasedCountStr') && (this.newMemberCountStr = $dObj.memberIncreasedCountStr);
	$dObj.hasOwnProperty('totalRpAmountStr') && (this.totalAmountStr = $dObj.totalRpAmountStr);
	$dObj.hasOwnProperty('averageRpAmountStr') && (this.averageAmountStr = $dObj.averageRpAmountStr);
}





