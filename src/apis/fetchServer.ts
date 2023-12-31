import useLoginStore from "@/stores/useLoginStore";
import { toast } from "react-toastify";

/** 请求Body参数 */
type RequestBody = RequestInit["body"];

/**
 * 封装fetch请求
 */
export class FetchService {
	private requestInterceptors: Array<
		(url: string, options: RequestInit) => void
	> = [];
	private responseInterceptors: Array<(response: Response) => void> = [];

	async get<T>(url: string, options?: RequestInit): Promise<T> {
		return this._request("GET", url, options);
	}

	async post<T>(
		url: string,
		body: RequestBody,
		options?: RequestInit
	): Promise<T> {
		return this._request("POST", url, { ...options, body });
	}

	async put<T>(
		url: string,
		body: RequestBody,
		options?: RequestInit
	): Promise<T> {
		return this._request("PUT", url, { ...options, body });
	}

	async delete<T>(url: string, options?: RequestInit): Promise<T> {
		return this._request("DELETE", url, options);
	}

	/**
	 * 添加请求拦截器
	 */
	addRequestInterceptor(
		interceptor: (url: string, options: RequestInit) => void
	) {
		this.requestInterceptors.push(interceptor);
	}

	/**
	 * 添加响应拦截器
	 */
	addResponseInterceptor(interceptor: (response: Response) => void) {
		this.responseInterceptors.push(interceptor);
	}

	/**
	 * 共用请求逻辑
	 */
	private async _request<T>(
		method: RequestInit["method"],
		url: string,
		options?: RequestInit
	): Promise<T> {
		/** 请求body参数 */
		const body = (function () {
			const headers = new Headers(Object.entries(options?.headers || {}));
			if (!options) return undefined;
			if (headers && headers.get("Content-Type") === "application/json") {
				return JSON.stringify(options.body);
			}
			return options.body;
		})();

		/** 请求参数 */
		const theOptions: RequestInit = {
			method: method,
			...options,
			headers: {
				// "Content-Type": "application/json",
				// 当options中有data且为FormData时，不设置Content-Type
				...(body instanceof FormData
					? {}
					: { "Content-Type": "application/json" }),

				...options?.headers,
			},
			body,
		};

		// 拼接url
		url = import.meta.env.VITE_API_PREFIX + url;

		this.runRequestInterceptors(url, theOptions);
		const response = await fetch(url, theOptions);
		this.runResponseInterceptors(response);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		try {
			const data: ResponseType.Response<T> = await response.json();
			return this._responseProcess(data);
		} catch (e) {
			throw new Error("数据解析错误");
		}
	}

	/**
	 * 响应处理
	 */
	_responseProcess<T>(response: ResponseType.Response<T>) {
		return response.result;
	}

	/**
	 * 请求拦截器
	 */
	private runRequestInterceptors(url: string, options: RequestInit) {
		this.requestInterceptors.forEach((interceptor) =>
			interceptor(url, options)
		);
	}

	/**
	 * 响应拦截器
	 */
	private runResponseInterceptors(response: Response) {
		this.responseInterceptors.forEach((interceptor) =>
			interceptor(response)
		);
	}
}

const fetchService = new FetchService();

// 添加请求拦截器
// fetchService.addRequestInterceptor((url, options) => {
// 	options.headers = {
// 		...options.headers,
// 		Authorization: "Bearer " + localStorage.getItem("token"),
// 	};
// });

// 添加网络错误拦截器
fetchService.addResponseInterceptor((response) => {
	const errorMessages: Record<number, string> = {
		401: "没有登录",
		403: "没有权限",
		404: "接口不存在",
		500: "服务器错误",
		502: "服务器错误",
		503: "服务器错误",
		504: "服务器错误",
	};

	if (response.status in errorMessages) {
		console.error(errorMessages[response.status]);
		if (response.status === 403) {
			toast.info("未登录 点击登录", {
				toastId: "login",
				onClick: () => {
					useLoginStore.getState().showLoginBox();
				},
			});
		}
		if (response.status >= 500 && response.status <= 504) {
			toast.error("服务器错误 请稍后重试 ", {
				toastId: "服务器错误",
			});
		}
	}
});

export default fetchService;
