"use client";

import { useEffect, useState } from "react";

export default function BootScreen({ children }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const startedAt = performance.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / 3000) * 100)));
    }, 30);
    const leaveTimer = window.setTimeout(() => {
      setProgress(100);
      setIsLeaving(true);
    }, 3000);
    const removeTimer = window.setTimeout(() => setIsVisible(false), 3450);
    const failsafeTimer = window.setTimeout(() => setIsVisible(false), 5000);
    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, []);

  return <>{children}{isVisible && <div className={`boot-screen${isLeaving ? " is-leaving" : ""}`} role="status" aria-live="polite"><div><p className="boot-face">:(</p><p>Your personal website ran into a problem and needs to restart.</p><p>We&apos;re just collecting some information, and then you&apos;ll be on your way.</p><p className="boot-progress">{progress}% complete</p><p className="boot-code">For more information about this issue and possible fixes, go to <br />https://clement-boiteux.netlify.app/</p></div></div>}</>;
}
