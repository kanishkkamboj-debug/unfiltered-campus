import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';

const resources = [
  { title: 'Academic Advising', desc: 'Schedule an appointment with your advisor.', link: '#' },
  { title: 'Campus Health Services', desc: 'Medical and mental health support.', link: '#' },
  { title: 'Career Center', desc: 'Resume reviews and mock interviews.', link: '#' },
  { title: 'Library Database Access', desc: 'Search academic journals and publications.', link: '#' },
  { title: 'IT Helpdesk', desc: 'Tech support for campus wifi and software.', link: '#' },
];

export function ResourcesPage() {
  return (
    <PageWrapper>
      <div className="max-w-container-md mx-auto py-12 px-gutter">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-background mb-4">Campus Resources</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Quick links to essential university services and support systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, i) => (
            <a 
              key={i} 
              href={res.link}
              className="block p-6 bg-surface border border-outline-variant rounded-xl hover:border-primary hover:shadow-sm transition-all"
            >
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">{res.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{res.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
