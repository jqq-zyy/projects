/**
 * Created by Hjai on 17/1/11.
 */
var _scanEchartsX = [];
var _scanList = [];
var _mapList = [];
var _mapHash = Object.create(null);
var _region = [];
var _sex = [];
var _sweep = [];
var _sexList = [];
var _max = 0;

export default class StatisticsPool {
	constructor()
	{
	}

	update($dObj)
	{
		if($dObj.hasOwnProperty('rangeStatistics')){
			for (var item of $dObj.rangeStatistics)
			{
				_scanEchartsX.push(item.sweepRange);
				_scanList.push(item.sweepCount);
			}
		}
		if($dObj.hasOwnProperty('regionStatistics')){
			for (var item of $dObj.regionStatistics)
			{
				var obj = {};
				obj.name = item.regionName;
				obj.value = item.regionCount;
				obj.id = item.regionId;
				_mapList.push(obj);
				if (!_mapHash[item.regionName])
				{
					_mapHash[item.regionName] = item.regionId;
				}
			}
		}
		if($dObj.hasOwnProperty('sexStatistics')){
			for (var item of $dObj.sexStatistics)
			{
				var obj = {};
				obj.name = item.sexName;
				obj.value = item.sexCount;
				obj.id = item.sexId;
				_sexList.push(obj);

			}
		}
		if($dObj.hasOwnProperty('regionResults')){
			_region = $dObj.regionResults;
			for(var i = 0;i<_region.length;i++){
				var count = _region[i].regionCount;
				if(count>_max){
					_max = count
				}
			}
		}
	}

	getDataById($id)
	{
		return _mapHash[$id];
	}


	get scanEchartsX()
	{
		return _scanEchartsX;
	}

	get scanList()
	{
		return _scanList;
	}

	get mapList()
	{
		return _mapList;
	}
	get max()
	{
		return _max;
	}

	get region()
	{
		return _region;
	}

	get sex()
	{
		return _sex;
	}

	get sweep()
	{
		return _sweep;
	}
	get sexList()
	{
		return _sexList;
	}

	removeAll()
	{
		_scanEchartsX = [];
		 _scanList = [];
		 _mapList = [];
		 _region = [];
		 _sex = [];
		 _sweep = [];
		 _sexList = [];
		 _max = 0;
	}
}




