export const isDev = process.env.NEXT_PUBLIC_APP_ENV === "development";
export const isStage = process.env.NEXT_PUBLIC_APP_ENV === "stage";
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

export type ClientEnv = {
  mwOrigin: string;
  wwwOrigin: string;
};

export const clientEnv: ClientEnv = isDev ? {
    mwOrigin: "https://tmw.priviatravel.com",
    wwwOrigin: "https://twww.priviatravel.com",
  } : isStage ? {
    mwOrigin: "https://stg-mw.priviatravel.com",
    wwwOrigin: "https://stg-www.priviatravel.com",
  } : {
    mwOrigin: "https://mw.priviatravel.com",
    wwwOrigin: "https://www.priviatravel.com",
  };
