// 서버 레이아웃에서 쓰므로 "use client" 모듈과 분리한다.
/** 첫 페인트 전에 쿠키의 테마를 <html data-theme>에 반영하는 인라인 스크립트 */
export const themeInitScript = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);document.documentElement.setAttribute("data-theme",m?m[1]:"dark");}catch(e){}})();`;

export default function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
