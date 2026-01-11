import "./globals.css";

export const metadata = {
  title: "OrderKue - AI Customer Service on WhatsApp",
  description: "KueBot lives on your WhatsApp Business and becomes your customer service + sales agent.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}