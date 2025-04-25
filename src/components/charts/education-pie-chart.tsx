"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Mock data for education distribution
const educationData = [
  { name: "Bachelor's Degree", value: 45 },
  { name: "Master's Degree", value: 35 },
  { name: "PhD", value: 10 },
  { name: "Associate's Degree", value: 8 },
  { name: "High School", value: 2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

interface EducationPieChartProps {
  jobId: number
}

export function EducationPieChart({ jobId }: EducationPieChartProps) {
  // In a real app, fetch data based on jobId

  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={educationData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {educationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
