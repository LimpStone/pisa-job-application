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
import { getJobApplications } from "@/app/actions/job-actions"

interface JobInsightsClientPageProps {
  initialData: {
    job: {
      id: number
      title: string
      company: string
      department: string
    }
    stats: {
      totalApplications: number
      averageScore: number
      educationStats: Record<string, number>
      skillsStats: Record<string, number>
      experienceStats: Record<string, number>
      locationStats: Record<string, number>
      applications: Array<{ score: number }>
    }
  }
}

export default function JobInsightsClientPage({ initialData }: JobInsightsClientPageProps) {
  const router = useRouter()
  const params = useParams()
  const [chartMetric, setChartMetric] = useState("score")
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const jobId = parseInt(params.jobId as string)
        const apps = await getJobApplications(jobId)
        setApplications(apps)
      } catch (error) {
        console.error("Error loading applications:", error)
      }
    }

    loadApplications()
  }, [params.jobId])

  const { job, stats } = initialData

  const renderVisualization = () => {
    switch (chartMetric) {
      case "score":
        return (
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <ScoreDistributionChart jobId={job.id} data={stats} type="bar" />
            </TabsContent>
            <TabsContent value="pie" className="pt-4">
              <EducationPieChart jobId={job.id} data={stats.applications?.reduce((acc, app) => {
                const range = Math.floor(app.score / 20) * 20
                const key = `${range}-${range + 19}`
                acc[key] = (acc[key] || 0) + 1
                return acc
              }, {} as Record<string, number>) || {}} />
            </TabsContent>
            <TabsContent value="distribution" className="pt-4">
              <ScoreDistributionChart jobId={job.id} data={stats} type="dot" />
            </TabsContent>
          </Tabs>
        )
      case "education":
        return (
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <SkillsBarChart jobId={job.id} data={stats.educationStats} />
            </TabsContent>
            <TabsContent value="pie" className="pt-4">
              <EducationPieChart jobId={job.id} data={stats.educationStats} />
            </TabsContent>
          </Tabs>
        )
      case "skills":
        return (
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <SkillsBarChart jobId={job.id} data={stats.skillsStats} />
            </TabsContent>
            <TabsContent value="pie" className="pt-4">
              <EducationPieChart jobId={job.id} data={stats.skillsStats} />
            </TabsContent>
          </Tabs>
        )
      case "experience":
        return (
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <ExperienceChart jobId={job.id} data={stats.experienceStats} />
            </TabsContent>
            <TabsContent value="pie" className="pt-4">
              <EducationPieChart jobId={job.id} data={stats.experienceStats} />
            </TabsContent>
          </Tabs>
        )
      case "location":
        return <LocationMap jobId={job.id} data={stats.locationStats} />
      default:
        return null
    }
  }

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
              {renderVisualization()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillsBarChart jobId={job.id} data={stats.skillsStats} limit={5} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Candidates ({stats.totalApplications})</span>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CandidateList jobId={job.id}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
