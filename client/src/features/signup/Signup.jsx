import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import "../login/Login.css";
import logo from "../../assets/escoin.svg";
import auth from "../../api/Auth";

const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateSchema = yup.object().shape({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup.string().email("Please enter a valid email").required("This field is required"),
    password: yup.string()
    .required("This field is required")
    .min(6, "Pasword must be 8 or more characters")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/\d/, "Password should contain at least one number")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    phone_number: yup.string().matches(phoneRegEx, 'Phone number is not valid').required("This field is required")
})

const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values, resetForm) => {
        setLoading(true)
        try {
            await auth.signup(values);
            resetForm();
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            phone_number: "",
          email: "",
          password: "",
        },
        validationSchema: validateSchema,
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
                    <p className="mb-4 w-full">
                      Create your account.
                    </p>
                    <form onSubmit={formik.handleSubmit} autoComplete="off" >
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="Type firstname"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                          />
                          <p className="text-red-500 text-xs italic">
                            {formik.errors.firstname}
                          </p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white "
                            type="text"
                            placeholder="Type lastname"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                          />
                                                    <p className="text-red-500 text-xs italic">
                            {formik.errors.lastname}
                          </p>
                        </div>
                      </div>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
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
                                                <p className="text-red-500 text-xs italic">
                            {formik.errors.email}
                          </p>
                                            <label className="block uppercase mt-4 tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                        Phone number
                      </label>
                      <input
                        placeholder="Enter your phone number"
                        className="bg-gray-200  appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        name="phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                      />
                                                <p className="text-red-500 text-xs italic">
                            {formik.errors.phone_number}
                          </p>
                      <label className="block uppercase tracking-wide mt-4 text-gray-700 text-xs font-bold mb-2 ">
                        Password
                      </label>

                      <input
                        placeholder="Enter your password"
                        className="bg-gray-200 appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                        type="text"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                      />
                                <p className="text-red-500  text-xs italic">
                            {formik.errors.password}
                          </p>
                          <input
                        disabled={loading ? true : false}
                        type="submit"
                        value={loading ? "Processing" : "Create account"}
                        className={`w-full ${
                          loading ? "bg-green-300" : "bg-green-500"
                        } mt-4 py-1.5 uppercase rounded font-medium text-white`}
                      />
                    </form>
                    <span className=" flex space-x-1 my-4">
                      <p>Already have an account?</p>
                      <Link to="/login" className="text-green-500 hover:underline"><p>Log in</p></Link>
                    </span>
                  </div>
                </div>
                <div className="hero-bg lg:flex-1 flex items-center">
                  <div className="p-8 md:mx-12 md:p-12">
                    <h3 className="mb-6 text-3xl">
                      Easiest way to trade assets in one place.
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

export default Signup;
