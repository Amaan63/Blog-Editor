import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerUserAction } from "../../Redux/Authentication/authentication.action";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("User Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

const Register = () => {
  const [submitted, setSubmitted] = useState(false); // ✅ Track form submission
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    console.log("Values are", values);
    dispatch(registerUserAction({ data: values }));
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      if (auth?.jwt) {
        toast.success("Registration successful!");
        navigate("/");
      } else if (auth?.error?.message) {
        //console.log(auth?.error?.message);
        toast.error(auth.error.message); // ✅ exact backend message
        setSubmitted(false);
      }
    }
  }, [auth.jwt, auth.error, submitted]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Field
              type="text"
              name="username"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="User123"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {/* {isSubmitting ? "Processing..." : "Sign Up"} */}
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
