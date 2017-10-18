/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	g.net.call("config/loadRuleConfig").then(($data) =>
	{
		g.data.rulePool.update($data)
		next();
	}, (err) =>
	{
		g.func.dealErr(err);
	});
}
