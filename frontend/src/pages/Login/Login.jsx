import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrap">

        {/* Outer card — Categories-style container, rice-field photo background */}
        <div className="login-image-card">

          {/* Glass card floats left-of-center, leaving the bag visible on the right */}
          <div className="auth-card">

            {/* Intro half */}
            <div className="auth-intro">
              <h1>🌾 Rice Store</h1>
              <h2>Premium Rice Delivered Fresh</h2>
              <ul>
                <li>✔ Premium Quality</li>
                <li>✔ Cash On Delivery</li>
                <li>✔ Fast Delivery</li>
                <li>✔ Trusted Store</li>
              </ul>
            </div>

            <div className="auth-divider" />

            {/* Form half */}
            <div className="auth-form">
              <h2 className="mb-4">Welcome Back</h2>

              <form onSubmit={handleSubmit}>
                <Input
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />

                <div className="password-box">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <Button type="submit" loading={loading}>
                  Login
                </Button>
              </form>

              <div className="text-center mt-4">
                <Link to="/register">Create Account</Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}