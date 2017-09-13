/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	g.net.call("/bag", {
		'ruleType': "",
		'activityStatus': 0,
		'activityName': "",
		'page': 1,
		'pageSize': g.param.pageSizeList[0],
		'sortField': "",
		'sortOrder': ""
	}).then(($data) =>
	{
		g.ui.hideLoading();
		g.data.bagPool.removeAll();
		g.data.bagPool.update($data.data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}














