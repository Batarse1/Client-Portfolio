import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvideAuth } from "./Hooks/UseAuth/useAuth";

import Login from "./Pages/Login/Login";
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound';
import Home from "./Pages/Home/Home";

import PrivateRoute from "./HOCs/PrivateRoute/PrivateRoute";
import PageLayout from "./Layout/PageLayout/PageLayout";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Customers" element={<PrivateRoute><PageLayout /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><PageLayout /></PrivateRoute>} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
