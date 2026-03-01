import { useEffect } from "react";

const InstagramFeed = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="elfsight-app-ae477bbe-7b15-477f-8e77-2a3b63606c61"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};

export default InstagramFeed;
