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
  title: "Jfeng's Portfolio",
  keywords: ["Portfolio", "Frontend Developer", "React", "Next.js"],
  description: "Frontend developer portfolio showcasing projects and skills",
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
    <html lang="zh" className={robotoMono.variable}>
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
