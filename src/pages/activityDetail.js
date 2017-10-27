/**
 * Created by billy on 2017/3/13.
 */
export default function (to, next)
{
	var id = to.query.id;
	queryActivityDetail(id,next)
}

export function queryActivityDetail($id,$callback) {
	g.net.call("activity/queryActivityDetail",{
		"activityId":$id
	}).then(($data) =>
	{
		g.data.activityDetailPool.removeAll();
		g.data.activityDetailPool.update($data);
		$callback();
	}, (err) =>
	{
		g.func.dealErr(err);

	});
}
