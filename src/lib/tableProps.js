import Image from 'next/image'

// ============ TABLE 1: POINTS TABLE ============

export const pointsTableColumns = [
  { 
    header: 'Pos', 
    accessor: 'position',
    cellClassName: 'text-primary/60 font-medium',
  },
  { 
    header: 'Teams', 
    accessor: 'team',
    render: (value, row) => (
      <div className="flex items-center gap-1 md:gap-3">
        <Image 
          src={row.logo} 
          alt={value} 
          width={32} 
          height={32} 
          className="w-5 h-5 md:w-8 md:h-8 object-contain shrink-0" 
        />
        <span className="font-semibold text-primary">
          <span className="md:hidden">{row.shortName}{row.qualified && ' (Q)'}</span>
          <span className="hidden md:inline">{value}{row.qualified && ' (Q)'}</span>
        </span>
      </div>
    ),
  },
  { 
    header: 'MP', 
    accessor: 'played', 
    align: 'center',
  },
  { 
    header: 'Won', 
    accessor: 'won', 
    align: 'center', 
  },
  { 
    header: 'Lost', 
    accessor: 'lost', 
    align: 'center', 
  },
  { 
    header: 'N/R', 
    accessor: 'noResult', 
    align: 'center', 
  },
  { 
    header: 'NRR', 
    accessor: 'nrr', 
    align: 'center',
    render: (value) => (
      <span className={value >= 0 ? 'text-success' : 'text-warning'}>
        {value >= 0 ? '+' : ''}{value.toFixed(3)}
      </span>
    ),
  },
  { 
    header: 'PTS', 
    accessor: 'points', 
    align: 'center',
    cellClassName: 'font-bold text-primary',
  },
]

export const pointsTableData = [
  { id: 1, position: 1, team: 'Punjab Kings', shortName: 'PBKS', logo: '/images/teams/pbks.png', played: 14, won: 9, lost: 4, noResult: 1, nrr: 0.372, points: 19, qualified: true },
  { id: 2, position: 2, team: 'Royal Challengers Bengaluru', shortName: 'RCB', logo: '/images/teams/rcb.png', played: 14, won: 9, lost: 4, noResult: 1, nrr: 0.301, points: 19, qualified: true },
  { id: 3, position: 3, team: 'Gujarat Titans', shortName: 'GT', logo: '/images/teams/gt.png', played: 14, won: 9, lost: 5, noResult: 0, nrr: 0.254, points: 18, qualified: true },
  { id: 4, position: 4, team: 'Mumbai Indians', shortName: 'MI', logo: '/images/teams/mi.png', played: 14, won: 8, lost: 6, noResult: 0, nrr: 1.142, points: 16, qualified: true },
  { id: 5, position: 5, team: 'Delhi Capitals', shortName: 'DC', logo: '/images/teams/dc.png', played: 14, won: 7, lost: 6, noResult: 1, nrr: 0.011, points: 15, qualified: false },
  { id: 6, position: 6, team: 'Sunrisers Hyderabad', shortName: 'SRH', logo: '/images/teams/srh.png', played: 14, won: 6, lost: 7, noResult: 1, nrr: -0.241, points: 13, qualified: false },
  { id: 7, position: 7, team: 'Lucknow Super Giants', shortName: 'LSG', logo: '/images/teams/lsg.png', played: 14, won: 6, lost: 8, noResult: 0, nrr: -0.376, points: 12, qualified: false },
  { id: 8, position: 8, team: 'Kolkata Knight Riders', shortName: 'KKR', logo: '/images/teams/kkr.png', played: 14, won: 5, lost: 7, noResult: 2, nrr: -0.305, points: 12, qualified: false },
  { id: 9, position: 9, team: 'Rajasthan Royals', shortName: 'RR', logo: '/images/teams/rr.png', played: 14, won: 4, lost: 10, noResult: 0, nrr: -0.549, points: 8, qualified: false },
]

export const pointsRowClassName = (row) => 
  row.qualified ? '' : ''

// Table 1 Props
export const table1Props = {
  columns: pointsTableColumns,
  data: pointsTableData,
  rowClassName: pointsRowClassName,
  theme: 'default',
  size: 'default',
}


// ============ TABLE 2: RUNS LEADERBOARD ============

export const runsColumns = [
  { 
    header: 'POS', 
    accessor: 'position',
    cellClassName: 'text-primary/60 font-medium',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'Teams', 
    accessor: 'player',
    headerClassName: 'md:min-w-[200px]',
    render: (value, row) => (
      <div className="py-1">
        <div className="font-semibold text-primary">{value}</div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="border-t border-primary/20 pt-1 flex items-center gap-1.5">
            <Image 
              src={row.teamLogo} 
              alt={row.teamName} 
              width={16} 
              height={16} 
              className="w-4 h-4 object-contain" 
            />
            <span className="text-primary/60 text-xs">
              <span className="md:hidden">{row.teamShortName}</span>
              <span className="hidden md:inline">{row.teamName}</span>
            </span>
          </span>
        </div>
      </div>
    ),
  },
  { 
    header: 'MAT', 
    accessor: 'matches', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-14',
  },
  { 
    header: 'NO', 
    accessor: 'notOuts', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-12',
  },
  { 
    header: 'RUNS', 
    accessor: 'runs', 
    align: 'center',
    headerClassName: 'md:w-16',
    cellClassName: (row, index) => index % 2 === 1 ? 'bg-secondary' : '',
    render: (value, row, index) => (
      <span className={`font-bold ${index % 2 === 1 ? 'text-primary' : 'text-primary'}`}>
        {value}
      </span>
    ),
  },
  { 
    header: 'HS', 
    accessor: 'highScore', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-14',
  },
  { 
    header: 'AVG', 
    accessor: 'average', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-14',
  },
  { 
    header: 'S/R', 
    accessor: 'strikeRate', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-16',
  },
  { 
    header: '100S', 
    accessor: 'centuries', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-12',
  },
  { 
    header: '50S', 
    accessor: 'fifties', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-12',
  },
  { 
    header: '4S', 
    accessor: 'fours', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-12',
  },
  { 
    header: '6S', 
    accessor: 'sixes', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-12',
  },
  { 
    header: 'DUCKS', 
    accessor: 'ducks', 
    align: 'center',
    hideOnMobile: true,
    headerClassName: 'md:w-16',
  },
]

export const runsData = [
  { id: 1, position: 1, player: 'Sai Sudharsan', teamName: 'Gujarat Titans', teamShortName: 'GT', teamLogo: '/images/teams/gt.png', matches: 15, notOuts: 1, runs: 759, highScore: '108*', average: 54.21, strikeRate: 156.17, centuries: 1, fifties: 6, fours: 88, sixes: 21, ducks: 0 },
  { id: 2, position: 2, player: 'Suryakumar Yadav', teamName: 'Mumbai Indians', teamShortName: 'MI', teamLogo: '/images/teams/mi.png', matches: 16, notOuts: 5, runs: 717, highScore: '73*', average: 65.18, strikeRate: 167.91, centuries: 0, fifties: 5, fours: 69, sixes: 38, ducks: 0 },
  { id: 3, position: 3, player: 'Virat Kohli', teamName: 'Royal Challengers Bengaluru', teamShortName: 'RCB', teamLogo: '/images/teams/rcb.png', matches: 15, notOuts: 3, runs: 657, highScore: '73*', average: 54.75, strikeRate: 144.71, centuries: 0, fifties: 8, fours: 66, sixes: 19, ducks: 0 },
  { id: 4, position: 4, player: 'Shubman Gill', teamName: 'Gujarat Titans', teamShortName: 'GT', teamLogo: '/images/teams/gt.png', matches: 15, notOuts: 2, runs: 650, highScore: '93*', average: 50.00, strikeRate: 155.87, centuries: 0, fifties: 6, fours: 62, sixes: 24, ducks: 0 },
  { id: 5, position: 5, player: 'Mitchell Marsh', teamName: 'Lucknow Super Giants', teamShortName: 'LSG', teamLogo: '/images/teams/lsg.png', matches: 13, notOuts: 0, runs: 627, highScore: '117', average: 48.23, strikeRate: 163.7, centuries: 1, fifties: 6, fours: 56, sixes: 37, ducks: 2 },
  { id: 6, position: 6, player: 'Shreyas Iyer', teamName: 'Punjab Kings', teamShortName: 'PBKS', teamLogo: '/images/teams/pbks.png', matches: 17, notOuts: 5, runs: 604, highScore: '97*', average: 50.33, strikeRate: 175.07, centuries: 0, fifties: 6, fours: 43, sixes: 39, ducks: 1 },
]

// Table 2 Props
export const table2Props = {
  columns: runsColumns,
  data: runsData,
  theme: 'default',
  size: 'compact',
  columnDividers: true,
  loadMore: {
    onClick: () => console.log('Load more clicked'),
    text: 'Load More',
  },
}
