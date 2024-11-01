import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Brainwave",
  description: "Your personal learning assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <TooltipProvider>
              <div className="flex w-full">
              <AppSidebar />
              <main className="min-h-screen flex flex-col items-center flex-grow">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                  <div className="flex flex-col gap-20 max-w-5xl p-5 h-full">
                    {children}
                  </div>
                  <footer className="w-fit flex items-center justify-center mx-auto text-center text-xs gap-12 bottom-4 absolute">
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                    <p>
                      Brainwave can make mistakes. Please verify any
                      information.
                    </p>
                  </footer>
                </div>
              </main>
              </div>
            </TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
