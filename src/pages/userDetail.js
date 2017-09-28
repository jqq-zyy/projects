/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	var id = to.query.id;
	g.net.call("user/queryShopDetail",{
		"shopId":id
	}).then(($data) =>
	{
		g.data.userDetailPool.update($data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}