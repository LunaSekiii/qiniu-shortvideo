import "@/app.scss";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import TheLoginBox from "./components/TheLoginBox";
import useInitStore from "./stores/useInitStore";

function App() {
	const router = useRoutes(routes);
	useInitStore();
	return (
		<div className='app'>
			{router}
			<TheLoginBox />
		</div>
	);
}

export default App;
