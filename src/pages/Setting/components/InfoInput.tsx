import style from "../Setting.module.scss";

/**
 * 个人信息输入组件
 */
export function InfoInput({
	label,
	data,
	setData,
}: {
	label: string;
	data?: string;
	setData: (data: string) => void;
}) {
	return (
		<label className={style.input}>
			{label}
			<input
				type='text'
				placeholder={label}
				value={data}
				onChange={(e) => {
					setData(e.target.value);
				}}
				required
			/>
		</label>
	);
}
