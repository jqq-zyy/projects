/**
 * Created by billy on 2017/3/13.
 */
import g from '../global';
export default function (to, next)
{
	g.ui.showLoading();
	g.net.call("shop/shopList").then(($data) =>
	{
		var obj = {};
		 obj.data = $data;
		g.data.userPool.removeAll();
		g.data.userPool.update($data);
		g.ui.hideLoading();
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}














