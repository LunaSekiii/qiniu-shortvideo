import { useLayoutEffect, useRef, useState } from "react";
import style from "./Login.module.scss";
import SVGIcon from "../SVGIcon";
import { LoginSwitch } from "./components/LoginSwitch";
import { Login } from "./components/Login";
import useLoginStore from "@/stores/useLoginStore";
import { Register } from "./components/Register";

/**
 * 登录组件
 */
function LoginBox() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [isRegister, setIsRegister] = useState(false);
	const loginBoxVisible = useLoginStore((state) => state.loginBoxVisible);
	const closeLoginBox = useLoginStore((state) => state.closeLoginBox);

	useLayoutEffect(() => {
		if (loginBoxVisible) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [loginBoxVisible]);

	return (
		<dialog
			className={style["login-box"]}
			ref={dialogRef}
			onClose={() => {
				closeLoginBox();
			}}
		>
			<form method='dialog'>
				<button className={style["close-btn"]}>
					<SVGIcon name='close' />
				</button>
				<div className={style.login}>
					<h1 className={style.title}>Fleeting Flow</h1>

					<LoginSwitch
						checkeds={isRegister}
						setCheckeds={setIsRegister}
					/>
					{isRegister ? <Register /> : <Login />}
				</div>
			</form>
		</dialog>
	);
}

export default LoginBox;
