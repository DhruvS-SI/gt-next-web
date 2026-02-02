// ============ FIXTURE CARD CONFIGURATIONS ============
// Card rendering configurations for different fixture variants

export const fixtureCardConfigs = {
  live: {
    statusText: 'LIVE',
    showLiveIndicator: true,
    showScores: true,
    showMatchStatus: true,
    showCountdown: false,
    showMatchStartTime: false,
    showResult: false,
    actionButtonText: 'Match Center',
    actionButtonLink: '#',
    actionButtonTarget: '_self',
  },
  upcoming: {
    statusText: 'UPCOMING',
    showLiveIndicator: false,
    showScores: false,
    showMatchStatus: false,
    showCountdown: true,
    showMatchStartTime: true,
    showResult: false,
    actionButtonText: 'Book Ticket',
    actionButtonLink: 'https://in.bookmyshow.com/',
    actionButtonTarget: '_blank',
  },
  recent: {
    statusText: 'RECENT',
    showLiveIndicator: false,
    showScores: true,
    showMatchStatus: false,
    showCountdown: false,
    showMatchStartTime: false,
    showResult: true,
    actionButtonText: 'Match Center',
    actionButtonLink: '#',
    actionButtonTarget: '_self',
  },
}

// Default fixture strip settings
export const fixtureStripDefaults = {
  title: 'TATA IPL 2024 RESULTS',
  showMore: true,
  swiperBreakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
  swiperSpaceBetween: 0,
  swiperSlidesPerView: 1,
}

// Helper function to get card config for a variant
export const getFixtureCardConfig = (variant = 'upcoming') => {
  return fixtureCardConfigs[variant] || fixtureCardConfigs.upcoming
}
