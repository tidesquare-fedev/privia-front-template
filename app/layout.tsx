import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";

import { clientEnv, isProduction, isStage } from "@/lib/client-env";
import PcGnb from "@/components/pc-gnb";
import MoHamburgerMenu from "@/components/mo-hamburger-menu";

import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  fallback: [
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "맑은 고딕",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "PRIVIA 여행",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Script
        src={`https://${
          isProduction ? "auth" : "tauth"
        }.priviatravel.com/check`}
        strategy={"afterInteractive"}
      />
      <Script
        src={`https://${
          isProduction ? "www" : "twww"
        }.priviatravel.com/common/sso/sc`}
        strategy={"afterInteractive"}
      />
      <Script id="sc1" type="text/javascript">
        {`
              var getCookie = function (name) {
                var dc = document.cookie;
                var prefix = name + "=";
                var begin = dc.indexOf("; " + prefix);

                if (begin == -1) {
                    begin = dc.indexOf(prefix);
                    if (begin != 0) { return null;}
                } else {
                    begin += 2;
                }

                var end = document.cookie.indexOf(";", begin);

                if (end == -1) {
                    end = dc.length;
                }

                return unescape(dc.substring(begin + prefix.length, end));
              }

              var gtmMemberId = getCookie("memberId");
              var gtmMemberNo = getCookie("gaUniqDemension1");
              var filter = "win16|win32|win64|mac|macintel";
              var agent = navigator.userAgent.toLowerCase();
              var platform = navigator.platform.toLowerCase();
              var appName = '';
              var device = "";

              if (agent.indexOf('privia_travel_android_app_ver') > -1) {
                appName = 'mobileApp';
                device = "moApp";
              } else if (agent.indexOf('privia_travel_ios_app_ver') > -1) {
                appName = 'mobileApp';
                device = "moApp";
              } else if (agent.indexOf('android') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else if (agent.indexOf('iphone') > -1 || agent.indexOf('ipad') > -1 || agent.indexOf('ipod') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else if (agent.indexOf('mobile') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else {
                appName = 'desktop';
                device = "pcWeb";
              }

              window.dataLayer = window.dataLayer || [];
              dataLayer = [{
                'userID' : gtmMemberId != null ? gtmMemberId : "",
                'appName' : appName,
                'dimension1' : gtmMemberNo != null ? atob(gtmMemberNo) : "",
                'dimension10' : 'tna',
                'dimension11' : device
              }];
              `}
      </Script>
      <Script id="sc2" type="text/javascript">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WQKP64D');`}
      </Script>
      <Script id="sc3" type="text/javascript">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5HT7Z7K');`}
      </Script>
      <Script id="sc4" type="text/javascript">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M72MGBC');`}
      </Script>
      <Script id="sc5" type="text/javascript">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WJ3CZHH');`}
      </Script>
      <body className={notoSansKR.className}>
        <Script
          src={`${clientEnv.wwwOrigin}/widget/common-wc-widget.bundle.js`}
          strategy="afterInteractive"
        />
        <PcGnb env={isProduction ? "production": isStage ? "stage" : "development"} />
        <MoHamburgerMenu env={isProduction ? "production": isStage ? "stage" : "development"} />
        {children}
      </body>
    </html>
  );
}
