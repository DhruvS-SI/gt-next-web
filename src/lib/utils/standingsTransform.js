/**
 * Transform API standings data to app format
 * @param {Object} apiData - The API response data from standings endpoint
 * @returns {Array} Transformed standings data
 */
export function transformStandingsData(apiData) {
  if (!apiData?.standings?.stages?.stage?.[0]?.group?.[0]?.entities?.entity) {
    return []
  }

  const entities = apiData.standings.stages.stage[0].group[0].entities.entity

  return entities.map((entity) => {
    const teamId = entity.id
    const sportKeys = entity.sport_specific_keys

    return {
      id: teamId,
      position: parseInt(entity.position),
      team: entity.name,
      shortName: entity.short_name,
      logo: `/teams/${teamId}.png`,
      played: parseInt(sportKeys.events_played),
      won: parseInt(sportKeys.wins),
      lost: parseInt(sportKeys.lost),
      noResult: parseInt(sportKeys.no_result),
      nrr: parseFloat(sportKeys.net_run_rate),
      points: parseInt(sportKeys.points),
      qualified: entity.is_qualified === 'true',
      // Additional metadata if needed
      prevPosition: parseInt(entity.prev_position),
      positionStatus: entity.position_status,
    }
  })
}

/**
 * Get team logo path by team ID
 * @param {string|number} teamId - The team ID
 * @returns {string} Path to team logo
 */
export function getTeamLogoPath(teamId) {
  return `/teams/${teamId}.png`
}

/**
 * Format NRR for display
 * @param {number} nrr - Net run rate value
 * @returns {string} Formatted NRR string
 */
export function formatNRR(nrr) {
  const formatted = nrr.toFixed(3)
  return nrr >= 0 ? `+${formatted}` : formatted
}
