"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for score distribution
const scoreData = [
  { score: "60-65", count: 2 },
  { score: "65-70", count: 3 },
  { score: "70-75", count: 5 },
  { score: "75-80", count: 8 },
  { score: "80-85", count: 12 },
  { score: "85-90", count: 15 },
  { score: "90-95", count: 10 },
  { score: "95-100", count: 5 },
]

interface ScoreDistributionChartProps {
  jobId: number
  type?: "bar" | "dot"
}

export function ScoreDistributionChart({ jobId, type = "bar" }: ScoreDistributionChartProps) {
  // In a real app, fetch data based on jobId

  return (
    <ChartContainer
      config={{
        count: {
          label: "Candidates",
          color: "hsl(215, 100%, 60%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={scoreData}>
          <XAxis dataKey="score" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="hsl(215, 100%, 60%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
