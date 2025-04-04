import React from "react";
import { Metadata } from "next";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import JobApplicationForm from "@/components/job-application-form";
import JobDetail from "@/components/job-detail";

export const metadata: Metadata = {
  title: "Pisa | Apply for Job",
  description: "Apply for a job at Pisa",
};

// Mock data for job details - in a real app, this would come from a backend API
const getMockJobDetails = (jobId: string) => {
  return {
    id: jobId,
    title: "Senior Software Engineer",
    location: "New York, NY (Remote Available)",
    department: "Engineering",
    description: "Pisa is looking for experienced software engineers to join our growing team. In this role, you will work on developing scalable solutions, collaborating with cross-functional teams, and implementing best practices to ensure code quality and performance.",
    requirements: [
      "5+ years of experience with modern JavaScript frameworks (React, Vue, Angular)",
      "Strong understanding of backend technologies (Node.js, Python, Java)",
      "Experience with cloud services (AWS, GCP, Azure)",
      "Solid understanding of software design patterns and architecture",
      "Excellent problem-solving and analytical skills",
      "BS/MS in Computer Science or equivalent practical experience",
    ],
    responsibilities: [
      "Design and implement scalable software solutions",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and mentor junior developers",
      "Troubleshoot and debug issues in production environments",
      "Stay up-to-date with emerging technologies and industry trends",
    ],
  };
};

interface PageProps {
  params: {
    jobId: string;
  };
}

// Generate static paths for job IDs
export function generateStaticParams() {
  // For static site, pre-generate pages for all mock job IDs
  return [
    { jobId: 'job-001' },
    { jobId: 'job-002' },
    { jobId: 'job-003' },
    { jobId: 'job-004' },
    { jobId: 'job-005' },
    { jobId: 'job-006' },
  ];
}

export default function ApplyPage({ params }: PageProps) {
  const jobDetails = getMockJobDetails(params.jobId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold mb-6">Job Details</h1>
            <JobDetail
              title={jobDetails.title}
              location={jobDetails.location}
              department={jobDetails.department}
              description={jobDetails.description}
              requirements={jobDetails.requirements}
              responsibilities={jobDetails.responsibilities}
            />
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Application Form</h1>
            <JobApplicationForm jobId={jobDetails.id} jobTitle={jobDetails.title} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
