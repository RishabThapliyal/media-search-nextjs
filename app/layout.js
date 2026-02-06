import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Media Search",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
