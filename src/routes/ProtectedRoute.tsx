import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    // 사용자가 로그인하지 않았으면 로그인 페이지로 리디렉션합니다.
    return <Navigate to="/login" replace />;
  }

  // 사용자가 로그인했다면 요청된 컴포넌트를 렌더링합니다.
  return children;
};

export default ProtectedRoute;
