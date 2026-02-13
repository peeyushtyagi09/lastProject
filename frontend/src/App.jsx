import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/Project.Context"

import AppRoutes from "./routes/AppRoutes";
import { EventProvider } from "./context/EventContext";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <EventProvider>
          <AppRoutes />
          </EventProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
