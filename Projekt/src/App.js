import { Switch, Route } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/NavComponents";
import Main from "./pages/Main";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <NavComponents />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/authentication">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
