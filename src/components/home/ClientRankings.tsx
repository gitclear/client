import { useState } from 'react';
import GitInstaller from '../GitInstaller';
import { dimensions, presets, type PlatformFilter, type Weights } from '../../data/clients';
import { rankedReviews } from '../../lib/rankings';
import { CompactReview, FullReview, MediumReview, RankChange } from './ClientReview';
import ClientIcon from './ClientIcon';

export default function ClientRankings({ currentYear }: { currentYear: number }) {
  const [weights, setWeights] = useState<Weights>(presets[0].w);
  const [presetId, setPresetId] = useState<string | null>('default');
  const [platform, setPlatform] = useState<PlatformFilter>('both');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const reviews = rankedReviews(weights, platform);
  const total = dimensions.reduce((sum, { key }) => sum + weights[key], 0);
  const platformName = platform === 'win' ? 'Windows' : 'macOS';

  return <>
    <section className="home-container home-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span>@@ -{currentYear - 1} +{currentYear} @@</span> eleven git clients, re-ranked</p>
        <h1 id="hero-title">Choose the best {currentYear} git client</h1>
        <p className="hero-lead">Eleven downloadable clients for macOS and Windows, scored on one open rubric. Tell the page what you need and the list re-ranks itself, with downloads, prices and screenshots for the clients that fit.</p>
        <ul className="hero-tiles" aria-label="The eleven clients, in ranked order">
          {reviews.map(({ client, rank }) => <li key={client.id}>
            <a href={`#c-${client.id}`} aria-label={`${client.name}, ranked ${rank} of 11`}>
              <span className="tile-rank" aria-hidden="true">{rank}</span>
              <ClientIcon client={client} tile />
              <span className="tile-name" aria-hidden="true">{client.name}</span>
            </a>
          </li>)}
        </ul>
        <p className="order-note">{presetId === 'default' && platform === 'both'
          ? 'Ordered by the GitClient default weights. Change them below.' : 'Ordered by your weights.'}</p>
        <div className="hero-actions">
          <a className="home-button button-solid" href="#tune">Tune the ranking</a>
          <a className="home-button button-line" href="#top">See your top three</a>
        </div>
      </div>
      <div id="install" className="hero-installer"><GitInstaller autoDetect={false} reviewHref="#c-diff-digest" /></div>
    </section>

    <section id="tune" className="ranking-section" aria-labelledby="tune-title">
      <div className="home-container ranking-inner">
        <div className="ranking-heading">
          <div className="ranking-intro">
            <h2 id="tune-title">Weight what matters to you. The ranking follows.</h2>
            <p>Rankings hide their assumptions in their weights, so ours are controls. Pick the preset closest to how you work, or drag any slider. Every list on this page re-sorts as you go, and each total is scaled to 100.</p>
          </div>
          <div className="platform-filter" role="group" aria-labelledby="platform-label">
            <span id="platform-label">Show clients that run on</span>
            <div className="home-segments">
              {([{ id: 'both', label: 'Both' }, { id: 'mac', label: 'macOS' }, { id: 'win', label: 'Windows' }] as const).map((option) =>
                <button type="button" key={option.id} aria-pressed={platform === option.id} onClick={() => setPlatform(option.id)}>{option.label}</button>)}
            </div>
          </div>
        </div>
        <div className="ranking-presets" role="group" aria-label="Weight presets">
          {presets.map((preset) => <button type="button" key={preset.id} aria-pressed={presetId === preset.id}
            onClick={() => { setWeights(preset.w); setPresetId(preset.id); }}>{preset.label}</button>)}
          {presetId === null && <span>Custom weights. Pick a preset to start over.</span>}
        </div>
        <div className="ranking-panel">
          <div className="ranking-sliders">
            {dimensions.map((dimension) => {
              const share = total ? Math.round(weights[dimension.key] / total * 100) : 0;
              return <div className="weight-control" key={dimension.key}>
                <label htmlFor={`w-${dimension.key}`}>{dimension.label}</label>
                <output htmlFor={`w-${dimension.key}`}>{share}%</output>
                <input id={`w-${dimension.key}`} type="range" min="0" max="40" step="1" value={weights[dimension.key]}
                  aria-describedby={`h-${dimension.key}`} aria-valuetext={`${weights[dimension.key]}, ${share}% of total weight`}
                  onChange={(event) => {
                    setWeights((current) => ({ ...current, [dimension.key]: Number(event.target.value) }));
                    setPresetId(null);
                  }} />
                <p id={`h-${dimension.key}`}>{dimension.hint}</p>
              </div>;
            })}
          </div>
          <div className="live-ranking">
            <p className="ranking-caption">Score out of 100 with your weights</p>
            <ol aria-label="Live ranking">
              {reviews.map((review, index) => <li key={review.client.id}>
                <span className="ranking-number">{review.rank}</span>
                <a href={`#c-${review.client.id}`}>{review.client.name}</a>
                <span className="ranking-bar" aria-hidden="true"><span style={{ width: `${review.score}%`, background: !review.available ? '#DDD8CD' : index < 3 ? '#2F4FBF' : index < 8 ? '#7D796F' : '#C2BDB1' }} /></span>
                <span className="ranking-score">{review.score}</span>
                <span className="ranking-movement"><RankChange review={review} platformName={platformName} /></span>
              </li>)}
            </ol>
            <div className="ranking-legend">
              <span><i className="legend-top" />Your top three, in full below</span>
              <span><i className="legend-next" />The next five</span>
              <span><i className="legend-rest" />The rest</span>
              <span><b>⇄</b>Moved from its default rank</span>
            </div>
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {reviews[0].client.name} ranks first with {reviews[0].score} out of 100. {reviews[1].client.name} is second and {reviews[2].client.name} is third.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="top" className="home-container top-reviews" aria-labelledby="top-title">
      <div className="top-reviews-heading"><h2 id="top-title">Your top three</h2><p>List prices from each vendor</p></div>
      <div className="full-reviews">{reviews.slice(0, 3).map((review) => <FullReview key={review.client.id} review={review} platformName={platformName} />)}</div>
    </section>
    <section className="home-container next-reviews" aria-labelledby="next-title">
      <h2 id="next-title">The next five</h2><p className="section-description">One screenshot, the price, and what each one does best.</p>
      {reviews.slice(3, 8).map((review) => <MediumReview key={review.client.id} review={review} platformName={platformName} />)}
    </section>
    <section className="home-container rest-reviews" aria-labelledby="rest-title">
      <h2 id="rest-title">The rest of the eleven</h2><p className="section-description">Good tools that fit your weights less well. Open any of them for the details.</p>
      <div className="compact-reviews">{reviews.slice(8).map((review) => <CompactReview key={review.client.id} review={review} platformName={platformName}
        open={!!expanded[review.client.id]} onToggle={() => setExpanded((current) => ({ ...current, [review.client.id]: !current[review.client.id] }))} />)}</div>
    </section>
  </>;
}
