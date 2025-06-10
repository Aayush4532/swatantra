import React from 'react';
import VideoPlayer from '@/app/components/VideoPlayer';
import RelatedSection from '@/app/components/RelatedSection';
import LicenseCard from '@/app/components/LicenseCard';

const Page = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col">
          <VideoPlayer
            src={'/video.mp4'}
            poster={'/thumbnail.jpg'}
          />
          <div className=''>
            <LicenseCard />
          </div>
      </div>
      <div className="flex-1">
          <RelatedSection />
        </div>
    </div>
  );
};

export default Page;