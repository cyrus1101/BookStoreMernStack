import "../App.css";
import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useForm } from "react-hook-form";
import Register from "./Register";
const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login, token } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/");
      enqueueSnackbar("Login successfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Login failed", { variant: "error" });
      console.log(err);
    }
  };

  return (
    <>
      <form id="formLogin" onSubmit={handleSubmit(onSubmit)}>
        <div className="spacer"></div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="text"
            placeholder="VD: email@domain.com"
            className="form-control"
          />
          {errors.email && (
            <span className="form-message">Email is required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            id="password"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          {errors.password && (
            <span className="form-message">
              Password is required and must be at least 6 characters
            </span>
          )}
        </div>

        <button className="form-submit">Login</button>
      </form>
      <span style={{ fontSize: 24, padding: 20, color: "blue" }}>
        <Link className=" font-size: 24px; font-weight:400; " to="/register">
          Dont have an account ?{" "}
        </Link>
      </span>
    </>
  );
};

export default Login;
