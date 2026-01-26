/**
 * @author Borgar Flaen Stensrud
 * @description Validator for user profile data.
 * @example validateUserProfile({data});
 * @params data: UserProfileData  -  Object with user profile data.
 * @returns ValidationErrors  -  Object with error messages.
 * @usedby UserProfileForm.tsx
 *
 *
 *
 */
import { ValidationErrors } from "../Types/ValidationErrors";
import { UserProfileData } from "../Types/UserProfileData";

export default function validateUserProfile(
  data: UserProfileData
): ValidationErrors {
  let errors: ValidationErrors = {};

  // Initialize arrays for potensielle multi error meldinger.
  Object.keys(data).forEach((key) => (errors[key] = []));

  // Validate profile picture
  if (!data.profilePicture) {
    errors.profilePicture?.push("Profile picture is required.");
  } else if (data.profilePicture.size > 1024 * 1024 * 10) {
    // 10 MB
    // Further checks can be added here, such as file size or type
    errors.profilePicture?.push("Profile picture cannot be larger than 10 MB.");
  } else if (
    data.profilePicture.type !== "image/jpeg" &&
    data.profilePicture.type !== "image/png"
  ) {
    errors.profilePicture?.push("Profile picture must be a JPEG or PNG.");
  } else {
    //image ok
  }

  // Validate first name
  if (!data.firstName) {
    errors.firstName?.push("First name is required.");
  } else if (data.firstName.length > 50 || data.firstName.length < 2) {
    errors.firstName?.push(
      "First name cannot be less then 2 or longer than 50 characters."
    );
  } else {
    // First name is valid
  }

  // Validate last name
  if (!data.lastName || data.lastName.length === 0) {
    errors.lastName?.push("Last name is required.");
  } else if (data.lastName.length > 50) {
    errors.lastName?.push("Last name cannot be longer than 50 characters.");
  } else {
    // Last name is valid
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email
  if (!data.email) {
    errors.email?.push("Email is required.");
  } else if (data.email.length > 50) {
    errors.email?.push("Email cannot be longer than 50 characters.");
  } else if (!emailRegex.test(data.email)) {
    errors.email?.push("Email must be a valid email address.");
  }

  // Validate bio
  if (data.bio && data.bio.length > 500) {
    errors.bio?.push("Bio cannot be longer than 500 characters.");
  }

  if (data.bannerPicture) {
    if (data.bannerPicture.size > 1024 * 1024 * 10) {
      // 10 MB
      // Further checks can be added here, such as file size or type
      errors.bannerPicture?.push("Banner picture cannot be larger than 10 MB.");
    } else if (
      data.bannerPicture.type !== "image/jpeg" &&
      data.bannerPicture.type !== "image/png"
    ) {
      errors.bannerPicture?.push("Banner picture must be a JPEG or PNG.");
    }
  }

  Object.keys(errors).forEach((key) => {
    if (errors[key].length === 0) {
      delete errors[key];
    }
  });
  console.log("errors from validator:", errors);
  return errors;
}
