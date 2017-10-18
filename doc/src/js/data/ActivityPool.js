/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _total = 0;
var _totalQrCodeNum = 0;
var _totalScanCount = 0;
var _totalUseRpAmount = 0;
var _totalUseRpAmountDesc = 0;

export default class ActivityPool {
	constructor()
	{
	}

	update($dObj)
	{

		$dObj.hasOwnProperty('totalPage') && (_totalPage = $dObj.totalPage);
		if ($dObj.model)
		{
			$dObj.model.hasOwnProperty('totalQrCodeNum') && (_totalQrCodeNum = $dObj.model.totalQrCodeNum);
			$dObj.model.hasOwnProperty('totalScanCount') && (_totalScanCount = $dObj.model.totalScanCount);
			$dObj.model.hasOwnProperty('totalUseRpAmount') && (_totalUseRpAmount = $dObj.model.totalUseRpAmount);
			$dObj.model.hasOwnProperty('totalUseRpAmountDesc') && (_totalUseRpAmountDesc = $dObj.model.totalUseRpAmountDesc);
		}
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

	get totalQrCodeNum()
	{
		return _totalQrCodeNum;
	}

	get totalScanCount()
	{
		return _totalScanCount;
	}

	get totalUseRpAmount()
	{
		return _totalUseRpAmount;
	}

	get totalUseRpAmountDesc()
	{
		return _totalUseRpAmountDesc;
	}

	get completeCount()
	{
		return _completeCount;
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
		_totalPage = 0;
		_total = 0;
		_totalQrCodeNum = 0;
		_totalScanCount = 0;
		_totalUseRpAmount = 0;
		_totalUseRpAmountDesc = 0;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.shopId = 0;
	d.activityName = '';
	d.companyName = '';
	d.brandName = '';
	d.activityStatus = 0;
	d.activityStatusDesc = 0;
	d.createTime = "";
	d.startTime = "";
	d.endTime = "";
	d.createTime = "";
	d.createTimeDesc = 0;
	d.qrCodeNum = 0;
	d.totalScanCount = 0;
	d.useRpAmount = 0;
	d.useRpAmountDesc = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('activityId') && (this.id = $dObj.activityId);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('activityName') && (this.activityName = $dObj.activityName);
	$dObj.hasOwnProperty('brandName') && (this.brandName = $dObj.brandName);
	$dObj.hasOwnProperty('companyFullName') && (this.companyName = $dObj.companyFullName);
	$dObj.hasOwnProperty('activityStatus') && (this.activityStatus = $dObj.activityStatus);
	$dObj.hasOwnProperty('activityStatusDesc') && (this.activityStatusDesc = $dObj.activityStatusDesc);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('createTimeDesc') && (this.createTimeDesc = $dObj.createTimeDesc);
	$dObj.hasOwnProperty('qrCodeNum') && (this.qrCodeNum = $dObj.qrCodeNum);
	$dObj.hasOwnProperty('totalScanCount') && (this.totalScanCount = $dObj.totalScanCount);
	$dObj.hasOwnProperty('useRpAmount') && (this.useRpAmount = $dObj.useRpAmount);
	$dObj.hasOwnProperty('useRpAmountDesc') && (this.useRpAmountDesc = $dObj.useRpAmountDesc);
	$dObj.hasOwnProperty('activityStartTimeDesc') && (this.startTime = $dObj.activityStartTimeDesc);
	$dObj.hasOwnProperty('activityEndTimeDesc') && (this.endTime = $dObj.activityEndTimeDesc);

}