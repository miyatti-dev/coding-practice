import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CommonLayout } from "./components/CommonLayout";
import { Detail } from "./pages/Detail";
import { Top } from "./pages/Top";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<CommonLayout />}>
					<Route path="/" element={<Top />} />
					<Route path="/detail" element={<Detail />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
