"use client";

import { useState } from "react";

const details = {
  Amazon: {
    skills: ["software architecture", "software development life cycle", "software documentation", "ci/cd", "cross-team collaboration", "customer obsession", "ownership", "cloud infrastructure", "ai infrastructure", "DevOps", "AWS: Lambda, DynamoDB, CloudWatch, AppConfig, CloudFormation, ECS", "Java"],
    focus: "Owned the E2E delivery of Alexa+ backend and cloud infrastructure to 15M+ customers worldwide, while improving service reliability, developer workflows, and operating cost. Products: Alexa+ Homecards, Widgets, Ask & Explore, Prime Video Live Sports"
  },
  Intel: {
    skills: ["developer advocacy", "MPI", "OpenMP", "Intel SYCL", "PyTorch", "vision language models", "stable diffusion", "fine tuning", "ai inference"],
    focus: "Hosted hands-on Intel oneAPI AI workshops for 50+ students on campus to accelerate machine learning inference. Selected to represent the Intel Student Ambassador AI PC Pilot Program, built an OpenVINO Vision Language Model room decluttering project presented to 1000+ student ambassadors worldwide."
  },
  "Data Science UCSB": {
    skills: ["community leadership", "program strategy", "people management", "event operations", "workflow automation", "google apps script", "agile project management", "PyTorch", "OpenCV", "deep learning", "computer vision"],
    focus: "Led the annual UCSB Data Science Club Project Series for over 500 students, mentoring project groups to create social impact in in data science, machine learning, and scientific computing. Led a computer vision emotion detection project with no prior experience, achieving 87% prediction accuracy and 1st place out of 53 teams in the 2024 UCSB Data Science Club Project Series."
  },
  "Engineering Student Council": {
    skills: ["organizational leadership", "workflow automation", "google apps script", "documentation", "people management", "community engagement", "program strategy", "company outreach"],
    focus: "Managing club documents (constitution, processes, ESC goals) and internal affairs to ensure we best serve UCSB College of Engineering students with opportunities such as socials, professional events, and scholarships. Wrote a Google Apps Script to automate tedious attendance logging from meeting minutes to save me 2 hours a quarter + documentation. Also selling $2000+ of CoE Scribble merch :)"
  },
  "SB Hacks": {
    skills: ["developer experience", "Next.js", "Tailwind CSS", "Express.js", "user-centered design", "data visualization", "Chart.js"],
    focus: "Built the SB Hacks XI website for 1000+ prospective applicants to display logistics information, hacking rules, travel reimbursements, and hackathon timeline. Created an internal admin dashboard to analyze hacker demographics to improve reach to college students worldwide. Raised $1000+ in sponsorship funds to purchase event materials."
  }
};

const monthOrder = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const startTime = (timeline) => {
  const [, month, year] = timeline.match(/([A-Z][a-z]{2})\s+(\d{4})/) ?? [];
  return year ? new Date(Number(year), monthOrder[month]).getTime() : 0;
};

export default function ExperienceTimeline({ title, experiences }) {
  const timelineExperiences = [...experiences].sort((a, b) => {
    const aOngoing = a.timeline.includes("Present");
    const bOngoing = b.timeline.includes("Present");
    if (aOngoing !== bOngoing) return aOngoing ? 1 : -1;
    return startTime(a.timeline) - startTime(b.timeline);
  });
  const [activeOrganization, setActiveOrganization] = useState(timelineExperiences[0]?.organization);
  const activeExperience = timelineExperiences.find(({ organization }) => organization === activeOrganization) ?? timelineExperiences[0];
  const activeDetails = details[activeExperience.organization];

  return <section className="experience-timeline" aria-label={title}>
    <div className="experience-timeline-rail" aria-hidden="true" />
    <div className="experience-milestones">
      {timelineExperiences.map((experience) => {
        const isActive = experience.organization === activeOrganization;
        return <button className={`experience-milestone${isActive ? " is-active" : ""}`} type="button" key={experience.organization} onClick={() => setActiveOrganization(experience.organization)} aria-pressed={isActive}>
          <span className="experience-marker" aria-hidden="true" />
          <span className="experience-milestone-copy"><span className="experience-timeline-date">{experience.timeline}</span><strong>{experience.organization}</strong><span>{experience.role}</span></span>
        </button>;
      })}
    </div>
    <article className="experience-detail" aria-live="polite">
      <p className="experience-detail-label">selected role / {activeExperience.organization}</p>
      <h3>{activeExperience.role}</h3>
      <p>{activeDetails.focus}</p>
      <div className="experience-skill-tags" aria-label="Key skills">{activeDetails.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    </article>
  </section>;
}
