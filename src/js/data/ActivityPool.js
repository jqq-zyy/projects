/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _unpublishedCount = 0;
var _unstartedCount = 0;
var _onCount = 0;
var _pauseCount = 0;
var _completeCount = 0;
var _totalPage = 0;
var _total = 0;

export default class ActivityPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('unpublishedCount') && (_unpublishedCount = $dObj.unpublishedCount);
		$dObj.hasOwnProperty('unstartedCount') && (_unstartedCount = $dObj.unstartedCount);
		$dObj.hasOwnProperty('ongoingCount') && (_onCount = $dObj.ongoingCount);
		$dObj.hasOwnProperty('pauseCount') && (_pauseCount = $dObj.pauseCount);
		$dObj.hasOwnProperty('completeCount') && (_completeCount = $dObj.completeCount);
		_total = _unpublishedCount + _unstartedCount + _onCount + _pauseCount + _completeCount;
		if ($dObj.resultPageList)
		{
			$dObj.resultPageList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultPageList.totalPage);
			//$dObj.resultPageList.hasOwnProperty('total') && (_total = $dObj.resultPageList.total);
			for (var item of $dObj.resultPageList.data)
			{
				this.add(item);
			}
		}

	}

	add($dObj)
	{
		var itemData = createData($dObj);
		if (!_hash[itemData.activityNo])
		{
			_hash[itemData.activityNo] = itemData;
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

	get unpublishedCount()
	{
		return _unpublishedCount;
	}

	get unstartedCount()
	{
		return _unstartedCount;
	}

	get onCount()
	{
		return _onCount;
	}

	get pauseCount()
	{
		return _pauseCount;
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.activityNo = '';
	d.shopId = 0;
	d.activityName = '';
	d.startTime = "";
	d.endTime = "";
	d.creacteTime = "";
	d.status = 0;
	d.receivedCount = 0;
	d.relateCount = 0;
	d.receivedAmount = 0;
	d.relateStatus = 0;
	d.statusStr = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('activityId') && (this.id = $dObj.activityId);
	$dObj.hasOwnProperty('activityNo') && (this.activityNo = $dObj.activityNo);
	$dObj.hasOwnProperty('shopId') && (this.shopId = $dObj.shopId);
	$dObj.hasOwnProperty('activityName') && (this.activityName = $dObj.activityName);
	$dObj.hasOwnProperty('activityStartTimeStr') && (this.startTime = $dObj.activityStartTimeStr);
	$dObj.hasOwnProperty('activityEndTimeStr') && (this.endTime = $dObj.activityEndTimeStr);
	$dObj.hasOwnProperty('createTime') && (this.createTime = $dObj.createTime);
	$dObj.hasOwnProperty('activityStatus') && (this.status = $dObj.activityStatus);
	$dObj.hasOwnProperty('activityStatusStr') && (this.statusStr = $dObj.activityStatusStr);
	$dObj.hasOwnProperty('receivedCount') && (this.receivedCount = $dObj.receivedCount);
	$dObj.hasOwnProperty('receivedAmount') && (this.receivedAmount = $dObj.receivedAmount);
	$dObj.hasOwnProperty('relateQrCodeCount') && (this.relateCount = $dObj.relateQrCodeCount);
	$dObj.hasOwnProperty('relateStatus') && (this.relateStatus = $dObj.relateStatus);
}






