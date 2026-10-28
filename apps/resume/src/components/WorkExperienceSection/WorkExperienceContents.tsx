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
        description="제로에너지 건축 솔루션을 제공하는 B2B 서비스 개발과 아키텍처 설계를 리드했습니다."
        listComponent={<EanTec />}
      />
      <StickyContents
        title="(주) 딩코"
        subTitle="프론트엔드 개발자"
        duration={"2022.05 ~ 2023.04"}
        description="실시간 코드 편집과 화상 소통이 결합된 학습 플랫폼의 프론트엔드 전반을 담당했습니다."
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
