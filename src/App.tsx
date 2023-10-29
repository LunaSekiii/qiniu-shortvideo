import "@/app.scss";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";

function App() {
	const router = useRoutes(routes);
	return <div className='app'>{router}</div>;
}

export default App;
