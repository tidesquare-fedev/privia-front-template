"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import WebComponentWrapper from "@/components/web-component-wrapper";
import { clientEnv } from "@/lib/client-env";
import { convertImageLinkToThumbo } from "@/lib/cdn-image";

interface MoHamburgerMenuProps {
  env: "production" | "stage" | "development";
}

export default function MoHamburgerMenu({
  env = "production",
}: MoHamburgerMenuProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // 화면 너비가 768px 미만이면 모바일로 간주
      const isMobileSize = window.innerWidth < 768;
      // User Agent로 모바일 기기 체크
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isMobileSize || isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 햄버거 메뉴 높이만큼 스크롤 처리
  useEffect(() => {
    if (isMobile) {
      // 햄버거 메뉴 높이(50px)만큼 스크롤
      window.scrollTo(0, 50);
    }
  }, [isMobile]);

  // 위젯 닫기 이벤트 핸들러 추가
  useEffect(() => {
    const gnbCloseHandler = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener("gnb-close", gnbCloseHandler);
    return () => window.removeEventListener("gnb-close", gnbCloseHandler);
  }, []);

  // 모바일이 아니면 렌더링하지 않음
  if (!isMobile) {
    return null;
  }

  return (
    <div className="z-50">
      <div className="h-[50px] bg-white flex items-center justify-center">
        <div className="absolute left-[20px] top-0">
          <button
            className="relative before:w-[28px] before:h-[10px] before:bg-[url('https://static.priviatravel.com/images/front/mtravel/contents/icon-common-secM.png')] before:bg-size-[160px] before:bg-position-[-45px_0] before:bg-[''] before:absolute before:left-0 before:top-[6px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="absolute w-px h-px hidden">메뉴보기</span>
          </button>
        </div>
        <a href={clientEnv.mwOrigin} className="w-[95px]">
          <Image
            src={convertImageLinkToThumbo(
              env,
              "https://static.priviatravel.com/images/front/mtravel/contents/logo-privia-2.png"
            )}
            alt="Privia"
            width={100}
            height={100}
          />
        </a>
        <a
          href={`${clientEnv.mwOrigin}/mypage/main`}
          className="absolute top-[15px] right-[20px] w-[23px] h-[22px] bg-[url('https://static.priviatravel.com/images/front/mtravel/contents/icon-common-secM.png')] bg-size-[160px] bg-position-[-19px_0]"
        >
          <span className="absolute w-0 h-0 hidden">마이페이지 가기</span>
        </a>
      </div>
      {isMenuOpen && (
        <WebComponentWrapper
          tagName="mo-global-nav-bar"
          attributes={{ env, visible: "Y", dim: "Y" }}
          fallback={
            <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center">
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          }
        />
      )}
    </div>
  );
}
