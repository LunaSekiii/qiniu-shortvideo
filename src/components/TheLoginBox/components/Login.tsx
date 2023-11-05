import { useState } from "react";
import style from "../Login.module.scss";
import useLoginStore from "@/stores/useLoginStore";

export function Login({ submitCallback }: { submitCallback?: () => void }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const login = useLoginStore((state) => state.login);
	const submit = () => {
		login({ username, password });
	};

	return (
		<form
			className={style.form}
			onSubmit={(e) => {
				e.preventDefault();
				submit();
				submitCallback?.();
			}}
		>
			<input
				type='text'
				className={style.input}
				value={username}
				onChange={(e) => setUsername(e.currentTarget.value)}
				placeholder='用户名'
				required
			/>
			<input
				type='password'
				className={style.input}
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
				placeholder='密码'
				required
			/>
			<button className={style.btn}>登录</button>
		</form>
	);
}
