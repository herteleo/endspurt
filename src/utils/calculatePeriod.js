import inMs from './inMs';

export default function calculatePeriod(propPlural, distanceInMs) {
  const propSingular = propPlural.slice(0, -1);

  const periodInMs = Math.floor(distanceInMs / inMs[propSingular]);

  this.distance[propPlural].value = Math.max(0, periodInMs);
  this.distance[propPlural].padded = String(this.distance[propPlural].value).padStart(this.options[`${propPlural}Pad`], '0');
  this.distance[propPlural].raw = periodInMs;

  return this.distance[propPlural].value * inMs[propSingular];
}
