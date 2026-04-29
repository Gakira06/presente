import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PagePrincipal from "./pages/PagePrincipal";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/principal" element={<PagePrincipal />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
