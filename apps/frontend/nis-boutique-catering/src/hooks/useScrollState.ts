import { useEffect, useState } from 'react';

interface ScrollState {
  readonly isScrolled: boolean;
  readonly scrollProgress: number;
  readonly activeNavSection: string;
}

export const useScrollState = (sectionIds: readonly string[]): ScrollState => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNavSection, setActiveNavSection] = useState('#top');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    let rafId = 0;

    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const currentSection = sections
        .slice()
        .reverse()
        .find((section) => window.scrollY >= section.offsetTop - 180);

      setIsScrolled(window.scrollY > 24);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setActiveNavSection(currentSection ? `#${currentSection.id}` : '#top');
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sectionIds]);

  return { isScrolled, scrollProgress, activeNavSection };
};
