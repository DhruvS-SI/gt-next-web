import Table from '@/components/reusable/table'
import { pointsTableColumns } from '@/lib/tableConfig'
import dbData from '@/data/db.json'

export const metadata = {
  title: 'IPL 2025 Standings | Points Table',
  description: 'View the complete IPL 2025 points table and team standings',
}

export default function StandingsPage() {
  const standingsData = dbData.pointsTable

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            IPL 2025 Standings
          </h1>
        </div>

        {/* Standings Table */}
        <div className="bg-card rounded-lg overflow-x-auto shadow-lg">
          <Table
            columns={pointsTableColumns}
            data={standingsData}
            theme="default"
            size="default"
            stickyHeader={false}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-card rounded-lg">
          <h3 className="text-sm font-semibold text-primary mb-2">Legend:</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary/70">
            <div><span className="font-medium">Pos</span> - Position</div>
            <div><span className="font-medium">MP</span> - Matches Played</div>
            <div><span className="font-medium">Won</span> - Matches Won</div>
            <div><span className="font-medium">Lost</span> - Matches Lost</div>
            <div><span className="font-medium">N/R</span> - No Result</div>
            <div><span className="font-medium">NRR</span> - Net Run Rate</div>
            <div><span className="font-medium">PTS</span> - Points</div>
            <div><span className="font-medium">(Q)</span> - Qualified for Playoffs</div>
          </div>
        </div>
      </div>
    </div>
  )
}
