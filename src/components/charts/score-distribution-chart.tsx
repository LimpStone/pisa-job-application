"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Scatter, ScatterChart, ZAxis } from "recharts"

interface ScoreDistributionChartProps {
  jobId: number
  data: {
    totalApplications: number
    averageScore: number
    applications?: Array<{
      score: number
    }>
  }
  type?: "bar" | "dot"
}

export function ScoreDistributionChart({ jobId, data, type = "bar" }: ScoreDistributionChartProps) {
  // Crear rangos de scores
  const ranges = [
    { min: 0, max: 20, label: "0-20" },
    { min: 21, max: 40, label: "21-40" },
    { min: 41, max: 60, label: "41-60" },
    { min: 61, max: 80, label: "61-80" },
    { min: 81, max: 100, label: "81-100" },
  ]

  // Calcular la distribución de scores
  const chartData = ranges.map(range => {
    const count = data.applications?.filter(app => 
      app.score >= range.min && app.score <= range.max
    ).length || 0

    return {
      score: range.label,
      count
    }
  })

  // Añadir el promedio como un punto en el gráfico de dispersión
  const averageData = [{ score: data.averageScore, count: 1 }]

  return (
    <Card className="p-4">
      <div className="h-[300px]">
        {type === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="score" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis type="number" dataKey="score" domain={[0, 100]} />
              <YAxis type="number" dataKey="count" domain={[0, 1]} />
              <ZAxis type="number" range={[100]} />
              <Tooltip />
              <Scatter data={averageData} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">Average Score: {data.averageScore.toFixed(1)}</p>
        <p className="text-sm text-gray-500">Total Applications: {data.totalApplications}</p>
      </div>
    </Card>
  )
}
