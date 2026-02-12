import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/Project.Context"
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <AppRoutes />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
