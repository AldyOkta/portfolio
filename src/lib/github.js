export function parseContributionDays(days) {
  if (!Array.isArray(days) || !days.every((day) => {
    if (!day || typeof day.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day.date)) return false;
    const date = new Date(`${day.date}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === day.date
      && Number.isSafeInteger(day.count) && day.count >= 0
      && (day.level == null || (Number.isInteger(day.level) && day.level >= 0 && day.level <= 4));
  })) {
    throw new Error('Invalid GitHub contribution data');
  }
  return days;
}

export async function loadGithubContributions(username, signal) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    { signal },
  );
  if (!response.ok) throw new Error(`GitHub contributions request failed: ${response.status}`);
  const data = await response.json();
  return parseContributionDays(data?.contributions);
}
