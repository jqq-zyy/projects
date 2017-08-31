/**
 * Created by Hjai on 17/1/11.
 */
var _level = [];
var _region = [];
var _sex = [];
var _sweep = [];
var _max = 0;

export default class ActivityPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('levelResults') && (_level = $dObj.levelResults);
		$dObj.hasOwnProperty('sexResults') && (_sex = $dObj.sexResults);
		$dObj.hasOwnProperty('sweepResults') && (_sweep = $dObj.sweepResults);
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

	add($dObj)
	{
	}

	remove($id)
	{
	}


	get level()
	{
		return _level;
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

	removeAll()
	{
		_level = [];
		_region = [];
		_sex = [];
		_sweep = [];
	}
}




