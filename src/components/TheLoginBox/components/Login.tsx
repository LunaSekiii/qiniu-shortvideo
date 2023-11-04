import { useState } from "react";
import style from "../Login.module.scss";
import useLoginStore from "@/stores/useLoginStore";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorItem, setErrorItem] = useState<string[]>([]); // 错误项 [username, password]
	const login = useLoginStore((state) => state.login);
	const submit = () => {
		// 表单校验
		if (!username || !password) {
			return;
		}
		login({ username, password });
	};

	return (
		<div className={style.form}>
			<input
				type='text'
				className={style.input}
				value={username}
				onChange={(e) => setUsername(e.currentTarget.value)}
				placeholder='用户名'
				data-onError={errorItem.includes("username")}
			/>
			<input
				type='password'
				className={style.input}
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
				placeholder='密码'
				data-onError={errorItem.includes("password")}
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					submit();
				}}
				className={style.btn}
			>
				登录
			</button>
		</div>
	);
}
