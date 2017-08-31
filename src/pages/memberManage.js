/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	g.net.calls("memberLevel/levelList").then(($data) =>
	{

		g.data.memberPool.update($data[0].data);
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}