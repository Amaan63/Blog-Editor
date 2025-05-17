import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Authentication/authentication.action";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Password Must be atleast 6 Characters")
    .required("Password is Required"),
});

const Login = () => {
  const [formValue, setFormValue] = useState();
  const [submitted, setSubmitted] = useState(false); // ✅ Track form submission
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    console.log("Values are", values);
    setSubmitted(values);
    dispatch(loginUserAction({ data: values }));
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      if (auth?.jwt) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else if (auth?.error?.message) {
        console.log(auth?.error?.message);
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
      <Form className="space-y-6">
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

        <button
          type="submit"
          disabled={submitted}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {/* {submitted ? "Processing..." : "Sign In"} */}
          Sign In
        </button>
      </Form>
    </Formik>
  );
};

export default Login;
