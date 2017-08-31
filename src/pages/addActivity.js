import g from '../global';
export default function (to, next)
{
	getActivity(next);

}

export function getActivity ($callBack){
	g.net.calls("memberLevel/levelList", "config/getProvinceList").then(($list) =>
	{
		g.data.memberPool.update($list[0].data);
		g.data.areaPool.update($list[1].data);
		if($callBack){
			$callBack();
		}

	}, (err) =>
	{
		g.func.dealErr(err);
	});
}






