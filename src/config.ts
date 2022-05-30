/* eslint-disable @typescript-eslint/no-var-requires */
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const { NODE_ENV } = process.env;

export const isProd = NODE_ENV === "production";

export const projectDesc = {
  title: "Membook | resource full network",
  desc: "Membook is a community of students focused on building a personal brand, sharing resourcefull content, and finding peers to collaborate with.",
  site: FRONTEND_URL,
};

// eslint-disable-next-line global-require
export const packageVer = require("../package.json");
