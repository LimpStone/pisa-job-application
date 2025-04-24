"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, BarChart2, MapPin, Briefcase, Clock, Building } from "lucide-react"

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    department: "Engineering",
    location: "Remote",
    postedDate: "2023-04-15",
    applicants: 24,
    type: "Full-time",
    level: "Mid-Senior",
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
  },
]

export function JobGrid() {
  const handleEdit = (jobId: number) => {
    console.log("Edit job:", jobId)
  }

  const handleInsights = (jobId: number) => {
    console.log("View insights for job:", jobId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockJobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow relative">
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
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
  )
}
