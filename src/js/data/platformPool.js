/**
 * Created by Hjai on 17/1/11.
 */
var _list = [];
var _hash = Object.create(null);
var _totalPage = 0;
var _total = 0;
var _totalIncome = 0;
var _totalDisburse = 0;
var _balance = 0;
var _typeData = {};

export default class PlatformPool {
	constructor()
	{
	}

	update($dObj)
	{
		$dObj.hasOwnProperty('totalIncome') && (_totalIncome = $dObj.totalIncome);
		$dObj.hasOwnProperty('totalDisburse') && (_totalDisburse = $dObj.totalDisburse);
		$dObj.hasOwnProperty('balance') && (_balance = $dObj.balance);
		$dObj.hasOwnProperty('typeData') && (_typeData = $dObj.typeData);

		if($dObj.hasOwnProperty('resultPageList')){
			$dObj.resultPageList.hasOwnProperty('totalPage') && (_totalPage = $dObj.resultPageList.totalPage);
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
	

	get list()
	{
		return _list;
	}

	get totalIncome()
	{
		return _totalIncome;
	}

	get totalDisburse()
	{
		return _totalDisburse;
	}

	get balance()
	{
		return _balance;
	}

	get typeData()
	{
		return _typeData;
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
	d.recordType = 0;
	d.author = "";
	d.beginTime = "";
	d.amount = 0;
	d.remarks = "";
	d.recordTypeDesc = "";
	d.amountDesc = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty('recordId') && (this.id = $dObj.recordId);
	$dObj.hasOwnProperty('recordType') && (this.recordType = $dObj.recordType);
	$dObj.hasOwnProperty('author') && (this.author = $dObj.author);
	$dObj.hasOwnProperty('beginTime') && (this.beginTime = $dObj.beginTime);
	$dObj.hasOwnProperty('amount') && (this.amount = $dObj.amount);
	$dObj.hasOwnProperty('remarks') && (this.remarks = $dObj.remarks);
	$dObj.hasOwnProperty('recordTypeDesc') && (this.recordTypeDesc = $dObj.recordTypeDesc);
	$dObj.hasOwnProperty('amountDesc') && (this.amountDesc = $dObj.amountDesc);
	
}
