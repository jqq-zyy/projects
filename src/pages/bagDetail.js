/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	g.net.call("/bagdetail", {
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
		g.data.bagDetailPool.removeAll();
		g.data.bagDetailPool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}













