import { Route,Routes } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/NavComponents";
import Main from "./pages/Main";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <NavComponents />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/authentication" element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
