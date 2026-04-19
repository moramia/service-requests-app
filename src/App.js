import { Provider } from "react-redux";
import store from "./store/store";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import RequestsPage from "./pages/RequestsPage";
import NotFound404 from "./pages/NotFound404";
import CreateRequestPage from "./pages/CreateRequestPage";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
          <Routes>
            <Route path="/" element={<RequestsPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/requests/:id" element={<RequestDetailsPage />} />
            <Route path="/create" element={<CreateRequestPage />} />
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
      </div>
    </Provider>
  );
}

export default App;
