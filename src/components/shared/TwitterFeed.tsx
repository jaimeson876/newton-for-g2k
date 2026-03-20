"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: Element | null) => void } };
  }
}

export default function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const tryLoad = () => {
      if (window.twttr?.widgets && container) {
        window.twttr.widgets.load(container);
      }
    };

    if (!document.querySelector('script[src*="platform.twitter.com"]')) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = tryLoad;
      document.body.appendChild(script);
    } else {
      tryLoad();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Twitter renders this <a> into a timeline iframe widget */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-tweet-limit="4"
        data-chrome="noheader nofooter transparent noborders"
        data-dnt="true"
        href="https://twitter.com/NHarrisJM"
      >
        Loading posts from @NHarrisJM...
      </a>
    </div>
  );
}
