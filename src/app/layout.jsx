import "./globals.css";
export const metadata = {
  title: "Barber studio's",
  description: "Barber studio's app web",
};
import { Poppins } from "next/font/google";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={inter.className}
        style={{ overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
