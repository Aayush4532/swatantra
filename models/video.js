const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this video.'],
    maxlength: [150, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this video.'],
    maxlength: [1000, 'Description cannot be more than 500 characters'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide the video URL (MP4).'],
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Please provide the thumbnail URL.'],
  },
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);