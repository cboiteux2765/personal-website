import siteData from "../../site-data.json";
import ExperienceTimeline from "./experience-timeline";

export default function ExperiencePage() {
  const { experiences } = siteData;
  const groups = [
    { title: "work experience", items: experiences.filter(({ organization }) => ["Amazon", "Intel"].includes(organization)) },
    { title: "campus organizations", items: experiences.filter(({ organization }) => ["Data Science UCSB", "Engineering Student Council", "SB Hacks"].includes(organization)) }
  ];

  return <main className="page section-page"><section className="experience"><h1>experience</h1>{groups.map((group) => <section className="experience-group" key={group.title}><h2>{group.title}</h2><ExperienceTimeline title={group.title} experiences={group.items} /></section>)}</section></main>;
}
