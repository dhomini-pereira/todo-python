import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavbarProvider } from "@/context/NavbarContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Loading from "@/components/loading/Loading";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ToDo App",
  description: "Aplicativo de Gerenciamento de Tarefas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
        <LoadingProvider>
          <NavbarProvider>
            <Loading />
            {children}
          </NavbarProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
