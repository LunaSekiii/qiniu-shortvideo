import { useState } from "react";
import style from "../Login.module.scss";
import { toast } from "react-toastify";

export function Register({ submitCallback }: { submitCallback?: () => void }) {
	// 表单信息
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [verifyCode, setVerifyCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [sendVerifyCodeCoolingTime, setSendVerifyCodeCoolingTime] =
		useState(0);
	const [verifyCodeInputVisible, setVerifyCodeInputVisible] = useState(false);

	const submit = () => {
		// 表单校验
		if (
			!username ||
			!email ||
			!password ||
			!confirmPassword ||
			password != confirmPassword
		) {
			return;
		}
		submitCallback?.();
	};

	const sendVerifyCode = () => {
		if (sendVerifyCodeCoolingTime > 0) return;
		// 正则校验邮箱格式
		const emailReg =
			/^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
		if (!emailReg.test(email)) {
			return toast.error("邮箱格式不正确", {
				toastId: "email-format-error",
			});
		}

		setVerifyCodeInputVisible(true);
		setSendVerifyCodeCoolingTime(60);
		const timer = setInterval(() => {
			setSendVerifyCodeCoolingTime((time) => {
				if (time <= 0) {
					clearInterval(timer);
					return 0;
				}
				return time - 1;
			});
		}, 1000);
	};
	return (
		<form
			className={style.form}
			data-register
			onSubmit={(e) => {
				e.preventDefault();
				console.log("register");
				submit();
			}}
		>
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className={style.input}
				placeholder='用户名'
				required
			/>
			<label className={style.input + " " + style["input-content"]}>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='邮箱'
					required
				/>
				<div className={style.label} onClick={sendVerifyCode}>
					{sendVerifyCodeCoolingTime == 0
						? "发送验证码"
						: sendVerifyCodeCoolingTime + "s再次发送"}
				</div>
			</label>
			{/* <label className={style.input + " " + style["input-content"]}> */}

			<input
				type='text'
				value={verifyCode}
				onChange={(e) => setVerifyCode(e.target.value)}
				className={style.input}
				style={{ display: verifyCodeInputVisible ? "block" : "none" }}
				placeholder='邮件验证码'
				required
			/>

			{/* <div className={style.label}>验证</div> */}
			{/* </label> */}
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={style.input}
				placeholder='密码'
				required
			/>
			<input
				type='password'
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				className={style.input}
				placeholder='确认密码'
				required
			/>
			<button className={style.btn}>注册</button>
		</form>
	);
}
