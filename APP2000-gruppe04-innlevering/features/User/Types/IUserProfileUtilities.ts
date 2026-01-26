import User from "../Services/User";

export interface IUserProfileUtilities {
  getPlayedChessGames(): Promise<ChessGame[]>;
  getElo(): Promise<number>;

  getPhotoGroup(groupId: string): Promise<PhotoGroup>;
  getPhoto(photoId: string): Promise<Photo>;
  getVideo(videoId: string): Promise<Video>;
  getGroupVideo(videoGroupId: string): Promise<VideoGroup>;

  getAllPhotoGroups(): Promise<PhotoGroup[]>;
  getAllPhotos(): Promise<Photo[]>;
  getAllVideos(): Promise<Video[]>;
  getAllGroupVideos(): Promise<VideoGroup[]>;

  deleteAllPhotoGroups(): Promise<void>;
  deleteAllPhotos(): Promise<void>;
  deleteAllVideos(): Promise<void>;
  deleteAllGroupVideos(): Promise<void>;

  updateAllPhotoGroups(photoGroups: PhotoGroup[]): Promise<void>;
  updateAllPhotos(photos: Photo[]): Promise<void>;
  updateAllVideos(videos: Video[]): Promise<void>;
  updateAllGroupVideos(videoGroups: VideoGroup[]): Promise<void>;

  setPhotoGroup(photoGroup: PhotoGroup): Promise<void>;
  setPhoto(photo: Photo): Promise<void>;
  setVideo(video: Video): Promise<void>;
  setVideoGroup(videoGroup: VideoGroup): Promise<void>;

  getMyOpenings(): Promise<Opening[]>;
  getMyOpeningLessonsPoints(): Promise<number>;
  getMyStartedOpenings(): Promise<Opening[]>;
  getMyCompletedOpenings(): Promise<Opening[]>;

  getMyPosts(): Promise<Post[]>;
  getMyNotifications(): Promise<Notification[]>;
  getMyPostEngagements(): Promise<PostEngagement[]>;

  getFriends(): Promise<User[]>;
  getFriendRequests(): Promise<FriendRequest[]>;
  getFriendsPosts(): Promise<Post[]>;
  getPublicFriendEngagementPosts(): Promise<Post[]>;
}

// Auxiliary types for clarity
type ChessGame = any; // Replace with appropriate type
type PhotoGroup = any; // Replace with appropriate type
type Photo = any; // Replace with appropriate type
type Video = any; // Replace with appropriate type
type VideoGroup = any; // Replace with appropriate type
type Opening = any; // Replace with appropriate type
type Post = any; // Replace with appropriate type
type NotificationForUser = any; // Replace with appropriate type
type PostEngagement = any; // Replace with appropriate type
type FriendRequest = any; // Replace with appropriate type
