import Link from "next/link";
import { hobbies, jobs, profile, stack } from "@/content/profile";
import { formatDate, posts } from "@/content/posts";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    sameAs: [profile.github],
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    knowsAbout: stack,
    worksFor: jobs.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pb-12">
        <h1 className="text-2xl font-medium tracking-tight">
          {profile.name}, {profile.role}
        </h1>
        <p className="mt-1 text-muted">
          {profile.location} · rocznik 1999 · w IT od 2020
        </p>
        <div className="mt-6 max-w-xl space-y-4 leading-relaxed">
          {profile.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Section title="Doświadczenie">
        <ol className="space-y-10">
          {jobs.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{job.company}</h3>
                <span className="font-mono text-xs text-muted">
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{job.role}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed">
                {job.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Stack">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Piszę">
        <ul className="space-y-5">
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <span className="font-medium underline decoration-line underline-offset-4 group-hover:decoration-foreground">
                  {post.title}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                  {post.readingTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-8 inline-block text-sm text-muted hover:text-foreground"
        >
          Wszystkie wpisy ({posts.length}) →
        </Link>
      </Section>

      <Section title="Poza pracą">
        <ul className="grid gap-6 sm:grid-cols-2">
          {hobbies.map((hobby) => (
            <li key={hobby.title}>
              <h3 className="text-sm font-medium">{hobby.title}</h3>
              <p className="mt-1 text-sm text-muted">{hobby.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Kontakt">
        <p className="text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="underline decoration-line underline-offset-4 hover:decoration-foreground"
          >
            {profile.email}
          </a>
        </p>
      </Section>
    </div>
  );
}
