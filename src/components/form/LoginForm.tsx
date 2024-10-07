import { useLayoutEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import { ERROR } from "../../common/error.common";
import { useLogin, useRegister } from "../../services/user.service";
import { useForm } from "react-hook-form";
import { AUTH_TOKEN } from "../../common/constant_frontend.common";
import { useAuth } from "../../providers/context/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  //IMPORTS
  const { handleSubmit } = useForm();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //STATES
  const [register, setRegister] = useState(false);

  //MUTANTS
  const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: registerUser } = useRegister();

  //form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  //HANDLE SUBMIT
  const handleOnSubmit = async () => {
    try {
      const newErrors: any = {};

      if (!validateEmail(email)) {
        newErrors.email = ERROR.INVALID_FIELD(["Email"]);
      }

      if (!email) {
        newErrors.email = ERROR.REQUIRED_FIELD("Email");
      }

      if (!validatePassword(password)) {
        newErrors.password = ERROR.REQUIRED_LENGTH("Password", 6);
      }

      if (!password) {
        newErrors.password = ERROR.REQUIRED_FIELD("Password");
      }

      let data: any = {
        email,
        password,
      };

      if (register) {
        data.name = name;
        if (!name?.trim()) {
          newErrors.name = ERROR.REQUIRED_FIELD("Name");
        }
      }

      let res = null;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (register) {
        res = await registerUser(data);
      } else {
        res = await loginUser(data);
        if (res?.data) {
          localStorage.setItem(AUTH_TOKEN, res?.data?.token);
          setAuth(res?.data?.token);
          navigate("/");
        }
      }

      if (res?.data) {
        toastSuccess(res?.data?.message);
        setName("");
        setEmail("");
        setPassword("");
        setRegister(false);
      }
    } catch (error) {
      toastError(error);
    }
  };

  //USEEFFECT
  useLayoutEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN) && auth) {
      navigate("/");
    }
  }, [localStorage, auth]);

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#F4F4F470] md:min-h-[90vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-[22px] sm:text-[26px] font-semibold leading-[40px] sm:leading-[60px] tracking-tight text-gray-900 whitespace-nowrap">
            {register ? "Register " : "Login "} to your account
          </h2>
        </div>
        <div className="justify-center items-center hidden sm:flex md:mt-5">
          <p className="font-normal text-[12px] leading-[13px] text-[#777777] sm:text-[14px] sm:leading-[16px] md:text-[15px] md:leading-[18px]">
            Please enter your credentials to access your account. If you don’t
            have an account yet, feel free to register to join our community!
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
            {register && (
              <div className="flex justify-center">
                <div className="mt-2 w-full md:w-[538px]">
                  <input
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    className="block w-full md:w-[538px] border-0 px-5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black sm:text-sm sm:leading-6 focus:outline-none"
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <div className="mt-2 w-full md:w-[538px]">
                <input
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email ID"
                  autoComplete="email"
                  className="block w-full md:w-[538px] border-0 px-5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black sm:text-sm sm:leading-6 focus:outline-none"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="mt-2 w-full md:w-[538px]">
                <input
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="block  w-full md:w-[538px] border-0 px-5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black sm:text-sm sm:leading-6  focus:outline-none"
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="flex justify-center uppercase bg-[#1AA5C3] px-16 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
            <div className="flex justify-center items-center">
              <p
                className="text-center text-sm text-gray-500 hover:underline cursor-pointer"
                onClick={() => {
                  setRegister(!register);
                  setEmail("");
                  setPassword("");
                  setName("");
                  setErrors({});
                }}
              >
                {register ? "Login ?" : "new member ?"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
