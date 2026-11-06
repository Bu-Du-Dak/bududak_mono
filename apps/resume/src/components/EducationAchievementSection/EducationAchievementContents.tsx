import SectionWithTitle from "../commons/SectionWithTitle";
import ResumeInfo from "../commons/ResumeInfo";

export default function EducationAchievementContents() {
  return (
    <SectionWithTitle title={"Education & Awards"}>
      <ResumeInfo
        title="올해의 사원"
        duration="2024.12"
        subTitle="EAN테크놀로지"
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
        subTitle="국제경영 전공, 운송물류 부전공"
        sticky={false}
      />
    </SectionWithTitle>
  );
}
