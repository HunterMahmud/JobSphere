// app/page.js

export const dynamic = "force-dynamic";

// Metadata for the homepage
export const Metadata = {
  title: 'Job Sphere - Streamline Your Job Search & Hiring Process',
  description: 'Job Sphere is a cutting-edge hiring and job-seeking platform designed to connect job seekers with top companies. Explore job opportunities, connect with recruiters, and access valuable resources for career growth.',
  keywords: 'Job Sphere, hiring platform, job search, job seekers, recruiters, skill assessments, career growth, resume builder, job alerts, job notifications',
  openGraph: {
    title: 'Job Sphere - Streamline Your Job Search & Hiring Process',
    description: 'Discover job opportunities and connect with top companies on Job Sphere.',
    url: 'https://job-sphere-rouge.vercel.app',
    siteName: 'Job Sphere',
    images: [
      {
        url: 'https://i.ibb.co.com/Ph872yP/logoName.png',
        width: 800,
        height: 600,
        alt: 'Job Sphere Banner Image',
      },
    ],
    type: 'website',
  },
};

import Homepage from "@/components/Homepage/Homepage";

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
