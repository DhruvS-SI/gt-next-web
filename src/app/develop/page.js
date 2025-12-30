import { notFound } from 'next/navigation'
import Table from '@/components/reusable/table'
import NewCard from '@/components/reusable/newcard'

export default function DevelopPage() {
  // Only accessible in development
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  // Sample data for Table
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Position', accessor: 'position' },
    { header: 'Goals', accessor: 'goals' },
  ]

  const data = [
    { name: 'Player One', position: 'Forward', goals: 12 },
    { name: 'Player Two', position: 'Midfielder', goals: 8 },
    { name: 'Player Three', position: 'Defender', goals: 2 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">🛠️ Component Playground</h1>

      {/* NewCard Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">NewCard Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NewCard title="Basic Card" description="This is a basic card with title and description" />
          <NewCard title="Card with Content">
            <p className="text-sm text-gray-500">Custom children content here</p>
          </NewCard>
        </div>
      </section>

      {/* Table Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Table Component</h2>
        <div className="bg-white rounded-lg p-4">
          <Table columns={columns} data={data} />
        </div>
      </section>

      {/* Add more component sections here as you build them */}
    </div>
  )
}

