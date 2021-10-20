import { Switch, Route } from "react-router-dom";
import Form from "../src/pages/Form";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/authentication">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
