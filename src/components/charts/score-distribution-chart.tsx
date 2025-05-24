"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

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
  // Add debugging logs
  console.log("Chart data received:", data)
  console.log("Applications array:", data.applications)
  console.log("Applications length:", data.applications?.length)

  // Create ranges for bar chart
  const ranges = [
    { min: 0, max: 20, label: "0-20" },
    { min: 21, max: 40, label: "21-40" },
    { min: 41, max: 60, label: "41-60" },
    { min: 61, max: 80, label: "61-80" },
    { min: 81, max: 100, label: "81-100" },
  ]

  const chartData = ranges.map((range) => {
    const count =
      data.applications?.filter((app) => {
        // Add safety checks
        const score = typeof app.score === "number" ? app.score : Number(app.score)
        return !isNaN(score) && score >= range.min && score <= range.max
      }).length || 0

    return {
      score: range.label,
      count,
    }
  })

  console.log("Bar chart data:", chartData)

  // Group scores and count frequency for line chart with better error handling
  const scoreFrequencyMap = new Map<number, number>()

  if (data.applications && Array.isArray(data.applications)) {
    data.applications.forEach((app, index) => {
      try {
        // Convert score to number and validate
        const score = typeof app.score === "number" ? app.score : Number(app.score)

        if (isNaN(score)) {
          console.warn(`Invalid score at index ${index}:`, app.score)
          return
        }

        // Round score to nearest integer to avoid floating point issues
        const roundedScore = Math.round(score)
        scoreFrequencyMap.set(roundedScore, (scoreFrequencyMap.get(roundedScore) || 0) + 1)
      } catch (error) {
        console.error(`Error processing application at index ${index}:`, error, app)
      }
    })
  }

  console.log("Score frequency map:", Array.from(scoreFrequencyMap.entries()))

  const scatterData = Array.from(scoreFrequencyMap.entries())
    .map(([score, count]) => ({
      score,
      count,
    }))
    .sort((a, b) => a.score - b.score)

  console.log("Scatter data:", scatterData)

  // Create a complete dataset with 0 values for missing scores to ensure smooth line
  const completeLineData = []
  for (let score = 0; score <= 100; score += 5) {
    const existingData = scatterData.find((item) => item.score === score)
    completeLineData.push({
      score,
      count: existingData ? existingData.count : 0,
    })
  }

  console.log("Complete line data sample:", completeLineData.slice(0, 5))

  // Custom dot component that only renders when count > 0
  const CustomDot = (props: any) => {
    try {
      const { cx, cy, payload } = props
      if (payload && typeof payload.count === "number" && payload.count > 0) {
        return <circle cx={cx} cy={cy} r={4} fill="#8F3BF6FF" stroke="#38188BFF" strokeWidth={2} />
      }
      return null
    } catch (error) {
      console.error("Error in CustomDot:", error)
      return null
    }
  }

  // Custom active dot for hover
  const CustomActiveDot = (props: any) => {
    try {
      const { cx, cy, payload } = props
      if (payload && typeof payload.count === "number" && payload.count > 0) {
        return <circle cx={cx} cy={cy} r={6} fill="#763BF6FF" stroke="#E6B7FFFF" strokeWidth={2} />
      }
      return null
    } catch (error) {
      console.error("Error in CustomActiveDot:", error)
      return null
    }
  }

  // Add fallback for when there's no data
  if (!data.applications || data.applications.length === 0) {
    return (
      <div className="p-4">
        <div className="h-[300px] flex items-center justify-center border border-gray-200 rounded">
          <p className="text-gray-500">No application data available</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Average Score: {data.averageScore.toFixed(1)}</p>
          <p className="text-sm text-gray-500">Total Applications: {data.totalApplications}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="h-[300px]">
        {type === "bar" ? (
          <ChartContainer
            config={{
              count: {
                label: "Applications",
                color: "hsl(215, 100%, 60%)",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(215, 100%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <ChartContainer
            config={{
              count: {
                label: "Applications",
                color: "hsl(215, 100%, 60%)",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completeLineData}>
                <XAxis
                  type="number"
                  dataKey="score"
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis type="number" dataKey="count" allowDecimals={false} />
                <Tooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: any, name: string) => [value, name === "count" ? "Applications" : "Score"]}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4656D2FF"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={<CustomActiveDot />}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">Average Score: {data.averageScore.toFixed(1)}</p>
        <p className="text-sm text-gray-500">Total Applications: {data.totalApplications}</p>
      </div>
    </div>
  )
}
