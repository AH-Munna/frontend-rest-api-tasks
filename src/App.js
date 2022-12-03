import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import MyRoutes from "./components/myRoutes";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Container>
          <MyRoutes />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
