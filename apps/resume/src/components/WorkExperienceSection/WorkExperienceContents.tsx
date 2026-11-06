import SectionWithTitle from "../commons/SectionWithTitle";
import StickyContents from "../commons/StickyContents";
import CodeCamp from "./CodeCamp";
import EanTec from "./EanTec";
import PersonalProject from "./PersonalProject";
export default function WorkExperienceContents() {
  return (
    <SectionWithTitle title={"Work Experience"}>
      <StickyContents
        title="EAN테크놀로지"
        subTitle="Frontend Engineer Lead"
        duration={"2023.05 ~"}
        description="제로에너지 건축 설계·운영 B2B SaaS에서 에너지·탄소관리 서비스와 회사 홈페이지·CMS를 개발하고, 프론트엔드 팀을 리드하고 있습니다."
        listComponent={<EanTec />}
      />
      <StickyContents
        title="(주) 딩코 · 뉴비즈스타트"
        subTitle="Frontend Engineer"
        duration={"2021.10 ~ 2023.04"}
        description="에듀테크 플랫폼에서 실시간 협업 코딩 에디터와 강의 플랫폼을 개발했습니다. 2022.05 뉴비즈스타트에서 딩코로 고용승계되었습니다."
        listComponent={<CodeCamp />}
      />
      <StickyContents
        title="Personal Project"
        subTitle="bududak_mono"
        duration={"2025.10 ~"}
        description="이 사이트와 포트폴리오, 블로그를 운영하는 개인 모노레포입니다."
        listComponent={<PersonalProject />}
      />
    </SectionWithTitle>
  );
}
