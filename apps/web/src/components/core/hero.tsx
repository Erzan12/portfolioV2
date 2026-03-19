import HeroButton from "../ui/hero-button/hero-button";

export default function Hero() {
  return (
    <section className="py-28 text-center px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
          I build scalable backend systems & modern web platforms
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Full-stack developer specializing in ERP systems, APIs, and developer platforms — 
          focused on performance, clean architecture, and real-world scalability.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          {/* <a
            href="/projects"
            className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
          >
            View Projects
          </a> */}

          {/* <a
            href="https://erzan-docs.vercel.app/docs/architecture"
            target="_blank"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            Engineering Docs
          </a> */}
          <HeroButton href="/projects" variant="default">
            View Projects
          </HeroButton>

          <HeroButton
            href="https://erzan-docs.vercel.app/docs/architecture"
            variant="outline"
            external
          >
            Engineering Docs
          </HeroButton>
        </div>
      </div>
    </section>
  );
}