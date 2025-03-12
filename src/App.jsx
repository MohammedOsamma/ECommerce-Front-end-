import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AmdinLayout from "./components/admin-view/layout";
import AdminDashborad from "./pages/admin-view/dashborad";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import shoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import CheckAuth from "./components/comman/auth-check";
import UnauthPage from "./pages/unauth-page";

function App() {
  // Dummay Data For Auth
  const isAuthenticated = false;
  const user = null;
  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AmdinLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashborad />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<shoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="auth-page" element={<UnauthPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
