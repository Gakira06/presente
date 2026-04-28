import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PagePrincipal from "./pages/PagePrincipal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/principal" element={<PagePrincipal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
