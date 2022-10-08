import { Route, Routes } from "react-router";
import Home from "./Home";
import Jobs from "containers/Jobs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
    </Routes>
  );
}

export default App;
