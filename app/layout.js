import "./globals.css";
import siteData from "../site-data.json";
import SiteNav from "./site-nav";

export const metadata = {
  title: siteData.site.title,
  description: siteData.site.description,
  icons: {
    icon: "/me.jpg",
    shortcut: "/me.jpg",
    apple: "/me.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><SiteNav />{children}</body>
    </html>
  );
}
