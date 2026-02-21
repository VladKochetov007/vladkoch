import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Vlad Kochetov — Quantitative Developer & Researcher",
    description:
        "Portfolio of Vlad Kochetov, a Quantitative Developer and Researcher specializing in machine learning, algorithmic trading, and deep learning.",
    keywords: [
        "Vlad Kochetov",
        "Quantitative Developer",
        "Machine Learning",
        "Algorithmic Trading",
        "Portfolio",
    ],
    authors: [{ name: "Vlad Kochetov" }],
    openGraph: {
        title: "Vlad Kochetov — Quantitative Developer & Researcher",
        description:
            "Portfolio of Vlad Kochetov — building ML systems, algo trading tools, and quantitative research.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/jpeg" href="/images/me.jpg" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const dark = stored ? stored === 'dark' : prefersDark;
                document.documentElement.classList.toggle('dark', dark);
              } catch(e) {}
            `,
                    }}
                />
            </head>
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
