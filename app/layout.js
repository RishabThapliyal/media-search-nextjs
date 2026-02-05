import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Media Search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
