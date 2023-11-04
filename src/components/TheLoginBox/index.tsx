import { useLayoutEffect, useRef, useState } from "react";
import style from "./Login.module.scss";
import SVGIcon from "../SVGIcon";
import { LoginSwitch } from "./components/LoginSwitch";
import { Login } from "./components/Login";
import useLoginStore from "@/stores/useLoginStore";

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

function Register() {
	return (
		<div className={style.form} data-register>
			<input type='text' className={style.input} placeholder='用户名' />
			<label className={style.input + " " + style["input-content"]}>
				<input type='email' placeholder='邮箱' />
				<div className={style.label}>发送验证码</div>
			</label>
			<label className={style.input + " " + style["input-content"]}>
				<input type='text' placeholder='邮件验证码' />
				<div className={style.label}>验证</div>
			</label>
			<input type='password' className={style.input} placeholder='密码' />
			<input
				type='password'
				className={style.input}
				placeholder='确认密码'
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
				}}
				className={style.btn}
			>
				注册
			</button>
		</div>
	);
}

export default LoginBox;
