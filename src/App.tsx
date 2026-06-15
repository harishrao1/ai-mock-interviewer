import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";
import Footer from "./components/Footer";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/interview"
            element={
              <AuthGuard>
                <Interview />
              </AuthGuard>
            }
          />
          <Route
            path="/feedback"
            element={
              <AuthGuard>
                <Feedback />
              </AuthGuard>
            }
          />
          <Route
            path="/history"
            element={
              <AuthGuard>
                <History />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            }
          />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
