import { clients, dimensions, presets, type Client, type PlatformFilter, type Weights } from '../data/clients';

export function scoreClient(client: Client, weights: Weights): number {
  let weightedScore = 0;
  let totalWeight = 0;
  for (const { key } of dimensions) {
    const weight = weights[key];
    weightedScore += (client.s[key] / 5) * weight;
    totalWeight += weight;
  }
  return totalWeight ? Math.round((weightedScore / totalWeight) * 100) : 0;
}

export function rankClients(weights: Weights, platform: PlatformFilter = 'both') {
  return clients.map((client) => ({
    client,
    score: scoreClient(client, weights),
    available: platform === 'both' || client.platforms.includes(platform),
  })).sort((a, b) => Number(b.available) - Number(a.available)
    || b.score - a.score || a.client.order - b.client.order);
}

const defaultRanks = new Map(rankClients(presets[0].w).map(({ client }, index) => [client.id, index + 1]));

export function rankedReviews(weights: Weights, platform: PlatformFilter) {
  return rankClients(weights, platform).map((result, index) => ({
    ...result,
    rank: index + 1,
    defaultRank: defaultRanks.get(result.client.id)!,
  }));
}

export type RankedReview = ReturnType<typeof rankedReviews>[number];
