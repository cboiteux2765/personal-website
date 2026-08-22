import { NextResponse } from "next/server";

export const revalidate = 14_400;

const username = "cboiteux2765";

async function toActivity(event, headers) {
  const base = {
    id: event.id,
    repository: event.repo.name.replace(`${username}/`, ""),
    url: `https://github.com/${event.repo.name}`,
    createdAt: event.created_at
  };

  if (event.type === "PushEvent") {
    const branch = event.payload.ref?.replace("refs/heads/", "") || "default branch";
    const sha = event.payload.head;
    return { ...base, type: "commit", label: "commit", title: `Pushed updates to ${branch}`, url: sha ? `https://github.com/${event.repo.name}/commit/${sha}` : base.url };
  }

  if (event.type === "PullRequestEvent") {
    const pullRequest = event.payload.pull_request;
    if (!pullRequest) return null;
    const detailResponse = await fetch(pullRequest.url, { headers, next: { revalidate } });
    const detail = detailResponse.ok ? await detailResponse.json() : null;
    const number = event.payload.number;
    const fallbackTitle = `Pull request #${number}: ${pullRequest.head?.ref || "branch"} → ${pullRequest.base?.ref || "main"}`;
    return { ...base, type: "pull request", label: "pull request", title: detail?.title || fallbackTitle, url: detail?.html_url || `https://github.com/${event.repo.name}/pull/${number}` };
  }

  if (event.type === "IssuesEvent") {
    const issue = event.payload.issue;
    if (!issue) return null;
    return { ...base, type: "issue", label: "issue", title: issue.title, url: issue.html_url };
  }

  return null;
}

export async function GET() {
  const headers = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
  };
  const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
    headers,
    next: { revalidate }
  });

  if (!response.ok) {
    return NextResponse.json({ activity: [], error: "GitHub activity is temporarily unavailable." }, { status: 200 });
  }

  const events = await response.json();
  const latestByRepository = new Map();
  const priority = { "pull request": 3, issue: 2, commit: 1 };

  for (const event of events) {
    const item = await toActivity(event, headers);
    if (!item) continue;
    const previous = latestByRepository.get(item.repository);
    if (!previous || priority[item.type] > priority[previous.type]) {
      latestByRepository.set(item.repository, item);
    }
  }

  const activity = [...latestByRepository.values()]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .slice(0, 3);

  // GitHub responses above remain cached for four hours. Do not cache this
  // transformed response in the browser/CDN, so presentation changes take
  // effect as soon as the site is redeployed.
  return NextResponse.json({ activity }, {
    headers: { "Cache-Control": "no-store" }
  });
}
