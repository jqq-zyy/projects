/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	g.ui.showLoading();
	g.net.call("asset/queryAdminIncomeAsset").then(($data) =>
	{
		g.ui.hideLoading();
		g.data.platformPool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}


