

import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import UserRoutes from "./pages/routes/UserRoutes";
import AdminRoutes from "./pages/routes/AdminRoutes";

// WhatsApp icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Visitor service
import { logVisitor } from "./services/visitorService";

library.add(fab);

const App = () => {
  useEffect(() => {
    logVisitor(); // Visitor yahin se save hoga
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {/* User side routes */}
        <UserRoutes />

        {/* Admin side routes */}
        <AdminRoutes />
      </Router>
    </HelmetProvider>
  );
};

export default App;
