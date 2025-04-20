import { Route, Routes } from "react-router-dom";
import router from "./helper/routes";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        {router.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
      <Sidebar />
    </div>
  );
};

export default App;
