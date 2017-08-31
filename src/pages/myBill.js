

/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	var startTimeStr = g.timeTool.getDate(startTime, true);
	var endTimeStr = startTimeStr;
	g.net.call("order/queryConsumeOrderList", {
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': 'create_time',
		'sortOrder': 'desc',
		'inOutType': 0,
		'startTime':startTimeStr,
		'endTime':endTimeStr
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.rechargePool.removeAll();
		g.data.rechargePool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});

}











