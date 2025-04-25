"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for experience distribution
const experienceData = [
  { years: "0-1", count: 5 },
  { years: "1-2", count: 12 },
  { years: "2-3", count: 18 },
  { years: "3-5", count: 25 },
  { years: "5-7", count: 15 },
  { years: "7-10", count: 8 },
  { years: "10+", count: 5 },
]

interface ExperienceChartProps {
  jobId: number
}

export function ExperienceChart({ jobId }: ExperienceChartProps) {
  // In a real app, fetch data based on jobId

  return (
    <ChartContainer
      config={{
        count: {
          label: "Candidates",
          color: "hsl(150, 100%, 50%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={experienceData}>
          <XAxis dataKey="years" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(150, 100%, 50%)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
