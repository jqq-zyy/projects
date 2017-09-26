/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	startTime = g.timeTool.getDate(startTime, true);
	var endTime = startTime;
	g.net.call("order/queryRpAccountList", {
		'queryStatus': 0,
		'startTime':startTime,
		'endTime':endTime,
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': "",
		'sortOrder': ""
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.bagPool.removeAll();
		g.data.bagPool.update($data);

		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
















