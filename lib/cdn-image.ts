const allowedImageDomains = [
  "image.tport.io.s3.ap-northeast-2.amazonaws.com",
  "s3-ap-northeast-2.amazonaws.com",
  "img.ddnayo.com",
  "media.expedia.com",
  "image5.hanatour.com",
  "photos.hotelbeds.com",
  "www.hikaritour.com",
  "image.hotelpass.com",
  "www.hotelresb2b.com",
  "tourimage.interpark.com",
  "air.priviatravel.com",
  "hotelapi.priviatravel.com",
  "property-gallery.rakutentravelxchange.com",
  "cdnph.tidesquare.com",
  "i.travelapi.com",
  "www.webtour.com",
  "yaimg.yanolja.com",
  "image.tport.io",
  "image2.tport.io",
  "dom.jtb.co.jp",
  "img.travel.rakuten.co.jp",
  "cdn.jalan.jp",
  "images.rts.co.kr",
  "image.goodchoice.kr",
  "rsvt.co.kr:1447",
  "www.jalan.net",
  "hotelimages.sunhotels.net",
  "images.travelnow.com",
  "imgtour.benepia.co.kr",
  "www.sunhotels.net",
  "q-xx.bstatic.com",
  "pix6.agoda.net",
  "pix8.agoda.net",
  "www.bookingm.com",
  "images.gta-travel.com",
  "manager.hanatour.com",
  "tport-images.s3-ap-northeast-1.amazonaws.com",
  "devimage.hanatour.com",
  "image.hanatour.com",
  "img.modetour.com",
];

export const addHttpsProtocol = (sourceUrl?: string): string => {
  if (sourceUrl?.startsWith("//")) {
    return `https:${sourceUrl}`;
  }
  return sourceUrl ?? "";
};

export const convertImageLinkToThumbo = (
  env: "development" | "stage" | "production",
  url?: string
) => {
  if (!url) {
    return "";
  }

  if (url.endsWith(".svg")) {
    return url;
  }

  try {
    const urlObj = new URL(addHttpsProtocol(url));

    if (urlObj.hostname === "devcdns.tourvis.com") {
      return url.replace(
        `//${urlObj.hostname}`,
        "//dev-thumb.tidesquare.com/common_cdn"
      );
    } else if (urlObj.hostname === "cdns.tourvis.com") {
      return url.replace(
        `//${urlObj.hostname}`,
        "//thumb.tidesquare.com/common_cdn"
      );
    } else if (urlObj.hostname === "tstatic.priviatravel.com") {
      return url.replace(
        `//${urlObj.hostname}`,
        "//dev-thumb.tidesquare.com/privia_static"
      );
    } else if (urlObj.hostname === "static.priviatravel.com") {
      return url.replace(
        `//${urlObj.hostname}`,
        "//thumb.tidesquare.com/privia_static"
      );
    } else if (urlObj.hostname === "tripbox.cache-front.iwinv.net") {
      return url.replace(
        `//${urlObj.hostname}`,
        "//thumb.tidesquare.com/tripbox"
      );
    }

    if (
      urlObj.protocol === "https:" &&
      allowedImageDomains.includes(urlObj.hostname)
    ) {
      const thumboUrl = env === "development"
        ? "https://dev-thumb.tidesquare.com/raw/"
        : "https://thumb.tidesquare.com/raw/";

      const encodedFullPath = encodeURIComponent(url);

      return thumboUrl + encodedFullPath;
    }
  } catch (e) {
    console.log("image url converting error: url=", url, e);
  }

  return url;
};
