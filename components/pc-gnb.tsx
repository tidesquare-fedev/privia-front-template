"use client";

import WebComponentWrapper from "@/components/web-component-wrapper";
import { useEffect, useState } from "react";


interface PcGnbProps {
  env: "production" | "stage" | "development";
}

export default function PcGnb({ env }: PcGnbProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isWebComponentReady, setIsWebComponentReady] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // 화면 너비가 768px 이상이면 데스크톱으로 간주
      const isDesktopSize = window.innerWidth >= 768;
      // User Agent로 모바일 기기 체크
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsDesktop(isDesktopSize && !isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    // 웹 컴포넌트가 로드되었는지 확인
    const checkWebComponent = () => {
      if (customElements.get("pc-global-nav-bar")) {
        setIsWebComponentReady(true);
      } else {
        // 웹 컴포넌트가 로드될 때까지 기다림
        customElements.whenDefined("pc-global-nav-bar").then(() => {
          setIsWebComponentReady(true);
        });
      }
    };

    checkWebComponent();
  }, []);

  // PC 브라우저가 아니면 렌더링하지 않음
  if (!isDesktop) {
    return null;
  }

  // 웹 컴포넌트가 준비되지 않았으면 fallback 표시
  if (!isWebComponentReady) {
    return (
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <WebComponentWrapper
      tagName="pc-global-nav-bar"
      attributes={{
        env,
        category: "DIRECT",
        nonesticky: 'Y'
      }}
      fallback={
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      }
    />
  );
}