import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {
  getProfile,
  getJobs,
  getProjects,
  getCourses,
  getEducation,
  getLanguages,
  getGallery,
  getSkillGroups,
  FALLBACK_PROFILE,
} from '@/lib/data';

// O site lê tudo do banco a cada requisição (reflete edições do admin).
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [profile, jobs, projects, courses, education, languages, gallery, skillGroups] =
    await Promise.all([
      getProfile(),
      getJobs(),
      getProjects(),
      getCourses(),
      getEducation(),
      getLanguages(),
      getGallery(),
      getSkillGroups(),
    ]);

  const p = profile ?? FALLBACK_PROFILE;

  return (
    <main>
      <Nav showGallery={gallery.length > 0} />
      <Hero profile={p} />
      <About summary={p.summary} languages={languages} />
      <Experience jobs={jobs} />
      <Skills groups={skillGroups} />
      <Projects projects={projects} />
      <Education education={education} courses={courses} />
      <Gallery items={gallery} />
      <Contact profile={p} />
      <Footer name={p.fullName} />
    </main>
  );
}
