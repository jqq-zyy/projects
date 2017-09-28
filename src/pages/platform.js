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
	g.net.call("order/queryPlatformAccountOverview" ).then(($data) =>
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














