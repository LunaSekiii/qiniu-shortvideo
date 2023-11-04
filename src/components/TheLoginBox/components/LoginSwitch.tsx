import style from "../Login.module.scss";

export function LoginSwitch({
	checkeds,
	setCheckeds,
}: {
	checkeds: boolean;
	setCheckeds: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div
			className={style.switch}
			data-checked={checkeds}
			onClick={() => {
				setCheckeds((c) => !c);
			}}
		>
			<div className={style.option}>登录</div>
			<div className={style.option}>注册</div>
		</div>
	);
}
