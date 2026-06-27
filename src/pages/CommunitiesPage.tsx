import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Link } from 'react-router-dom';
import { Users, Lock } from 'lucide-react';

const mockCommunities = [
  { id: 'cs-study', name: 'CS 301 Study Group', members: 42, isPrivate: false, desc: 'For students currently enrolled in Data Structures.' },
  { id: 'gaming', name: 'Campus Gamers', members: 156, isPrivate: false, desc: 'Find teammates and discuss the latest releases.' },
  { id: 'hackathon', name: 'Hackathon 2024 Prep', members: 89, isPrivate: true, desc: 'Private group for registered participants.' }
];

export function CommunitiesPage() {
  return (
    <PageWrapper>
      <div className="max-w-container-md mx-auto py-12 px-gutter">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2">Communities</h1>
                <p className="font-body-md text-body-md text-muted-text">Find your people. Join groups or start your own.</p>
            </div>
            <button className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
                Create Community
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCommunities.map(community => (
            <div key={community.id} className="bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                    {community.name}
                    {community.isPrivate && <Lock className="w-4 h-4 text-muted-text" />}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-text text-sm bg-surface-container-low px-2 py-1 rounded-md">
                    <Users className="w-4 h-4" /> {community.members}
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 min-h-[48px]">
                {community.desc}
              </p>
              <Link 
                to={`/communities/${community.id}`} 
                className="inline-block text-center w-full bg-surface-container-low text-on-surface hover:bg-primary/10 hover:text-primary font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors border border-outline-variant"
              >
                Join Community
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
