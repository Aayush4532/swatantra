import React from "react";
import RelatedCard from "./RelatedCard";
import Link from "next/link";

const sampleData = [
  {
    thumbnail: "/thumb1.jpg",
    title: "Urban Street Timelapse",
    uploader: "Jane Smith",
    duration: "03:12",
  },
  {
    thumbnail: "/thumb2.jpg",
    title: "Forest Aerial Footage",
    uploader: "NatureLens",
    duration: "02:45",
  },
  {
    thumbnail: "/thumb3.jpg",
    title: "City Night Lights",
    uploader: "NightOwl Films",
    duration: "01:58",
  },
  {
    thumbnail: "/thumb4.jpg",
    title: "Ocean Waves Slow-Mo",
    uploader: "WaveCatcher",
    duration: "04:20",
  },
  {
    thumbnail: "/thumb5.jpg",
    title: "Desert Dunes Sunset",
    uploader: "DesertVisions",
    duration: "02:30",
  },
  {
    thumbnail: "/thumb1.jpg",
    title: "Urban Street Timelapse",
    uploader: "Jane Smith",
    duration: "03:12",
  },
  {
    thumbnail: "/thumb2.jpg",
    title: "Forest Aerial Footage",
    uploader: "NatureLens",
    duration: "02:45",
  },
  {
    thumbnail: "/thumb3.jpg",
    title: "City Night Lights",
    uploader: "NightOwl Films",
    duration: "01:58",
  },
  {
    thumbnail: "/thumb4.jpg",
    title: "Ocean Waves Slow-Mo",
    uploader: "WaveCatcher",
    duration: "04:20",
  },
  {
    thumbnail: "/thumb5.jpg",
    title: "Desert Dunes Sunset",
    uploader: "DesertVisions",
    duration: "02:30",
  },
  {
    thumbnail: "/thumb1.jpg",
    title: "Urban Street Timelapse",
    uploader: "Jane Smith",
    duration: "03:12",
  },
  {
    thumbnail: "/thumb2.jpg",
    title: "Forest Aerial Footage",
    uploader: "NatureLens",
    duration: "02:45",
  },
  {
    thumbnail: "/thumb3.jpg",
    title: "City Night Lights",
    uploader: "NightOwl Films",
    duration: "01:58",
  },
  {
    thumbnail: "/thumb4.jpg",
    title: "Ocean Waves Slow-Mo",
    uploader: "WaveCatcher",
    duration: "04:20",
  },
  {
    thumbnail: "/thumb5.jpg",
    title: "Desert Dunes Sunset",
    uploader: "DesertVisions",
    duration: "02:30",
  },
  {
    thumbnail: "/thumb1.jpg",
    title: "Urban Street Timelapse",
    uploader: "Jane Smith",
    duration: "03:12",
  },
  {
    thumbnail: "/thumb2.jpg",
    title: "Forest Aerial Footage",
    uploader: "NatureLens",
    duration: "02:45",
  },
  {
    thumbnail: "/thumb3.jpg",
    title: "City Night Lights",
    uploader: "NightOwl Films",
    duration: "01:58",
  },
  {
    thumbnail: "/thumb4.jpg",
    title: "Ocean Waves Slow-Mo",
    uploader: "WaveCatcher",
    duration: "04:20",
  },
  {
    thumbnail: "/thumb5.jpg",
    title: "Desert Dunes Sunset",
    uploader: "DesertVisions",
    duration: "02:30",
  },
  {
    thumbnail: "/thumb1.jpg",
    title: "Urban Street Timelapse",
    uploader: "Jane Smith",
    duration: "03:12",
  },
  {
    thumbnail: "/thumb2.jpg",
    title: "Forest Aerial Footage",
    uploader: "NatureLens",
    duration: "02:45",
  },
  {
    thumbnail: "/thumb3.jpg",
    title: "City Night Lights",
    uploader: "NightOwl Films",
    duration: "01:58",
  },
  {
    thumbnail: "/thumb4.jpg",
    title: "Ocean Waves Slow-Mo",
    uploader: "WaveCatcher",
    duration: "04:20",
  },
  {
    thumbnail: "/thumb5.jpg",
    title: "Desert Dunes Sunset",
    uploader: "DesertVisions",
    duration: "02:30",
  },
];

const RelatedSection = () => {
  return (
    <div className="h-screen flex flex-col bg-blue-50 p-4">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">
        Related Videos
      </h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {sampleData.map((item, idx) => (
          <Link href={`/watch/${item.slug}`} key={idx} passHref>
              <RelatedCard
                thumbnail={item.thumbnail}
                title={item.title}
                uploader={item.uploader}
                duration={item.duration}
              />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedSection;