const getFrontEndServer = () => {
  if (process.env.NODE_ENV === "development") {
    return frontEndServerLocal;
  }
  return frontEndServerLive;
};

const frontEndServerLocal = "https://grandmasterssmith.ngrok.app";
const frontEndServerLive = "https://app-2000-gruppe04-ogot.vercel.app";

const backEndServerLocal = "http://localhost:3001";
const backEndServerLive = "https://grandmasters-smith.ew.r.appspot.com";

const getBackEndServer = () => {
  if (process.env.NODE_ENV === "development") {
    return backEndServerLocal;
  }
  return backEndServerLive;
};

export { getFrontEndServer, getBackEndServer };
