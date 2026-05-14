import { Provider } from "react-redux";
import { store } from "./store/store";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import RequestsPage from "./pages/RequestsPage";
import NotFound404 from "./pages/NotFound404";
import CreateRequestPage from "./pages/CreateRequestPage";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import ArchivePage from "./pages/ArchivePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RequestsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <RequestsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests/:id"
            element={
              <ProtectedRoute>
                <RequestDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/archive"
            element={
              <ProtectedRoute>
                <ArchivePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateRequestPage />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;