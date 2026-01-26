
// src/layouts/AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminNavbar } from "../admin/AdminNavbar";
import { AdminSidebar } from "../admin/AdminSidebar";
import { AdminFooter } from "../admin/AdminFooter";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect mobile based on window width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop: always open sidebar
  useEffect(() => {
    if (!isMobile) setIsSidebarOpen(true);
  }, [isMobile, location.pathname]);

  // Mobile: close sidebar on route change
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
          currentPath={location.pathname}
        />

        {/* Main Content */}
        <main
          className={`
            flex-1 flex flex-col bg-gray-100 min-h-screen
            transition-all duration-300
            ${!isMobile ? "lg:ml-80" : ""}
          `}
        >
          {/* Page content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4">
            <Outlet key={location.pathname} />
          </div>

          {/* Footer */}
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};
