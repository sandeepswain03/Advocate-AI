import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
  type?: "website" | "article" | "profile";
  locale?: string;
  alternates?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateMetadata = ({
  title = `Advocate AI - Legal Advice at Your Fingertips`,
  description = `Advocate AI is your trusted companion for legal advice. Leverage AI to understand legal terms, get guidance on contracts, and receive tailored advice for your legal queries. Accessible, reliable, and intelligent legal assistance.`,
  icons = [
    {
      rel: "icon",
      url: "/icons/icon-light.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icons/icon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  noIndex = false,
  keywords = [
    "AI legal advice",
    "legal chatbot",
    "legal assistance",
    "contract guidance",
    "AI lawyer",
    "legal automation",
    "legal query assistance",
    "contract analysis",
    "legal document review",
    "AI-powered legal solutions",
  ],
  author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
  type = "website",
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://advocate-ai.vercel.app"
  );

  return {
    metadataBase,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: process.env.NEXT_PUBLIC_APP_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons,
  };
};
