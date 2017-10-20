/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _shopRpAmount = 0;
var _platformRpAmount = 0;
var _total = 0;
var _totalPage = 0;

export default class BagDetailPool {
	constructor()
	{
	}

	update($dObj)
	{
		if($dObj.model){
			$dObj.model.hasOwnProperty('shopRpAmount') && (_shopRpAmount = $dObj.model.shopRpAmount);
			$dObj.model.hasOwnProperty('platformRpAmount') && (_platformRpAmount = $dObj.model.platformRpAmount);
		}
		$dObj.hasOwnProperty('total') && (_total = $dObj.total);
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

	get shopRpAmount()
	{
		return _shopRpAmount;
	}

	get platformRpAmount()
	{
		return _platformRpAmount;
	}

	get totalPage()
	{
		return _totalPage;
	}

	get total()
	{
		return _total;
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	removeAll()
	{
		_list = [];
		_hash = Object.create(null);
		_total = 0;
		_totalPage = 0;
		_shopRpAmount = 0;
		_platformRpAmount = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.shopAmount = 0;
	d.platformAmount = 0;
	d.status = 0;
	d.statusDesc = "";
	d.alipayAccount = "";
	d.mobileType = "";
	d.cityName = "";
	d.createTime = "";
	d.activityName = "";
	d.companyFullName = "";
	d.rpBrand = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('receiveId') && (this.id = $dObj.receiveId);
	$dObj.hasOwnProperty('shopAmount') && (this.shopAmount = $dObj.shopAmount);
	$dObj.hasOwnProperty('platformRewardAmount') && (this.platformAmount = $dObj.platformRewardAmount);
	$dObj.hasOwnProperty('receiveStatus') && (this.status = $dObj.receiveStatus);
	$dObj.hasOwnProperty('receiveStatusDesc') && (this.statusDesc = $dObj.receiveStatusDesc);
	$dObj.hasOwnProperty('receiverAlipayAccount') && (this.alipayAccount = $dObj.receiverAlipayAccount);
	$dObj.hasOwnProperty('mobileType') && (this.mobileType = $dObj.mobileType);
	$dObj.hasOwnProperty('cityName') && (this.cityName = $dObj.cityName);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('activityName') && (this.activityName = $dObj.activityName);
	$dObj.hasOwnProperty('companyFullName') && (this.companyFullName = $dObj.companyFullName);
	$dObj.hasOwnProperty('rpBrand') && (this.rpBrand = $dObj.rpBrand);
}
