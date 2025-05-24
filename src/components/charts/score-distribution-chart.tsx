"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Scatter, ScatterChart, ZAxis, Line } from "recharts"

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

  // Preparar datos para el gráfico de dispersión
  const scatterData = data.applications?.map(app => ({
    score: app.score,
    count: 1,
    // Añadir un valor aleatorio pequeño para evitar superposición exacta
    jitter: Math.random() * 0.8 + 0.1 // valor entre 0.1 y 0.9
  })) || []

  // Ordenar los datos por score para que la línea se dibuje correctamente
  const sortedData = [...scatterData].sort((a, b) => a.score - b.score)

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
              <YAxis type="number" dataKey="jitter" domain={[0, 1]} hide />
              <ZAxis type="number" range={[50, 50]} />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  `Score: ${value}`, 
                  'Application'
                ]}
              />
              <Line 
                type="monotone"
                data={sortedData}
                dataKey="jitter"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
              <Scatter 
                data={scatterData} 
                fill="#3b82f6" 
                shape="circle"
              />
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
