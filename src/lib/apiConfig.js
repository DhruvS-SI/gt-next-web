
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002'


export const API_ENDPOINTS = {
  POINTS_TABLE: '/pointsTable',
  RUNS_LEADERBOARD: '/runsLeaderboard',
  BATTING_SCORECARD: '/battingScorecard',
  BOWLING_SCORECARD: '/bowlingScorecard',
  FALL_OF_WICKETS: '/fallOfWickets',
}


export const getApiUrl = (endpoint) => {
  return `${API_BASE}${endpoint}`
}

export const TABLE_API_CONFIG = {
  pointsTable: {
    url: API_ENDPOINTS.POINTS_TABLE,
  },
  
  runsLeaderboard: {
    url: API_ENDPOINTS.RUNS_LEADERBOARD,
    initialPage: 1,
    pageSize: 6,
    enableLoadMore: true,
  },
  
  battingScorecard: {
    url: API_ENDPOINTS.BATTING_SCORECARD,
  },
  
  bowlingScorecard: {
    url: API_ENDPOINTS.BOWLING_SCORECARD,
  },
  
  fallOfWickets: {
    url: API_ENDPOINTS.FALL_OF_WICKETS,
  },
}

