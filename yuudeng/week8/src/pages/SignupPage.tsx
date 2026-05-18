import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상입니다." })
      .max(20, { message: "비밀번호는 20자 이하입니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상입니다." })
      .max(20, { message: "비밀번호는 20자 이하입니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
    navigate("/login");
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + `/v1/auth/google/login`;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full gap-4 text-white">
        <div className="flex flex-col gap-3">
          <div className="relative flex justify-center items-center pb-6">
            <button className="absolute left-0" onClick={() => navigate("/")}>
              <ChevronLeft />
            </button>
            <h1 className="text-xl font-bold">회원가입</h1>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex justify-center items-center rounded-md border border-white p-2.5"
          >
            <div className="flex items-center justify-center gap-4">
              <img
                src={"/images/google.svg"}
                alt="Google Logo Image"
                className="w-8"
              />
              <p>구글 로그인</p>
            </div>
          </button>
          <div className="flex justify-between items-center">
            <hr className="text-white w-24" />
            <p className="font-bold">OR</p>
            <hr className="text-white w-24" />
          </div>
          <input
            {...register("name")}
            className={`border w-80 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.name ? "border-red-500" : "border-[#ccc]"}`}
            type={"name"}
            placeholder={"이름을 입력해주세요!"}
          />
          {errors.name && (
            <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
          )}

          <input
            {...register("email")}
            className={`border w-80 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
            ${errors?.email ? "border-red-500" : "border-[#ccc]"}`}
            type={"email"}
            placeholder={"이메일을 입력해주세요!"}
          />
          {errors.email && (
            <div
              className={
                "flex items-center justify-center text-red-500 text-sm"
              }
            >
              {errors.email.message}
            </div>
          )}

          <div className="relative">
            <input
              {...register("password")}
              name="password"
              className={`border w-80 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
              ${errors?.password ? "border-red-500" : "border-[#ccc]"}`}
              type={showPassword ? "text" : "password"}
              placeholder={"비밀번호를 입력해주세요!"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && (
            <div className={"text-red-500 text-sm"}>
              {errors.password.message}
            </div>
          )}

          <div className="relative">
            <input
              {...register("passwordCheck")}
              name="passwordCheck"
              className={`border w-80 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
              ${errors?.passwordCheck ? "border-red-500" : "border-[#ccc]"}`}
              type={showPasswordCheck ? "text" : "password"}
              placeholder={"비밀번호를 다시 한 번 입력해주세요!"}
            />
            <button
              type="button"
              onClick={() => setShowPasswordCheck((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPasswordCheck ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.passwordCheck && (
            <div className={"text-red-500 text-sm"}>
              {errors.passwordCheck.message}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid}
            className="w-full bg-[#E63996] text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-[#161616] disabled:text-gray-200"
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
