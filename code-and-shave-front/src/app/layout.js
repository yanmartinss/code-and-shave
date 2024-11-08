import "./globals.css";

export const metadata = {
  title: "Code and Shave",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
