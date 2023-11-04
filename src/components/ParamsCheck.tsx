import { useEffect } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

/**
 * ReactRouter params参数校验
 */
function ParamsChecker<T extends string>({
	children,
	checkOption,
	redirect,
}: {
	children: React.ReactNode;
	checkOption: (
		params: Readonly<
			[Record<T, string>] extends [string]
				? Params<string & Record<T, string>>
				: Partial<Record<T, string>>
		>
	) => boolean;
	redirect?: string;
}) {
	const params = useParams<Record<T, string>>();

	const navigate = useNavigate();

	useEffect(() => {
		if (!checkOption(params)) {
			if (redirect) {
				navigate(redirect, {
					replace: true,
				});
			}
		}
	}, [checkOption, navigate, params, redirect]);

	if (checkOption(params)) {
		return children;
	} else {
		return null;
	}
}

export default ParamsChecker;
