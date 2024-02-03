import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Tracker App",
    description: "Tracker App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn("", fontSans.variable)}>
                <Toaster position="top-center" richColors />
                {children}
            </body>
        </html>
    );
}
