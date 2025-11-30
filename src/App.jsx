import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionDetail from "./pages/TransactionDetail";
import TransactionHistory from "./pages/TransactionHistory";

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const location = useLocation();

  // Check if current page is landing
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    });

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice.outcome);

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_login");

    window.location.href = "/login";
  };

  const hideLogout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {!isLandingPage && (
        <>
          {/* Desktop Navigation */}
          <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* LEFT SECTION */}
                <div className="flex items-center gap-8">
                  <Link to="/" className="font-bold text-xl text-blue-600">
                    <img src="logo.png" className="h-10" alt="" />
                  </Link>

                  <div className="flex gap-1">
                    <Link
                      to="/dashboard"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        location.pathname === "/dashboard"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/transactions"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        location.pathname === "/transactions"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Transactions
                    </Link>

                    {/* NEW: Transaction History */}
                    <Link
                      to="/transaction-history"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        location.pathname === "/transaction-history"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      History
                    </Link>

                    <Link
                      to="/about"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        location.pathname === "/about"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      About
                    </Link>
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3">
                  {showInstall && (
                    <button
                      onClick={handleInstall}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Install App
                    </button>
                  )}

                  {!hideLogout && (
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded-lg font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="flex justify-around items-center h-16">
              <Link
                to="/dashboard"
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  location.pathname === "/dashboard"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-xs mt-1">Dashboard</span>
              </Link>

              <Link
                to="/transactions"
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  location.pathname === "/transactions"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                  />
                </svg>
                <span className="text-xs mt-1">Transactions</span>
              </Link>

              {/* NEW: Transaction History */}
              <Link
                to="/transaction-history"
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  location.pathname === "/transaction-history"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                  />
                </svg>
                <span className="text-xs mt-1">History</span>
              </Link>

              <Link
                to="/about"
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  location.pathname === "/about"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs mt-1">About</span>
              </Link>
            </div>
          </nav>
        </>
      )}

      {/* Install button at landing page */}
      {isLandingPage && showInstall && (
        <button
          onClick={handleInstall}
          className="fixed top-6 right-6 z-50 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg text-sm"
        >
          Install App
        </button>
      )}

      <main
        className={
          isLandingPage ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions/:id"
            element={
              <ProtectedRoute>
                <TransactionDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transaction-history"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
