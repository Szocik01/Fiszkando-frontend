import { Route,Routes } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/navigationComponents/NavComponents";
import Settings from "./pages/Settings";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import FormRetrievePassword from "./pages/FormRetrievePassword";
import FormResetPassword from "./pages/FormResetPassword";
function App() {
  return (
    <div>
      <NavComponents />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/retrieve_password" element={<FormRetrievePassword/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/settings/*" element={<Settings/>}/>
        <Route path="/authentication" element={<Form />}/>
        <Route path="/authorize/reset/:uid/:token" element={<FormResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;
