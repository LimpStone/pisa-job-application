"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CreateJobPanel() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement job creation logic here
    console.log("Creating new job:", jobData)
    // Reset form after submission
    setJobData({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: "",
      salary: "",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Create New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              placeholder="e.g. Tech Solutions Inc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York, NY"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary Range</Label>
            <Input
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Enter job description..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              placeholder="Enter job requirements..."
              rows={3}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Create Job
        </Button>
      </CardFooter>
    </Card>
  )
}
