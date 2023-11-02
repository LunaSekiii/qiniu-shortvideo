import style from "./BaseSwitch.module.scss";
/**
 * 开关组件
 */
function BaseSwitch({ onCheck }: { onCheck: boolean }) {
	return <div className={style.switch} data-checked={onCheck} />;
}

export default BaseSwitch;
