import "../App.css";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    password: "",
    email: "",
    name: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5555/register", data)
      .then(() => {
        enqueueSnackbar("Register succcessfully", { variant: "success" });
        navigate("/login");
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleRegister}
        className="form"
        id="register-1"
      >
        <h3 className="heading">Thành viên đăng ký</h3>
        <p className="desc">Cùng nhau học lập trình miễn phí tại F8 ❤️</p>

        <div className="spacer"></div>

        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Tên đầy đủ
          </label>
          <input
            id="name"
            placeholder="enter name..."
            onChange={(e) => setData({ ...data, name: e.target.value })}
            name="fullname"
            rules="required"
            type="text"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            name="email"
            rules="required|email"
            type="text"
            placeholder="VD: email@domain.com"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            onChange={(e) => setData({ ...data, password: e.target.value })}
            name="password"
            rules="required|min:6"
            type="password"
            placeholder="Nhập mật khẩu"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <button className="form-submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;

// import "../App.css";
// import React, { useContext } from "react";
// import { useSnackbar } from "notistack";
// import { useNavigate, Link } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";
// import { useForm } from "react-hook-form";
// const Register = () => {
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const { registerAccount, token } = useContext(UserContext);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await registerAccount(data.email, data.password, data.name);
//       if (token) {
//         localStorage.setItem("token", token);
//       }
//       navigate("/");
//       enqueueSnackbar("Login successfully", { variant: "success" });
//     } catch (err) {
//       enqueueSnackbar("Login failed", { variant: "error" });
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <form
//         action=""
//         onSubmit={handleSubmit(onSubmit)}
//         className ="form"
//         id="register-1"
//       >
//         <h3 className ="heading">Thành viên đăng ký</h3>
//         <p className ="desc">Cùng nhau học lập trình miễn phí tại F8 ❤️</p>

//         <div className ="spacer"></div>

//         <div className ="form-group">
//           <label htmlFor="fullname" className ="form-label">
//             Tên đầy đủ
//           </label>
//           <input
//             id="name"
//             placeholder="enter name..."
//             onChange={(e) => setData({ ...data, name: e.target.value })}
//             name="fullname"
//             rules="required"
//             type="text"
//             className ="form-control"
//           />
//           <span className ="form-message"></span>
//         </div>

//         <div className ="form-group">
//           <label htmlFor="email" className ="form-label">
//             Email
//           </label>
//           <input
//             onChange={(e) => setData({ ...data, email: e.target.value })}
//             name="email"
//             rules="required|email"
//             type="text"
//             placeholder="VD: email@domain.com"
//             className ="form-control"
//           />
//           <span className ="form-message"></span>
//         </div>

//         <div className ="form-group">
//           <label htmlFor="password" className ="form-label">
//             Mật khẩu
//           </label>
//           <input
//             onChange={(e) => setData({ ...data, password: e.target.value })}
//             name="password"
//             rules="required|min:6"
//             type="password"
//             placeholder="Nhập mật khẩu"
//             className ="form-control"
//           />
//           <span className ="form-message"></span>
//         </div>

//         <button className ="form-submit">Đăng ký</button>
//       </form>
//     </>
//   );
// };

// export default Register;
