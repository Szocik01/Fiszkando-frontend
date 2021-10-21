import { Switch, Route } from "react-router-dom";
import Form from "../src/pages/Form";
import NavComponents from "./components/NavComponents";

function App() {
  return (
    <div>
      <NavComponents />
      <Switch>
        <Route path="/authentication">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
