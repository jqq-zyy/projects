/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	g.net.call("memberStatistics/statistics").then(($data) =>
	{

		g.data.statisticsPool.update($data);
		g.ui.hideLoading();
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
	
}


