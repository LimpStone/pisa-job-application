"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, BarChart2, MapPin, Briefcase, Clock, Building } from "lucide-react"
import { EditJobModal } from "./edit-job-modal"

// Mock data for job listings - ensure these IDs match what's in JobInsightsClientPage.tsx
const initialJobs = [
  {
    id: 1, // Make sure this ID is 1
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    department: "Engineering",
    location: "Remote",
    postedDate: "2023-04-15",
    applicants: 24,
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and modern CSS frameworks.",
    requirements:
      "- 3+ years of experience with React\n- Strong knowledge of TypeScript\n- Experience with state management libraries\n- Understanding of responsive design principles",
    responsibilities:
      "- Develop new user-facing features\n- Build reusable components and libraries\n- Optimize applications for maximum speed and scalability\n- Collaborate with backend developers and designers",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Data Systems",
    department: "Engineering",
    location: "New York, NY",
    postedDate: "2023-04-12",
    applicants: 18,
    type: "Full-time",
    level: "Senior",
    salary: "$110,000 - $140,000",
    description:
      "Join our backend team to build scalable and efficient APIs. Experience with Node.js, databases, and cloud infrastructure required.",
    requirements:
      "- 5+ years of experience with backend development\n- Strong knowledge of Node.js and Express\n- Experience with SQL and NoSQL databases\n- Understanding of cloud services (AWS, Azure, or GCP)",
    responsibilities:
      "- Design and implement APIs\n- Optimize database queries\n- Implement security and data protection measures\n- Integrate with third-party services",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Web Innovations",
    department: "Product",
    location: "San Francisco, CA",
    postedDate: "2023-04-10",
    applicants: 32,
    type: "Contract",
    level: "Mid-level",
    salary: "$90,000 - $120,000",
    description:
      "Looking for a versatile developer who can work on both frontend and backend technologies. Experience with modern JavaScript frameworks and databases is essential.",
    requirements:
      "- 4+ years of experience with full stack development\n- Strong knowledge of JavaScript/TypeScript\n- Experience with React and Node.js\n- Understanding of database design and optimization",
    responsibilities:
      "- Develop end-to-end features\n- Collaborate with product managers and designers\n- Optimize application performance\n- Implement testing and quality assurance practices",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Creative Labs",
    department: "Design",
    location: "Austin, TX",
    postedDate: "2023-04-08",
    applicants: 15,
    type: "Part-time",
    level: "Junior",
    salary: "$60,000 - $75,000",
    description:
      "Help us create intuitive and engaging user experiences. Skills in user research, wireframing, and prototyping are required.",
    requirements:
      "- 2+ years of experience in UX design\n- Proficiency in design tools like Figma or Sketch\n- Understanding of user-centered design principles\n- Basic knowledge of HTML and CSS",
    responsibilities:
      "- Conduct user research and testing\n- Create wireframes and prototypes\n- Collaborate with developers to implement designs\n- Iterate on designs based on user feedback",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Services",
    department: "Infrastructure",
    location: "Seattle, WA",
    postedDate: "2023-04-05",
    applicants: 12,
    type: "Full-time",
    level: "Senior",
    salary: "$120,000 - $150,000",
    description:
      "Join our team to build and maintain our cloud infrastructure. Experience with AWS, Docker, and CI/CD pipelines is required.",
    requirements:
      "- 5+ years of experience in DevOps\n- Strong knowledge of AWS services\n- Experience with Docker and Kubernetes\n- Understanding of CI/CD principles",
    responsibilities:
      "- Design and implement cloud infrastructure\n- Automate deployment processes\n- Monitor system performance and security\n- Troubleshoot and resolve infrastructure issues",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Analytics Pro",
    department: "Data",
    location: "Boston, MA",
    postedDate: "2023-04-03",
    applicants: 28,
    type: "Full-time",
    level: "Mid-level",
    salary: "$95,000 - $125,000",
    description:
      "Help us extract insights from our data. Experience with Python, statistical analysis, and machine learning is required.",
    requirements:
      "- 3+ years of experience in data science\n- Strong knowledge of Python and data analysis libraries\n- Experience with machine learning frameworks\n- Understanding of statistical analysis",
    responsibilities:
      "- Analyze large datasets to extract insights\n- Build predictive models\n- Create data visualizations\n- Communicate findings to stakeholders",
  },
]

export function JobGrid() {
  const router = useRouter()
  const [jobs, setJobs] = useState(initialJobs)
  const [selectedJob, setSelectedJob] = useState<(typeof initialJobs)[0] | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEdit = (jobId: number) => {
    const job = jobs.find((j) => j.id === jobId) || null
    setSelectedJob(job)
    setIsEditModalOpen(true)
  }

  const handleInsights = (jobId: number) => {
    console.log("Navigating to insights for job ID:", jobId)
    // Make sure we're passing a string for the URL
    router.push(`/PisaManager/insights/${jobId.toString()}`)
  }

  const handleSaveJob = (updatedJob: (typeof initialJobs)[0]) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
  }

  const handleDeleteJob = (jobId: number) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow relative">
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {job.applicants} Applications
            </div>
            <CardHeader className="pt-10">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <div className="text-sm text-blue-600 font-medium">{job.department}</div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Building className="h-4 w-4 flex-shrink-0" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="h-4 w-4 flex-shrink-0" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Posted {job.postedDate}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => handleEdit(job.id)} className="flex-1">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button onClick={() => handleInsights(job.id)} variant="outline" className="flex-1">
                <BarChart2 className="mr-2 h-4 w-4" />
                Insights
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EditJobModal
        job={selectedJob}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveJob}
        onDelete={handleDeleteJob}
      />
    </>
  )
}
