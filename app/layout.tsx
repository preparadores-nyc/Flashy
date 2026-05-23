import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashy",
  description: "App de movilidad para Santiago de Chile"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
