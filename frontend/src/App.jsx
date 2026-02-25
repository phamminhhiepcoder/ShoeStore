import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ViewSize from "./pages/admin/size/ViewSize";
import AddSize from "./pages/admin/size/AddSize";
import EditSize from "./pages/admin/size/EditSize";
import EditColor from "./pages/admin/color/EditColor";
import AddColor from "./pages/admin/color/AddColor";
import ViewColor from "./pages/admin/color/ViewColor";
import EditVoucher from "./pages/admin/voucher/EditVoucher";
import AddVoucher from "./pages/admin/voucher/AddVoucher";
import ViewVoucher from "./pages/admin/voucher/ViewVoucher";
import AddSupplier from "./pages/admin/supplier/AddSupplier";
import ViewSupplier from "./pages/admin/supplier/ViewSupplier";
import EditSupplier from "./pages/admin/supplier/EditSupplier";
import AddBrand from "./pages/admin/brand/AddBrand";
import ViewBrand from "./pages/admin/brand/ViewBrand";
import EditBrand from "./pages/admin/brand/EditBrand";
import ViewProduct from "./pages/admin/product/ViewProduct";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import HomePage from "./pages/user/HomePage";
import UserLayout from "./layouts/UserLayout";
import Products from "./pages/user/Products";
import ProductDetail from "./pages/user/ProductDetail";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import ViewInventory from "./pages/admin/inventory/ViewInventory";
import AddImport from "./pages/admin/inventory/AddImport";
import ViewUser from "./pages/admin/user/ViewUser";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ViewCart from "./pages/user/ViewCart";
import ChangePass from "./pages/auth/ChangePass";
import Checkout from "./pages/user/Checkout";
import ViewOrder from "./pages/admin/order/ViewOrder";
import OrderHistory from "./pages/user/OrderHistory";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage />
            </UserLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <UserLayout>
              <ViewCart />
            </UserLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />

        <Route
          path="/history"
          element={
            <UserLayout>
              <OrderHistory />
            </UserLayout>
          }
        />

        <Route
          path="/changePass"
          element={
            <AuthLayout>
              <ChangePass />
            </AuthLayout>
          }
        />

        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />

        <Route
          path="/products"
          element={
            <UserLayout>
              <Products />
            </UserLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <UserLayout>
              <ProductDetail />
            </UserLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/inventory"
          element={
            <AdminLayout>
              <ViewInventory />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/inventory/add"
          element={
            <AdminLayout>
              <AddImport />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/size"
          element={
            <AdminLayout>
              <ViewSize />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/size/add"
          element={
            <AdminLayout>
              <AddSize />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/size/edit/:id"
          element={
            <AdminLayout>
              <EditSize />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/color"
          element={
            <AdminLayout>
              <ViewColor />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/color/add"
          element={
            <AdminLayout>
              <AddColor />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/color/edit/:id"
          element={
            <AdminLayout>
              <EditColor />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/order"
          element={
            <AdminLayout>
              <ViewOrder />
            </AdminLayout>
          }
        />


        <Route
          path="/admin/voucher"
          element={
            <AdminLayout>
              <ViewVoucher />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/user"
          element={
            <AdminLayout>
              <ViewUser />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/voucher/add"
          element={
            <AdminLayout>
              <AddVoucher />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/voucher/edit/:id"
          element={
            <AdminLayout>
              <EditVoucher />
            </AdminLayout>
          }
        />


        <Route
          path="/admin/supplier"
          element={
            <AdminLayout>
              <ViewSupplier />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/supplier/add"
          element={
            <AdminLayout>
              <AddSupplier />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/supplier/edit/:id"
          element={
            <AdminLayout>
              <EditSupplier />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/brand"
          element={
            <AdminLayout>
              <ViewBrand />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/brand/add"
          element={
            <AdminLayout>
              <AddBrand />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/brand/edit/:id"
          element={
            <AdminLayout>
              <EditBrand />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/product"
          element={
            <AdminLayout>
              <ViewProduct />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/product/add"
          element={
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/product/edit/:id"
          element={
            <AdminLayout>
              <EditProduct />
            </AdminLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
