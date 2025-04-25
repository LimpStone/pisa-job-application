"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CandidateList } from "@/components/candidate-list"
import { ScoreDistributionChart } from "@/components/charts/score-distribution-chart"
import { EducationPieChart } from "@/components/charts/education-pie-chart"
import { SkillsBarChart } from "@/components/charts/skills-bar-chart"
import { LocationMap } from "@/components/charts/location-map"
import { ExperienceChart } from "@/components/charts/experience-chart"

// Mock job data - ensure these IDs match what's in job-grid.tsx
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    department: "Engineering",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Data Systems",
    department: "Engineering",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Web Innovations",
    department: "Product",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Creative Labs",
    department: "Design",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Services",
    department: "Infrastructure",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Analytics Pro",
    department: "Data",
  },
]

export default function JobInsightsClientPage() {
  const router = useRouter()
  const params = useParams()
  const [job, setJob] = useState<any>(null)
  const [chartMetric, setChartMetric] = useState("score")

  useEffect(() => {
    // Get jobId directly from the URL params
    const jobIdParam = params?.jobId

    // Log the raw jobId from URL params
    console.log("Raw jobId from URL params:", jobIdParam)

    // Parse the jobId as a number, with a fallback to prevent NaN
    const jobId = jobIdParam ? Number.parseInt(jobIdParam as string, 10) : 0

    console.log("Parsed jobId:", jobId)
    console.log(
      "Available jobs:",
      jobsData.map((j) => j.id),
    )

    // In a real app, fetch job data from API
    const foundJob = jobsData.find((j) => j.id === jobId)

    console.log("Found job:", foundJob)

    if (foundJob) {
      setJob(foundJob)
    } else {
      console.log("Job not found, redirecting to /PisaManager")
      // Job not found, redirect back to PisaManager page
      router.push("/PisaManager")
    }
  }, [params, router])

  // If job is null, show loading state
  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading job insights...</p>
      </div>
    )
  }

  // Parse jobId for chart components
  const jobId = params?.jobId ? Number.parseInt(params.jobId as string, 10) : 0

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/PisaManager")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{job.title} - Insights</h1>
        </div>
        <div className="text-sm text-gray-500">
          {job.company} • {job.department}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Candidate Analytics</CardTitle>
              <Select value={chartMetric} onValueChange={setChartMetric}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">ML Score</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="skills">Skills</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="distribution">Distribution</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="pt-4">
                  {chartMetric === "score" && <ScoreDistributionChart jobId={jobId} />}
                  {chartMetric === "education" && <EducationPieChart jobId={jobId} />}
                  {chartMetric === "skills" && <SkillsBarChart jobId={jobId} />}
                  {chartMetric === "experience" && <ExperienceChart jobId={jobId} />}
                </TabsContent>
                <TabsContent value="map" className="pt-4">
                  <LocationMap jobId={jobId} />
                </TabsContent>
                <TabsContent value="distribution" className="pt-4">
                  <ScoreDistributionChart jobId={jobId} type="dot" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillsBarChart jobId={jobId} limit={5} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Candidates</span>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CandidateList jobId={jobId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
