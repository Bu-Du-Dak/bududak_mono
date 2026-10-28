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
        duration={"2023.05 ~"}
        description="에너지·탄소관리 서비스의 모니터링과 보고서 기능을 개발하고, 회사 홈페이지의 콘텐츠 편집과 이미지 파일 관리를 구현했습니다."
        listComponent={<EanTec />}
      />
      <StickyContents
        title="(주) 딩코"
        subTitle="프론트엔드 개발자"
        duration={"2022.05 ~ 2023.04"}
        description="실시간 협업 코딩 도구의 코드 동기화와 음성·영상 연결을 구현하고, 수강생·운영자 화면의 학습·관리 기능을 개선했습니다."
        listComponent={<CodeCamp />}
      />
      <StickyContents
        title="(주) 뉴비즈스타트"
        subTitle="프론트엔드 개발자"
        duration={"2021.10 ~ 2022.05"}
        description="오프라인 중심 교육 서비스를 온라인 플랫폼으로 확장하는 프론트엔드 개발을 담당했습니다."
        listComponent={<NewBizStart />}
      />
    </SectionWithTitle>
  );
}
