import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import NotFound from "./pages/NotFound/NotFound";

import "bootstrap-icons/font/bootstrap-icons.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import GuestRoute from "./routes/GuestRoute";

import ScrollTop from "./components/common/ScrollTop";
import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <ScrollTop />

                <Navbar />

                <main>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/:slug"
                            element={<ProductDetails />}
                        />

                        {/* Guest Routes */}
                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <Login />
                                </GuestRoute>
                            }
                        />

                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <Register />
                                </GuestRoute>
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <Checkout />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Only Route */}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <Admin />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/order-success"
                            element={
                                <ProtectedRoute>
                                    <OrderSuccess />
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;