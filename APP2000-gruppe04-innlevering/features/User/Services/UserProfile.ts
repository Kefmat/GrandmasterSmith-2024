import { IUserProfileUtilities } from "../Types/IUserProfileUtilities";
import Profile from "./Profile";
import User from "./User";

class UserProfile extends Profile implements IUserProfileUtilities {
  friends: User[] = [];
  myPlayedChessGames: any[] = [];
  myElo: number = 0;
  myOpenings: any[] = [];
  myOpeningLessonsPoints: number = 0;
  myStartedOpenings: any[] = [];
  myCompletedOpenings: any[] = [];
  myPosts: any[] = [];
  myNotifications: Notification[] = [];
  myPostEngagements: any[] = [];
  friendsPosts: any[] = [];
  publicFriendEngagementPosts: any[] = [];
  friendRequests: any[] = [];
  photoGroups: any[] = [];
  photos: any[] = [];
  videos: any[] = [];
  videoGroups: any[] = [];
  myBannedUsers: any[] = [];

  lastName: any;
  username: any;

  profilePhoto: any;
  profileBanner: any;
  firstName: any;

  constructor({ ...props }) {
    super({ ...props });
    const {} = props;
  }

  async completeUserProfile({ ...props }): Promise<boolean> {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.username = props.username;
    this.profileBanner = props.profileBanner;
    this.profilePhoto = props.profilePhoto;
    return true;
  }

  async init({ ...props }) {
    const {
      friends,
      myPlayedChessGames,
      myElo,
      myOpenings,
      myOpeningLessonsPoints,
      myStartedOpenings,
      myCompletedOpenings,
      myPosts,
      myNotifications,
      myPostEngagements,
      friendsPosts,
      publicFriendEngagementPosts,
      friendRequests,
      photoGroups,
      photos,
      videos,
      videoGroups,
      myBannedUsers,
      profileBanner,
      profilePhoto,
      firstName,
      lastName,
      username,
    } = props;
    this.friends = friends;
    this.myPlayedChessGames = myPlayedChessGames;
    this.myElo = myElo;
    this.myOpenings = myOpenings;
    this.myOpeningLessonsPoints = myOpeningLessonsPoints;
    this.myStartedOpenings = myStartedOpenings;
    this.myCompletedOpenings = myCompletedOpenings;
    this.myPosts = myPosts;
    this.myNotifications = myNotifications;
    this.myPostEngagements = myPostEngagements;
    this.friendsPosts = friendsPosts;
    this.publicFriendEngagementPosts = publicFriendEngagementPosts;
    this.friendRequests = friendRequests;
    this.photoGroups = photoGroups;
    this.photos = photos;
    this.videos = videos;
    this.videoGroups = videoGroups;
    this.myBannedUsers = myBannedUsers;
    this.profileBanner = profileBanner;
    this.profilePhoto = profilePhoto;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }

  updateProfileDetails(details: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getPlayedChessGames(): Promise<any[]> {
    return this.myPlayedChessGames;
  }
  async getElo(): Promise<number> {
    return this.myElo;
  }
  async getPhotoGroup(groupId: string): Promise<any> {
    return this.photoGroups.find((group) => group.id === groupId);
  }
  async getPhoto(photoId: string): Promise<any> {
    return this.photos.find((photo) => photo.id === photoId);
  }
  async getVideo(videoId: string): Promise<any> {
    return this.videos.find((video) => video.id === videoId);
  }
  async getGroupVideo(videoGroupId: string): Promise<any> {
    return this.videoGroups.find((group) => group.id === videoGroupId);
  }
  async getAllPhotoGroups(): Promise<any[]> {
    return this.photoGroups;
  }
  async getAllPhotos(): Promise<any[]> {
    return this.photos;
  }
  async getAllVideos(): Promise<any[]> {
    return this.videos;
  }
  async getAllGroupVideos(): Promise<any[]> {
    return this.videoGroups;
  }
  async deleteAllPhotoGroups(): Promise<void> {
    this.photoGroups = [];
  }
  async deleteAllPhotos(): Promise<void> {
    this.photos = [];
  }
  async deleteAllVideos(): Promise<void> {
    this.videos = [];
  }
  async deleteAllGroupVideos(): Promise<void> {
    this.videoGroups = [];
  }
  async updateAllPhotoGroups(photoGroups: any[]): Promise<void> {
    this.photoGroups = photoGroups;
  }
  async updateAllPhotos(photos: any[]): Promise<void> {
    this.photos = photos;
  }
  async updateAllVideos(videos: any[]): Promise<void> {
    this.videos = videos;
  }
  async updateAllGroupVideos(videoGroups: any[]): Promise<void> {
    this.videoGroups = videoGroups;
  }
  async setPhotoGroup(photoGroup: any): Promise<void> {
    this.photoGroups.push(photoGroup);
  }
  async setPhoto(photo: any): Promise<void> {
    this.photos.push(photo);
  }
  async setVideo(video: any): Promise<void> {
    this.videos.push(video);
  }
  async setVideoGroup(videoGroup: any): Promise<void> {
    this.videoGroups.push(videoGroup);
  }
  async getMyOpenings(): Promise<any[]> {
    return this.myOpenings;
  }
  async getMyOpeningLessonsPoints(): Promise<number> {
    return this.myOpeningLessonsPoints;
  }
  async getMyStartedOpenings(): Promise<any[]> {
    return this.myStartedOpenings;
  }
  async getMyCompletedOpenings(): Promise<any[]> {
    return this.myCompletedOpenings;
  }
  async getMyPosts(): Promise<any[]> {
    return this.myPosts;
  }
  async getMyNotifications(): Promise<Notification[]> {
    return this.myNotifications;
  }

  async getMyPostEngagements(): Promise<any[]> {
    return this.myPostEngagements;
  }
  async getFriends(): Promise<User[]> {
    return this.friends;
  }
  async getFriendRequests(): Promise<any[]> {
    return this.friendRequests;
  }
  async getFriendsPosts(): Promise<any[]> {
    return this.friendsPosts;
  }
  async getPublicFriendEngagementPosts(): Promise<any[]> {
    return this.publicFriendEngagementPosts;
  }
  async getMyBannedUsers(): Promise<any[]> {
    return this.myBannedUsers;
  }

  async getProfilePhoto(): Promise<any> {
    return this.profilePhoto;
  }

  async getProfileBanner(): Promise<any> {
    //logic
    return this.profileBanner;
  }

  async getProfileDetails(): Promise<any> {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      profileBanner: this.profileBanner,
      profilePhoto: this.profilePhoto,
    };
  }
}
export default UserProfile;
