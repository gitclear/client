import { dimensions, type Client, type Screenshot } from '../../data/clients';
import type { RankedReview } from '../../lib/rankings';
import screenshotManifest from '../../data/screenshot-assets.json';

const platformNames = { mac: 'macOS', win: 'Windows', linux: 'Linux' };
const screenshotAssets: Record<string, { width: number; height: number; alt: string }> = screenshotManifest;

export function RankChange({ review, platformName }: { review: RankedReview; platformName: string }) {
  if (!review.available) return <span className="rank-unavailable">Not on {platformName} yet</span>;
  return review.rank !== review.defaultRank
    ? <span className="rank-change">⇄ from #{review.defaultRank}</span> : null;
}

function PlatformChips({ client }: { client: Client }) {
  return <div className="platform-chips">
    {client.platforms.map((platform) => <span className="platform-chip" key={platform}>{platformNames[platform]}</span>)}
    {client.platformNote && <span className="platform-note">{client.platformNote}</span>}
  </div>;
}

function ClientScreenshot({ shot, compact = false }: { shot: Screenshot; compact?: boolean }) {
  const asset = screenshotAssets[shot.file];
  if (asset) {
    const image = <img src={`/images/clients/${shot.file}`} alt={asset.alt}
      width={asset.width} height={asset.height} loading="lazy" decoding="async" />;
    const link = <a className={`${compact ? 'screenshot-thumb' : 'screenshot-frame'} screenshot-link`}
      href={`/images/clients/${shot.file}`} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${shot.what}`}>
      {image}
    </a>;
    return compact ? link : <figure className="client-screenshot">{link}<figcaption>{shot.caption}</figcaption></figure>;
  }
  if (compact) return <div className="screenshot-thumb">Screenshot: {shot.what}</div>;
  return <figure className="client-screenshot">
    <div className="screenshot-frame">
      <div className="screenshot-titlebar" aria-hidden="true"><span /><span /><span /></div>
      <div className="screenshot-label"><span>Screenshot: {shot.what}</span><code>{shot.file}</code></div>
    </div>
    <figcaption>{shot.caption}</figcaption>
  </figure>;
}

function Vendor({ client }: { client: Client }) {
  return <p className="client-vendor">By {client.vendor}. Best for {client.bestFor}.</p>;
}

function Price({ client }: { client: Client }) {
  return <p className="client-price-inline"><strong>{client.priceHead}.</strong> {client.priceDetail}</p>;
}

function Download({ client, solid = false }: { client: Client; solid?: boolean }) {
  return <a className={`home-button ${solid ? 'button-solid' : 'button-line'}`} href={client.url} target="_blank" rel="noopener">{client.cta}</a>;
}

interface Props { review: RankedReview; platformName: string; }

export function FullReview({ review, platformName }: Props) {
  const { client, rank, score } = review;
  return <article id={`c-${client.id}`} className="client-review full-review" aria-labelledby={`t-${client.id}`}>
    <div className="full-review-heading">
      <div className="client-identity">
        <span className="client-initials" aria-hidden="true">{client.initials}</span>
        <div>
          <p className="rank-label">#{rank} for your weights</p>
          <h3 id={`t-${client.id}`}>{client.name}</h3>
          <Vendor client={client} />
          <PlatformChips client={client} />
        </div>
      </div>
      <div className="client-score"><p>{score}<span> / 100</span></p><RankChange review={review} platformName={platformName} /></div>
    </div>
    <div className="client-screenshots">
      {client.shots.map((shot) => <ClientScreenshot key={shot.what} shot={shot} />)}
    </div>
    <div className="full-review-details">
      <div className="client-description">
        <p className="client-blurb">{client.blurb}</p>
        <ul className="client-pros-cons">
          {client.pros.map((pro) => <li className="client-pro" key={pro}><span aria-hidden="true">+</span><span><span className="sr-only">Strength: </span>{pro}</span></li>)}
          {client.cons.map((con) => <li className="client-con" key={con}><span aria-hidden="true">−</span><span><span className="sr-only">Limit: </span>{con}</span></li>)}
        </ul>
        <p className="rubric-title">How it scores{client.provisional ? ' (provisional)' : ''}</p>
        <div className="client-rubric">
          {dimensions.map((dimension) => <div key={dimension.key}>
            <span>{dimension.short}<span className="sr-only">: {client.s[dimension.key]} of 5</span></span>
            <span className="score-pips" aria-hidden="true">{[1, 2, 3, 4, 5].map((pip) => <span className={pip <= client.s[dimension.key] ? 'on' : ''} key={pip} />)}</span>
          </div>)}
        </div>
      </div>
      <aside className="client-price" aria-label={`${client.name} price and download`}>
        <p className="price-label">Price</p><p className="price-heading">{client.priceHead}</p>
        <p className="price-detail">{client.priceDetail}</p><Download client={client} solid />
        <p className="download-domain">Opens {client.urlLabel}</p>
      </aside>
    </div>
  </article>;
}

export function MediumReview({ review, platformName }: Props) {
  const { client, rank, score } = review;
  return <article id={`c-${client.id}`} className="client-review medium-review" aria-labelledby={`t-${client.id}`}>
    <ClientScreenshot shot={client.shots[0]} />
    <div className="medium-review-details">
      <div className="medium-review-heading">
        <span className="rank-label">#{rank}</span><h3 id={`t-${client.id}`}>{client.name}</h3>
        <span className="medium-score">{score} / 100</span><RankChange review={review} platformName={platformName} />
      </div>
      <Vendor client={client} /><p className="client-blurb">{client.blurb}</p><Price client={client} />
      <div className="medium-review-actions"><Download client={client} /><PlatformChips client={client} /></div>
    </div>
  </article>;
}

export function CompactReview({ review, platformName, open, onToggle }: Props & { open: boolean; onToggle: () => void }) {
  const { client, rank, score } = review;
  return <article id={`c-${client.id}`} className="client-review compact-review" aria-labelledby={`t-${client.id}`}>
    <div className="compact-review-heading">
      <ClientScreenshot shot={client.shots[0]} compact />
      <div><p className="rank-label">#{rank}, {score} / 100</p><h3 id={`t-${client.id}`}>{client.name}</h3><RankChange review={review} platformName={platformName} /></div>
    </div>
    <button className="home-button button-line details-toggle" type="button" aria-expanded={open} aria-controls={`details-${client.id}`} onClick={onToggle}>
      <span aria-hidden="true">{open ? '−' : '+'}</span>{open ? 'Hide details' : 'Show details'}
    </button>
    <div className="compact-review-details" id={`details-${client.id}`} hidden={!open}>
      <Vendor client={client} /><p className="client-blurb">{client.blurb}</p><Price client={client} /><PlatformChips client={client} />
      <a href={client.url} target="_blank" rel="noopener">{client.cta}</a>
    </div>
  </article>;
}
