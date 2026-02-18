import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/Project.Context";
import { EventProvider } from "./context/EventContext";
import { RealtimeProvider } from "./context/RealTimeContext";
import AppRoutes from "./routes/AppRoutes";

// NOTE: We use RealtimeProvider instead of RealtimeContext for clarity and proper context usage.

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ProjectProvider>
        <EventProvider>
          <RealtimeProvider>
            <AppRoutes />
          </RealtimeProvider>
        </EventProvider>
      </ProjectProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
