import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedLayout } from "./layouts/ProtectedLatout";
import HomeLayout from "./layouts/HomeLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { GoogleLoginRedirectPage } from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
import ThrottlePage from "./pages/ThrottlePage";
import { HamburgerButton } from "./components/HamburgerButton";
import { useSidebar } from "./hooks/useSidbar";
import { Sidebar } from "lucide-react";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      {path:'/throttle', element: <ThrottlePage/>}
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", element: <MyPage /> },
      { path: "lps/:lpId", element: <LpDetailPage /> },
    ],
  },
];
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
    
  );
}

function App2() {
  const {isOpen, toggle} = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="fixed top-0 left-0 bg-white shadow-sm z-50 w-full">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <HamburgerButton isOpen={isOpen} onClick={toggle}/>
            <h1 className="text-xl font-bold text-gray-900">돌려돌려LP판</h1>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOpen} onClose={close} />
    </div>
  )
}


export default App2;