/**
 * Created by billy on 2017/3/13.
 */
import g from "../global";
import {updateData} from "./userList";
export default function (to, next)
{
	g.ui.showLoading();

	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	g.net.call("activity/queryActivityStatisticOverview", {
		'page': 1,
		'pageSize': g.param.pageSizeList[0],

	}).then(($data) =>
	{
		g.ui.hideLoading();
		updateData("activityHeader");
		g.data.activityPool.removeAll();
		g.data.activityPool.update($data.resultPageList);
		g.data.activityStatusPool.update($data.activityStatus);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}







