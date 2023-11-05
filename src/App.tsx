import "@/app.scss";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import TheLoginBox from "./components/TheLoginBox";
import useInitStore from "./stores/useInitStore";
import { ToastContainer } from "react-toastify";

function App() {
	const router = useRoutes(routes);
	useInitStore();
	return (
		<div className='app'>
			{router}
			<TheLoginBox />
			<ToastContainer theme='dark' />
		</div>
	);
}

export default App;
