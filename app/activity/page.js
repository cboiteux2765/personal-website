import siteData from "../../site-data.json";
import GitHubActivity from "../github-activity";

export default function ActivityPage() {
  const { automationStories } = siteData;

  return <main className="page section-page"><h1>projects</h1><GitHubActivity /><section className="automation project-automation"><h2>process automation (internal + confidential)</h2><p className="automation-lead">In the long run, working with manual processes consumes more time and becomes a habit if not simplified early. So long as the task you're working on is not time-critical, always weigh the time improvement of the process simplification even if it's small to save you more time if you use it often.</p><div className="story-list">{automationStories.map((story) => <article key={story.title}><h3>{story.title}</h3><p>{story.description}</p></article>)}</div></section></main>;
}
