import { FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { ProfileImage } from '@/components/common';
import { siteConfig } from '@/constants';
import { withBasePath } from '@/lib/utils';

/**
 * Introduction: name, role, location, a short factual summary and the links a
 * recruiter or hiring manager looks for first (resume, GitHub, LinkedIn, email).
 */
export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pt-28 pb-14 sm:pt-36 sm:pb-16">
      <Container>
        <div className="flex items-center gap-5">
          <ProfileImage
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            ratio="aspect-square"
            className="h-20 w-20 shrink-0 rounded-full sm:h-24 sm:w-24"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-base text-foreground/80">{siteConfig.role}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {siteConfig.location}
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I build production Android apps in Kotlin and Java, and have been doing it
          professionally for 3+ years. At{' '}
          <span className="text-foreground">Applab Ltd.</span> I own features end to
          end, from technical design to release. I also built and published an
          offline music player that has passed{' '}
          <span className="text-foreground">500K+ downloads</span> on Google Play.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Button as="a" href={withBasePath(siteConfig.resumePath)} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" aria-hidden />
            Resume
          </Button>
          <Button as="a" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" variant="secondary">
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </Button>
          <Button as="a" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary">
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </Button>
          <Button as="a" href={`mailto:${siteConfig.email}`} variant="secondary">
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </Button>
        </div>
      </Container>
    </section>
  );
}
