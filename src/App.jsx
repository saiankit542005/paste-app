import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

const App = () => {
  return (
    <div style={{textAlign:"center"}}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pastes" element={<Paste />} />
        <Route path="pastes/:id" element={<ViewPaste />} />
      </Routes>
    </div>
  );
};

export default App;