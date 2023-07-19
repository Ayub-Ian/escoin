import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/escoin.svg";
import auth from "../../api/Auth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(values, resetForm) {
    setLoading(true);
    try {
      const response = await auth.login(values);
      const data = response.data;
      setError(null);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("name", data.user.firstname);
      resetForm();
      navigate("/transactions");

      console.log({ response });
    } catch (error) {
      const err = error.response.data;
      setError(err.error);
      console.error(error);
    }
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
  });

  return (
    <div className=" min-h-screen bg-slate-100">
      <div className="container h-full p-3">
        <div className="flex items-center justify-center w-full">
          <div className=" w-full lg:max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg mt-10">
              <div className="lg:flex">
                <div className="p-4 lg:flex-1">
                  <div className="md:mx-6 md:p-6">
                    <img className="mb-12 mt-4" src={logo} alt="escoin logo" />
                    {error && (
                      <div className="bg-red-200 border border-red-400 rounded px-4 py-1 ">
                        <p className="text-rose-800">{error}</p>
                      </div>
                    )}

                    <p className="mb-4 w-full">
                      Please log in to your account.
                    </p>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        placeholder="Enter your email"
                        className="bg-gray-200  appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <small className="mb-4 text-red-500  italic ">
                        {formik.errors.email}
                      </small>

                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
                        Password
                      </label>

                      <input
                        placeholder="Enter your password"
                        className="bg-gray-200 appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
                        type="text"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      <small className="mb-4 text-red-500  italic">
                        {formik.errors.password}
                      </small>
                      <input
                        disabled={loading ? true : false}
                        type="submit"
                        value={loading ? "Processing" : "Log in"}
                        className={`w-full ${
                          loading ? "bg-green-300" : "bg-green-500"
                        } mt-4 py-1.5 uppercase rounded font-medium text-white`}
                      />
                    </form>
                    <span className=" flex space-x-1 my-4">
                      <p>Don&apos;t have an account?</p>
                      <Link
                        to="/signup"
                        className="text-green-500 hover:underline"
                      >
                        <p>Create an account</p>
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="hero-bg lg:flex-1 flex items-center">
                  <div className="p-8 md:mx-12 md:p-12">
                    <h3 className="mb-6 text-3xl">
                      Never buy or sell online without using{" "}
                      <span className="font-bold">Escoin</span>
                    </h3>
                    <p>
                      With Escoin you can buy and sell anything safely without
                      the risk of fraud. Truly secure business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
