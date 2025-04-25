"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for skills distribution
const skillsData = [
  { name: "React", count: 42 },
  { name: "JavaScript", count: 38 },
  { name: "TypeScript", count: 30 },
  { name: "Node.js", count: 25 },
  { name: "Python", count: 22 },
  { name: "AWS", count: 18 },
  { name: "SQL", count: 15 },
  { name: "GraphQL", count: 12 },
  { name: "Docker", count: 10 },
  { name: "MongoDB", count: 8 },
]

interface SkillsBarChartProps {
  jobId: number
  limit?: number
}

export function SkillsBarChart({ jobId, limit = 10 }: SkillsBarChartProps) {
  // In a real app, fetch data based on jobId
  const limitedData = skillsData.slice(0, limit)

  return (
    <ChartContainer
      config={{
        count: {
          label: "Candidates",
          color: "hsl(200, 100%, 60%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={limitedData} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(200, 100%, 60%)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
