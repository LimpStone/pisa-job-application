"use client"

import { Card } from "@/components/ui/card"

interface LocationMapProps {
  jobId: number
}

export function LocationMap({ jobId }: LocationMapProps) {
  return (
    <Card className="h-[300px] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-500">Geographic distribution map</p>
        <p className="text-sm text-gray-400">(Map visualization would be implemented here)</p>
      </div>
    </Card>
  )
}
