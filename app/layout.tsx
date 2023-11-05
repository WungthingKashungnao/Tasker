import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./(components)/sidebar/Sidebar";
import GlobalStyleProvider from "./(providers)/GlobalStyleProvider";
import ContextProvider from "./(providers)/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasker",
  description: "Manage your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <GlobalStyleProvider>
            <Sidebar />
            {children}
          </GlobalStyleProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
