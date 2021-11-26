import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvideAuth } from "./Hooks/UseAuth/useAuth";
import { ProvideInsuranceCarrier } from "./Hooks/UseInsuranceCarrier/useInsuranceCarrier";
import { ProvideCustomers } from "./Hooks/UseCustomers/UseCustomers";
import { ProvidePolicies } from "./Hooks/UsePolicies/UsePolicies";
import { ProvideInsured } from "./Hooks/UseInsureds/UseInsureds";

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

import CreatePolicy from "./Pages/CreatePolicy/CreatePolicy";
import EditPolicy from "./Pages/EditPolicy/EditPolicy";
import ReadPolicy from "./Pages/ReadPolicy/ReadPolicy";

import CreateInsured from "./Pages/CreateInsured/CreateInsured";
import EditInsured from "./Pages/EditInsured/EditInsured";
import ReadInsured from "./Pages/ReadInsured/ReadInsured";

import Report from "./Pages/Report/Report";

function App() {
  return (
    <ProvideAuth>
      <ProvideInsuranceCarrier>
        <ProvideCustomers>
          <ProvidePolicies>
            <ProvideInsured>
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
                    path="/customers/:id/create"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <CreatePolicy />
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
                    path="/customers/:id/edit/:idPolicy"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <EditPolicy />
                        </PageLayout>
                      </PrivateRoute>}
                  />
                  <Route
                    path="/customers/:id/:idPolicy"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <ReadPolicy />
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
                    path="/customers/:id/:idPolicy/create"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <CreateInsured />
                        </PageLayout>
                      </PrivateRoute>}
                  />
                  <Route
                    path="/customers/:id/:idPolicy/:idInsured"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <ReadInsured />
                        </PageLayout>
                      </PrivateRoute>}
                  />
                  <Route
                    path="/customers/:id/:idPolicy/edit/:idInsured"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <EditInsured />
                        </PageLayout>
                      </PrivateRoute>}
                  />
                  <Route
                    path="/report"
                    element={
                      <PrivateRoute>
                        <PageLayout>
                          <Report />
                        </PageLayout>
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
            </ProvideInsured>
          </ProvidePolicies>
        </ProvideCustomers>
      </ProvideInsuranceCarrier>
    </ProvideAuth>
  );
}

export default App;
