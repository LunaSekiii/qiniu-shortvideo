import style from "./Dropdown.module.scss";

type DropdownProps = {
	label: React.ReactNode;
	children: React.ReactNode;
};

/**
 * 下拉菜单组件
 */
function Dropdown({ label, children }: DropdownProps) {
	return (
		<div className={style.dropdown}>
			{label}
			<div className={style.main}>{children}</div>
		</div>
	);
}

export default Dropdown;
