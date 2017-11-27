/**
 * Created by Hjai on 17/1/11.
 */
var _timeList = [];
var _dataList = [];

export default class ScanTimeEchartsPool {
	constructor()
	{
	}

	update($dObj)
	{
		for (var item of $dObj)
			{
				_timeList.push(item.time+":00");
				_dataList.push(item.value);
			}
	}



	get timeList()
	{
		return _timeList;
	}

	get dataList()
	{
		return _dataList;
	}

	removeAll()
	{
		_timeList = [];
		_dataList = [];
	}
}

