import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - STAR Dashboard",
  description: "STAR Dashboard 로그인",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="loginLayout">
      {children}
    </div>
  );
}
