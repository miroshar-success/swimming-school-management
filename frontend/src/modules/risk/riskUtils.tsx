import riskEnumerators from 'src/modules/risk/riskEnumerators';

export function getInherentScore(likelihood, impact) {
  const inherentScores = riskEnumerators.inherentScoreMap;
  const likelihoodIndex =
    riskEnumerators.likelihood.indexOf(likelihood);
  const impactIndex =
    riskEnumerators.impact.indexOf(impact);
  return (
    inherentScores[likelihoodIndex][impactIndex] ?? 'Low'
  );
}
