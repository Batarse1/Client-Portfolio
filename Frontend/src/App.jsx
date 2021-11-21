import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvideAuth } from "./Hooks/UseAuth/useAuth";
import { ProvideInsuranceCarrier } from "./Hooks/UseInsuranceCarrier/useInsuranceCarrier";
import { ProvideCustomers } from "./Hooks/UseCustomers/UseCustomers";

import Login from "./Pages/Login/Login";
import Signup from './Pages/Signup/Signup';
import NotFound from './Pages/NotFound/NotFound';
import Home from "./Pages/Home/Home";
import Customers from "./Pages/Customers/Customers";

import PrivateRoute from "./HOCs/PrivateRoute/PrivateRoute";
import PageLayout from "./Layout/PageLayout/PageLayout";

import ReadUser from "./Components/ReadUser/ReadUser";
import CreateUser from "./Pages/CreateUser/CreateUser";
import EditUser from "./Pages/EditUser/EditUser";

function App() {
  return (
    <ProvideAuth>
      <ProvideInsuranceCarrier>
        <ProvideCustomers>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Login />} />
              <Route
                path="/Home"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <Home />
                    </PageLayout>
                  </PrivateRoute>
                } />
              <Route
                path="/customers"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <Customers />
                    </PageLayout>
                  </PrivateRoute>}
              />
              <Route
                path="/customers/create"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <CreateUser />
                    </PageLayout>
                  </PrivateRoute>}
              />
              <Route
                path="/customers/:id"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <ReadUser />
                    </PageLayout>
                  </PrivateRoute>}
              />
                            <Route
                path="/customers/edit/:id"
                element={
                  <PrivateRoute>
                    <PageLayout>
                      <EditUser />
                    </PageLayout>
                  </PrivateRoute>}
              />
              <Route
                path="/report"
                element={
                  <PrivateRoute>
                    <PageLayout />
                  </PrivateRoute>
                } />
              <Route
                path="/SignUp"
                element={
                  <Signup />
                } />
              <Route
                path="*"
                element={
                  <NotFound />
                } />
            </Routes>
          </BrowserRouter>
        </ProvideCustomers>
      </ProvideInsuranceCarrier>
    </ProvideAuth>
  );
}

export default App;
