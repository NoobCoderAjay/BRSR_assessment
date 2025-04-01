import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./component/Auth/Login";
import { RegisterPage } from "./component/Auth/Register";
import { PrivateRoute } from "./component/PrivateRoute/PrivateRoute";
import { TasksPage } from "./component/Tasks";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
