import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainBody from "./layout/MainBody";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<MainBody />}>
            <Route path="/app" element={<div>app</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
