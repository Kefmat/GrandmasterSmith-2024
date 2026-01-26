abstract class Profile {
  profilePhoto: string = "";
  profileBanner: string = "";
  constructor({ ...props }) {}

  async getProfilePhoto(photoId: string): Promise<any> {
    return this.profilePhoto;
  }

  async getProfileBanner(): Promise<any> {
    return this.profileBanner;
  }

  async setProfilePhoto(photo: string): Promise<any> {
    this.profilePhoto = photo;
    return this.profilePhoto;
  }

  async setProfileBanner(banner: string): Promise<any> {
    this.profileBanner = banner;
    return this.profileBanner;
  }

  abstract getProfileDetails(): Promise<any>;
  abstract updateProfileDetails(details: any): Promise<any>;
}
export default Profile;
