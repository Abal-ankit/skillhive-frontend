import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/AuthLayout";
import GlobalContextProvider from "./GlobalContextProvider";

export default function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/challenges" element={<Challenges />} />
            {/* <Route path="/challenges/:id" element={<ChallengeDetail />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}
