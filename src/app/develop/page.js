'use client'

import Table from '@/components/reusable/table'
import NewCard from '@/components/reusable/newcard'
import { Article } from '@/components/reusable/Article'
import { SocialShare } from '@/components/SocialShare'
import { useTable } from '@/hooks/useTable'
import { useArticle } from '@/hooks/useArticle'
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

  const articlesData = useArticle('articles')

  const isLoading = 
    runsTable.initialLoading || 
    pointsTable.initialLoading || 
    battingTable.initialLoading || 
    bowlingTable.initialLoading || 
    fallOfWicketsTable.initialLoading ||
    articlesData.loading

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



      {/* SocialShare Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">SocialShare Component</h2>
        <div className="max-w-2xl">
          <SocialShare 
            url="https://example.com" 
            title="Check out this amazing content!" 
          />
        </div>
      </section>

      {/* Article Component Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-secondary mb-4">Article Component</h2>
        
        {/* Example: 2 cards on top row */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Default Variant - 2 Cards (1/2 width each)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articlesData.articles.slice(0, 2).map((article) => (
              <Article
                key={article.id}
                {...article}
                variant={article.variant || 'default'}
                width={article.width || '1/2'}
              />
            ))}
          </div>
        </div>

        {/* Example: 4 cards in second row with overlay variant */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Overlay Variant - 4 Cards (1/4 width each)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articlesData.articles.slice(2, 6).map((article) => (
              <Article
                key={article.id}
                {...article}
                variant={article.variant || 'overlay'}
                width={article.width || '1/4'}
              />
            ))}
          </div>
        </div>

        {/* Example: Mixed variants - 3 cards */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Mixed Variants - Video, Default, and Overlay</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articlesData.articles.slice(6, 9).map((article) => (
              <Article
                key={article.id}
                {...article}
                variant={article.variant || 'default'}
                width={article.width || '1/3'}
              />
            ))}
          </div>
        </div>

        {/* Example: Full width single card */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Full Width Card</h3>
          <div className="max-w-4xl">
            {articlesData.articles.slice(0, 1).map((article) => (
              <Article
                key={`full-${article.id}`}
                {...article}
                variant="default"
                width="full"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
