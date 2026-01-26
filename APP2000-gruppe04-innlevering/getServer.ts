export const getFrontEndServer = (): string => {
  // Check if the environment mode is 'local' or 'live'
  const mode = process.env.NODE_ENV; // 'development' for local or 'production' for live

  if (mode === "development") {
    // Return the local server URL
    return (
      process.env.FRONTEND_PUBLIC_SERVER_LOCAL ||
      "https://7a76f979e850.ngrok.app"
    ); // Default to localhost if not specified
  } else {
    // Return the live server URL
    return process.env.FRONTEND_PUBLIC_SERVER_LIVE || ""; // Default to a predefined live URL if not specified
  }
};

export const getServer = (): string => {
  // Check if the environment mode is 'local' or 'live'
  const mode = process.env.NODE_ENV; // 'development' for local or 'production' for live

  if (mode === "development") {
    // Return the local server URL
    return process.env.BACKEND_PUBLIC_SERVER_LOCAL || "http://localhost:3001"; // Default to localhost if not specified
  } else {
    // Return the live server URL
    return process.env.BACKEND_PUBLIC_SERVER_LIVE || "https://google.com"; // Default to a predefined live URL if not specified
  }
};

export const getMediaServerUpload = (): string => {
  // Check if the environment mode is 'local' or 'live'
  const mode = process.env.NODE_ENV; // 'development' for local or 'production' for live

  if (mode === "development") {
    // Return the local server URL
    return (
      process.env.BACKEND_MEDIA_UPLOAD_LOCAL ||
      "http://localhost:3001/api/media/upload"
    );
  } else {
    // Return the live server URL
    return process.env.BACKEND_MEDIA_UPLOAD_LIVE || "https://google.com"; // Default to a predefined live URL if not specified
  }
};

export const getMediaServerDownload = (): string => {
  // Check if the environment mode is 'local' or 'live'
  const mode = process.env.NODE_ENV; // 'development' for local or 'production' for live

  if (mode === "development") {
    // Return the local server URL
    return (
      process.env.BACKEND_MEDIA_DOWNLOAD_LOCAL ||
      "http://localhost:3001/media/download"
    ); // Default to localhost if not specified
  } else {
    // Return the live server URL
    return process.env.BACKEND_MEDIA_DOWNLOAD_LIVE || "https://google.com"; // Default to a predefined live URL if not specified
  }
};

export default getServer;
