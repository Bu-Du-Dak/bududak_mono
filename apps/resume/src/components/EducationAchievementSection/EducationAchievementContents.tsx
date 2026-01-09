import SectionWithTitle from "../commons/SectionWithTitle";
import ResumeInfo from "../commons/ResumeInfo";

export default function EducationAchievementContents() {
  return (
    <SectionWithTitle title={"Education & Achievements"}>
      <ResumeInfo
        title="한국방송통신대학교"
        duration="2026.03 ~"
        subTitle="컴퓨터과학과"
      />
      <ResumeInfo
        title="CodeCamp"
        duration="2021.07 ~ 2021.10"
        subTitle="프론트엔드 2기"
      />
      <ResumeInfo
        title="대학교"
        duration="2012.03 ~ 2020.08"
        subTitle="국제경영학부 전략경영전공"
      />
    </SectionWithTitle>
  );
}
