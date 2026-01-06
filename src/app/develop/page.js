'use client'

import Table from '@/components/reusable/table'
import NewCard from '@/components/reusable/newcard'
import { useTable } from '@/hooks/useTable'
import { TABLE_API_CONFIG } from '@/lib/apiConfig'
import { 
  pointsTableColumns, 
  runsColumns, 
  pointsRowClassName,
  battingScorecardColumns,
  bowlingScorecardColumns,
  fallOfWicketsColumns
} from '@/lib/tableConfig'

export default function DevelopPage() {
  const runsTable = useTable(TABLE_API_CONFIG.runsLeaderboard)

  const pointsTable = useTable(TABLE_API_CONFIG.pointsTable)

  const battingTable = useTable(TABLE_API_CONFIG.battingScorecard)

  
  const bowlingTable = useTable(TABLE_API_CONFIG.bowlingScorecard)

  const fallOfWicketsTable = useTable(TABLE_API_CONFIG.fallOfWickets)

  const isLoading = 
    runsTable.initialLoading || 
    pointsTable.initialLoading || 
    battingTable.initialLoading || 
    bowlingTable.initialLoading || 
    fallOfWicketsTable.initialLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary p-4 md:p-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">🛠️ Component Playground</h1>

      {/* Points Table Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Points Table</h2>
        <div className="">
          <Table 
            columns={pointsTableColumns} 
            data={pointsTable.data} 
            rowClassName={pointsRowClassName}
            theme="default"
            size="default"
          />
        </div>
      </section>

      {/* Runs Leaderboard Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Orange Cap - Most Runs</h2>
        <div className="max-w-6xl">
          <Table 
            columns={runsColumns} 
            data={runsTable.data}
            theme="default"
            size="compact"
            columnDividers={true}
            loadMore={runsTable.loadMoreProps}
          />
        </div>
      </section>

      {/* Batting Scorecard Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Batting Scorecard</h2>
        <div className="max-w-4xl">
          <Table 
            columns={battingScorecardColumns} 
            data={battingTable.data}
            theme="default"
            size="compact"
          />
        </div>
      </section>

      {/* Bowling Scorecard Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Bowling Scorecard</h2>
        <div className="max-w-4xl">
          <Table 
            columns={bowlingScorecardColumns} 
            data={bowlingTable.data}
            theme="default"
            size="compact"
          />
        </div>
      </section>

      {/* Fall of Wickets Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Fall of Wickets</h2>
        <div className="max-w-2xl">
          <Table 
            columns={fallOfWicketsColumns} 
            data={fallOfWicketsTable.data}
            theme="default"
            size="compact"
          />
        </div>
      </section>

      {/* NewCard Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">NewCard Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NewCard title="Basic Card" description="This is a basic card with title and description" />
          <NewCard title="Card with Content">
            <p className="text-sm text-secondary/70">Custom children content here</p>
          </NewCard>
        </div>
      </section>
    </div>
  )
}
