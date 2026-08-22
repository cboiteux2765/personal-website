"use client";

import { useEffect, useState } from "react";

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch("/api/github/activity", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setActivity(data.activity || []))
      .catch(() => setActivity([]));
  }, []);

  return (
    <section className="github-activity" aria-labelledby="github-heading">
      <div className="github-heading"><h2 id="github-heading">my github activity:</h2><a href="https://github.com/cboiteux2765" target="_blank" rel="noreferrer">view profile ↗</a></div>
      {activity === null && <p className="activity-status">loading recent activity...</p>}
      {activity?.length === 0 && <p className="activity-status">recent GitHub activity is unavailable right now.</p>}
      {activity?.length > 0 && <div className="activity-list">
        {activity.map((item) => <a className="activity-item" href={item.url} target="_blank" rel="noreferrer" key={item.id}>
          <span className="activity-type">{item.label}</span><span className="activity-title">{item.title}</span><span className="activity-repo">{item.repository} ↗</span>
        </a>)}
      </div>}
    </section>
  );
}
