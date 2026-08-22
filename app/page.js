import siteData from "../site-data.json";
import BootScreen from "./boot-screen";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function HomePage() {
  const { profile, intro } = siteData;
  return <BootScreen><main className="page home-page"><header className="intro" id="top"><div className="home-copy"><p className="hello">Hi, I&apos;m {profile.name}</p><p>{profile.role}</p><p className="lead">{intro.summary}</p><p>Example questions I ask myself every day: How can I add throttling to prevent API request overflow? Can the AWS ECS deploy time be reduced for my CI/CD pipeline? Can this sequence of commands be streamlined so I can spend that saved time on other important tasks?</p><div className="links"><a href={`mailto:${profile.email}`}>email <Arrow /></a><a href={profile.githubUrl} target="_blank" rel="noreferrer">github <Arrow /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">linkedin <Arrow /></a><a href={profile.resumePath} target="_blank" rel="noreferrer">resume <Arrow /></a></div></div><aside className="profile-sidebar"><img className="profile-photo" src="/me.jpg" alt="Clement Boiteux" /><dl className="profile-bio"><div><dt>Nationality</dt><dd>{profile.nationality}</dd></div><div><dt>Origin</dt><dd>{profile.origin}</dd></div><div><dt>Languages</dt><dd>{profile.languages.join(" · ")}</dd></div><div><dt>Hobbies</dt><dd>{profile.hobbies.join(" · ")}</dd></div></dl></aside></header><footer><p>Inspired from Windows Blue Screen of Death, thought it was funny every time it happened (too often).</p></footer></main></BootScreen>;
}
