import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';

export function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="font-headline-lg text-headline-lg font-bold mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none font-body-md text-body-md">
          <p className="mb-4">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect your university email for verification purposes. Your email is kept private and never shown publicly on your profile.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. Anonymity</h2>
          <p className="mb-4">When you post anonymously, your identity is masked from other users. Admins can access your identity only for moderation and safety purposes.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
