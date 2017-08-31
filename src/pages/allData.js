/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	var startTime = g.timeTool.getNowStamp() - g.timeTool.getPastSecond();
	var startTimeStr = g.timeTool.getDate(startTime, true);
	var endTimeStr = startTimeStr;
	g.ui.showLoading();
	g.net.call("statistic/overview",{
		'page':1,
		'pageSize':g.param.pageSizeList[0],
		'startTime':startTimeStr,
		'endTime':endTimeStr
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.allDataPool.removeAll();
		g.data.allDataPool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});

}





