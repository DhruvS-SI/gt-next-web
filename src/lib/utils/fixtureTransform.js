/**
 * Transform API fixture data to match component structure
 */

export function parseScore(scoreString) {
  if (!scoreString) return null;
  
  // Handle formats like "177/3 (16.2)", "163 (18.4)", "177/3 (16.2) & 13/0 (0.4)"
  const mainScore = scoreString.split('&')[0].trim();
  const scoreMatch = mainScore.match(/(\d+)\/(\d+)\s*\(([\d.]+)\)/);
  
  if (scoreMatch) {
    return {
      runs: parseInt(scoreMatch[1]),
      wickets: parseInt(scoreMatch[2]),
      overs: scoreMatch[3]
    };
  }
  
  // Handle all out scores like "163 (18.4)"
  const allOutMatch = mainScore.match(/(\d+)\s*\(([\d.]+)\)/);
  if (allOutMatch) {
    return {
      runs: parseInt(allOutMatch[1]),
      wickets: 10,
      overs: allOutMatch[2]
    };
  }
  
  return null;
}

export function determineVariant(match) {
  // Check if match is live - event_state "L" and status_id 117 (Play In Progress)
  if (match.event_state === 'L' && match.event_status_id === 117) {
    return 'live';
  }
  
  // Check if match has ended (recent) - status_id 114 = Match Ended
  if (match.event_state === 'R' && match.event_status_id === 114) {
    return 'recent';
  }
  
  // Check if match is abandoned - status_id 113 = Match Abandoned, 130 = Match Abandoned without toss
  if (match.event_status_id === 113 || match.event_status_id === 130) {
    return 'recent'; // Treat abandoned as recent
  }
  
  // Check if match is upcoming - event_state "U" or status_id 115 (Match Yet to Begin)
  if (match.event_state === 'U' || match.event_status_id === 115) {
    return 'upcoming';
  }
  
  // Fallback: Check if match is currently live based on time
  const now = new Date();
  const startDate = new Date(match.start_date);
  const endDate = match.end_date ? new Date(match.end_date) : null;
  
  if (endDate && now >= startDate && now <= endDate && match.event_status_id !== 114) {
    if (match.event_status && (match.event_status.toLowerCase().includes('live') || match.event_status.toLowerCase().includes('play in progress') || match.event_livecoverage === 'true')) {
      return 'live';
    }
  }
  
  // Otherwise it's upcoming
  return 'upcoming';
}

export function extractMatchNumber(eventName) {
  // Extract number from "Match 1", "Match 17", "Qualifier 1", "Final", etc.
  if (!eventName) return 0;
  
  // Handle special cases
  if (eventName.toLowerCase().includes('final')) return 999;
  if (eventName.toLowerCase().includes('qualifier')) {
    const match = eventName.match(/qualifier\s*(\d+)/i);
    return match ? 900 + parseInt(match[1]) : 900;
  }
  if (eventName.toLowerCase().includes('eliminator')) return 800;
  
  // Extract number from "Match X"
  const match = eventName.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

export function formatMatchStartTime(startDate) {
  const date = new Date(startDate);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function transformFixture(apiMatch) {
  const variant = determineVariant(apiMatch);
  const matchNumber = extractMatchNumber(apiMatch.event_name);
  
  // Get teams - firstup indicates team that batted first
  const team1 = apiMatch.participants?.find(p => p.firstup) || apiMatch.participants?.[0];
  const team2 = apiMatch.participants?.find(p => !p.firstup) || apiMatch.participants?.[1];
  
  if (!team1 || !team2) {
    console.warn('Missing team data in match:', apiMatch.match_id);
    return null;
  }
  
  const team1Score = team1.value ? parseScore(team1.value) : null;
  const team2Score = team2.value ? parseScore(team2.value) : null;
  
  // Build result string for recent matches
  let result = null;
  if (variant === 'recent' && apiMatch.event_sub_status) {
    result = apiMatch.event_sub_status;
  }
  
  // Build match status for live matches
  let matchStatus = null;
  if (variant === 'live') {
    // Use event_sub_status or short_event_status for live matches
    matchStatus = apiMatch.event_sub_status || apiMatch.short_event_status || 'Match in progress';
  }
  
  const fixture = {
    id: parseInt(apiMatch.match_id),
    variant,
    matchNumber,
    matchDate: apiMatch.start_date,
    venue: apiMatch.venue_name || 'TBD',
    team1: {
      name: team1.name,
      shortName: team1.short_name || team1.short_name_eng || team1.name,
      logo: `/teams/${team1.id}.png`,
      ...(team1Score && { score: team1Score })
    },
    team2: {
      name: team2.name,
      shortName: team2.short_name || team2.short_name_eng || team2.name,
      logo: `/teams/${team2.id}.png`,
      ...(team2Score && { score: team2Score })
    }
  };
  
  if (variant === 'upcoming') {
    fixture.matchStartTime = formatMatchStartTime(apiMatch.start_date);
  }
  
  if (variant === 'live' && matchStatus) {
    fixture.matchStatus = matchStatus;
  }
  
  if (variant === 'recent' && result) {
    fixture.result = result;
  }
  
  return fixture;
}
