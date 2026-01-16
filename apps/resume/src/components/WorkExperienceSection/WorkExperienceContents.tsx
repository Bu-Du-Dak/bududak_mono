import SectionWithTitle from "../commons/SectionWithTitle";
import StickyContents from "../commons/StickyContents";
import CodeCamp from "./CodeCamp";
import EanTec from "./EanTec";
import NewBizStart from "./Newbizstart";
export default function WorkExperienceContents() {
  return (
    <SectionWithTitle title={"Work Experience"}>
      <StickyContents
        title="EAN 테크놀로지"
        subTitle="프론트엔드 개발자"
        duration={"2023.05~"}
        description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        listComponent={<EanTec />}
      />
      <StickyContents
        title="(주) 딩코"
        subTitle="프론트엔드 개발자"
        duration={"2022.05~2023.04"}
        description="영상 강의 콘텐츠를 유료로 제공하는 온라인 플랫폼을 개발했습니다."
        listComponent={<CodeCamp />}
      />
      <StickyContents
        title="(주) 뉴비즈스타트"
        subTitle="프론트엔드 개발자"
        duration={"2021.10~2022.05"}
        description="오프라인 코딩 부트캠프의 온라인 서비스 확장을 담당했습니다."
        listComponent={<NewBizStart />}
      />
    </SectionWithTitle>
  );
}
