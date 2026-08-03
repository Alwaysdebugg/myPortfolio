import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

// metadata 需要在服务器端组件中导出
export const metadata: Metadata = {
  title: "Jacky Feng — Always Debugging",
  keywords: [
    "Jacky Feng",
    "Software Developer",
    "Frontend Developer",
    "React Native",
    "React",
    "Next.js",
  ],
  description:
    "The living portfolio and Debug Journal of Jacky Feng, a Vancouver-based frontend, mobile, and full-stack developer.",
  icons: {
    // icon: '/myPortfolio/favicon.ico',
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoMono.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/myPortfolio/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          var theme = localStorage.getItem('theme') || 'system';
          var isDark = false;
          
          if (theme === 'system') {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          } else {
            isDark = theme === 'dark';
          }
          
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      })();
    `,
          }}
        />
      </head>
      <body
        className={`${robotoMono.className} font-serif bg-white dark:bg-black transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
