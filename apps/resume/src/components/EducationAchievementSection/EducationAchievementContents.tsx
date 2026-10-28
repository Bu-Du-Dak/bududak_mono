import SectionWithTitle from "../commons/SectionWithTitle";
import ResumeInfo from "../commons/ResumeInfo";

export default function EducationAchievementContents() {
  return (
    <SectionWithTitle title={"Education"}>
      <ResumeInfo
        title="한국방송통신대학교"
        duration="2026.03 ~"
        subTitle="컴퓨터과학과"
        sticky={false}
      />
      <ResumeInfo
        title="코드캠프"
        duration="2021.07 ~ 2021.10"
        subTitle="프론트엔드 2기"
        sticky={false}
      />
      <ResumeInfo
        title="웹 디자인 기능사"
        duration="2020.12"
        subTitle="한국 산업인력 공단"
        sticky={false}
      />
      <ResumeInfo
        title="우송대학교"
        duration="2012.03 ~ 2020.08"
        subTitle="국제경영학부 전략경영전공"
        sticky={false}
      />
    </SectionWithTitle>
  );
}
