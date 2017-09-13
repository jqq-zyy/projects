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
	g.net.call("/account/queryPlatformAccountOverview", {
		'recordTypes': "",
		'beginTimeStart': startTimeStr,
		'beginTimeEnd': endTimeStr,
		"recordId":"",
		"author":"",
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': "",
		'sortOrder': "desc"
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.platformPool.removeAll();
		g.data.platformPool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}














