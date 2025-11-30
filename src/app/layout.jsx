import "./globals.css";
import React from "react";

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      />
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
