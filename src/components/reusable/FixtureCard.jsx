'use client';

import { useState, useEffect } from 'react';
import { fixtureCardStyles } from '@/lib/variants/fixtureCard';
import { getFixtureCardConfig } from '@/lib/fixtureConfig';
import Image from 'next/image';

export default function FixtureCard({ fixture, variant = 'upcoming', rounded = true }) {
  const styles = fixtureCardStyles({ variant, rounded });
  const cardConfig = getFixtureCardConfig(variant);
  const [countdown, setCountdown] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculateCountdown = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Update countdown timer for upcoming fixtures
  useEffect(() => {
    if (variant === 'upcoming' && fixture.matchDate) {
      const updateCountdown = () => {
        setCountdown(calculateCountdown(fixture.matchDate));
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [variant, fixture.matchDate]);

  const getStatusText = () => {
    return cardConfig.statusText;
  };

  const getActionButtonText = () => {
    return cardConfig.actionButtonText;
  };

  const getActionButtonLink = () => {
    return cardConfig.actionButtonLink;
  };


  return (
    <div className={styles.container()}>
      <div className={styles.background()} />
      <div 
        className={styles.pattern()}
        style={{
          backgroundImage: 'url(/pattern-04.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={styles.content()}>
        {/* Header */}
        <div className={styles.header()}>
          <div className={styles.location()}>
            <span>{fixture.venue}</span>
          </div>
          <div className={styles.statusBadge()}>
            {cardConfig.showLiveIndicator && <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />}
            {getStatusText()}
          </div>
        </div>

        {/* Teams Section */}
        <div className={styles.teamsSection()}>
          {/* Team 1 */}
          <div className={styles.teamInfo()}>
            <div className={styles.teamScores()}>
              <div className={styles.teamName()}>{fixture.team1.shortName || fixture.team1.name}</div>
              {cardConfig.showScores && fixture.team1.score && (
                <>
                  <div className={styles.teamScore()}>
                    {fixture.team1.score.runs}/{fixture.team1.score.wickets}
                  </div>
                  {fixture.team1.score.overs && (
                    <div className={styles.teamOvers()}>
                      ({fixture.team1.score.overs})
                    </div>
                  )}
                </>
              )}
              {variant === 'recent' && fixture.team1.innings && fixture.team1.innings.length > 0 && (
                <div className={styles.recentScores()}>
                  {fixture.team1.innings.map((inning, idx) => (
                    <div key={idx} className={styles.recentScoreLine()}>
                      {inning.runs}/{inning.wickets} ({inning.overs})
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.teamLogo()}>
              <Image
                src={fixture.team1.logo || '/logo.svg'}
                alt={fixture.team1.name}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* VS Separator */}
          <div className={styles.vsSeparator()}>VS</div>

          {/* Team 2 */}
          <div className={styles.teamInfo()}>
            <div className={styles.teamScores()}>
              <div className={styles.teamName()}>{fixture.team2.shortName || fixture.team2.name}</div>
              {cardConfig.showScores && fixture.team2.score && (
                <>
                  <div className={styles.teamScore()}>
                    {fixture.team2.score.runs}/{fixture.team2.score.wickets}
                  </div>
                  {fixture.team2.score.overs && (
                    <div className={styles.teamOvers()}>
                      ({fixture.team2.score.overs})
                    </div>
                  )}
                </>
              )}
              {variant === 'recent' && fixture.team2.innings && fixture.team2.innings.length > 0 && (
                <div className={styles.recentScores()}>
                  {fixture.team2.innings.map((inning, idx) => (
                    <div key={idx} className={styles.recentScoreLine()}>
                      {inning.runs}/{inning.wickets} ({inning.overs})
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.teamLogo()}>
              <Image
                src={fixture.team2.logo || '/logo.svg'}
                alt={fixture.team2.name}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Match Status / Countdown */}
        {cardConfig.showMatchStatus && fixture.matchStatus && (
          <div className={styles.matchStatus()}>
            <span>{fixture.matchStatus}</span>
          </div>
        )}

        {cardConfig.showCountdown && countdown && (
          <div className={styles.countdownContainer()}>
            <div className={styles.countdownItem()}>
              <div className={styles.countdownValue()}>{String(countdown.days).padStart(2, '0')}</div>
              <div className={styles.countdownLabel()}>DAYS</div>
            </div>
            <div className={styles.countdownItem()}>
              <div className={styles.countdownValue()}>{String(countdown.hours).padStart(2, '0')}</div>
              <div className={styles.countdownLabel()}>HRS</div>
            </div>
            <div className={styles.countdownItem()}>
              <div className={styles.countdownValue()}>{String(countdown.minutes).padStart(2, '0')}</div>
              <div className={styles.countdownLabel()}>MINS</div>
            </div>
            <div className={styles.countdownItem()}>
              <div className={styles.countdownValue()}>{String(countdown.seconds).padStart(2, '0')}</div>
              <div className={styles.countdownLabel()}>SECS</div>
            </div>
          </div>
        )}

        {cardConfig.showMatchStartTime && fixture.matchStartTime && (
          <div className={styles.matchBeginTime()}>
            Match Begin at {fixture.matchStartTime}
          </div>
        )}

        {cardConfig.showResult && fixture.result && (
          <div className={styles.matchStatus()}>
            <span>{fixture.result}</span>
          </div>
        )}

        {/* Match Info */}
        <div className={styles.matchInfo()}>
          {fixture.matchNumber > 0 ? `Match ${fixture.matchNumber}, ` : ''}{formatDate(fixture.matchDate)} | {formatTime(fixture.matchDate)}
        </div>

        {/* Action Button */}
        <a 
          href={getActionButtonLink()} 
          target={cardConfig.actionButtonTarget}
          rel={cardConfig.actionButtonTarget === '_blank' ? 'noopener noreferrer' : ''}
          className={styles.actionButton()}
        >
          {getActionButtonText()}
        </a>
      </div>
    </div>
  );
}
