import React, { Suspense } from "react";

function LazyLoad({
	component: Component,
	...props
}: {
	component: () => Promise<{
		default: React.LazyExoticComponent<React.ComponentType>;
	}>;
}) {
	return (
		// <Route
		// 	{...rest}
		// 	render={(props) => (

		// 	)}
		// />

		<Suspense fallback={<div>Loading...</div>}>
			<Component {...props} />
		</Suspense>
	);
}

export default LazyLoad;
