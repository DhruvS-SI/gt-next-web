import Image from 'next/image'
import { battingScorecardVariants } from '@/app/develop/tableVariants/battingScorecard'
import { bowlingScorecardVariants } from '@/app/develop/tableVariants/bowlingScorecard'
import { fallOfWicketsVariants } from '@/app/develop/tableVariants/fallOfWickets'

// ============ POINTS TABLE COLUMNS ============
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

// ============ RUNS LEADERBOARD COLUMNS ============
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

// Row styling for qualified teams
export const pointsRowClassName = (row) => 
  row.qualified ? '' : ''

// ============ BATTING SCORECARD COLUMNS ============
const battingVariants = battingScorecardVariants()

export const battingScorecardColumns = [
  { 
    header: 'Batting', 
    accessor: 'player',
    headerClassName: 'text-left',
    render: (value, row) => {
      const trendVariant = row.trend ? battingScorecardVariants({ trend: row.trend }) : null
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={battingVariants.playerName()}>{value}</span>
            {row.isCaptain && <span className={battingVariants.playerBadge()}>(c)</span>}
            {row.isWicketkeeper && <span className={battingVariants.playerBadge()}>(w)</span>}
            {row.trend === 'up' && trendVariant && <span className={trendVariant.trendIcon()}>↑</span>}
            {row.trend === 'down' && trendVariant && <span className={trendVariant.trendIcon()}>↓</span>}
          </div>
          {row.status === 'not out' ? (
            <span className={battingVariants.dismissalItalic()}>not out</span>
          ) : (
            <span className={battingVariants.dismissal()}>{row.dismissal}</span>
          )}
        </div>
      )
    },
  },
  { 
    header: 'R', 
    accessor: 'runs', 
    align: 'center',
    headerClassName: 'md:w-12',
    cellClassName: 'font-medium',
  },
  { 
    header: 'B', 
    accessor: 'balls', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: '4s', 
    accessor: 'fours', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: '6s', 
    accessor: 'sixes', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'S/R', 
    accessor: 'strikeRate', 
    align: 'center',
    headerClassName: 'md:w-16',
    render: (value) => value.toFixed(2),
  },
]

// ============ BOWLING SCORECARD COLUMNS ============
const bowlingVariants = bowlingScorecardVariants()

export const bowlingScorecardColumns = [
  { 
    header: 'Bowling', 
    accessor: 'bowler',
    headerClassName: 'text-left',
    render: (value, row) => {
      const trendVariant = row.trend ? bowlingScorecardVariants({ trend: row.trend }) : null
      return (
        <div className="flex items-center gap-1.5">
          <span className={bowlingVariants.bowlerName()}>{value}</span>
          {row.trend === 'up' && trendVariant && <span className={trendVariant.trendIcon()}>↑</span>}
          {row.trend === 'down' && trendVariant && <span className={trendVariant.trendIcon()}>↓</span>}
        </div>
      )
    },
  },
  { 
    header: 'O', 
    accessor: 'overs', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'M', 
    accessor: 'maidens', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'R', 
    accessor: 'runs', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'W', 
    accessor: 'wickets', 
    align: 'center',
    headerClassName: 'md:w-12',
    cellClassName: 'font-medium',
  },
  { 
    header: 'NB', 
    accessor: 'noBalls', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'WD', 
    accessor: 'wides', 
    align: 'center',
    headerClassName: 'md:w-12',
  },
  { 
    header: 'E/R', 
    accessor: 'economyRate', 
    align: 'center',
    headerClassName: 'md:w-16',
    render: (value) => value.toFixed(2),
  },
]

// ============ FALL OF WICKETS COLUMNS ============
const fallOfWicketsVars = fallOfWicketsVariants()

export const fallOfWicketsColumns = [
  { 
    header: 'Fall of Wickets', 
    accessor: 'score',
    headerClassName: 'text-left',
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <span className={fallOfWicketsVars.score()}>{value}</span>
        <span className={fallOfWicketsVars.separator()}>-</span>
        <span className={fallOfWicketsVars.wicketNumber()}>{row.wicketNumber}</span>
        <span className={`${fallOfWicketsVars.playerName()} ml-2`}>{row.player}</span>
        {row.isCaptain && <span className={fallOfWicketsVars.playerBadge()}>(c)</span>}
        {row.isWicketkeeper && <span className={fallOfWicketsVars.playerBadge()}>(w)</span>}
      </div>
    ),
  },
  { 
    header: 'Overs', 
    accessor: 'over',
    align: 'right',
    headerClassName: 'text-right md:w-20',
    cellClassName: fallOfWicketsVars.over(),
  },
]

