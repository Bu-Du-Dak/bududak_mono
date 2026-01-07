import SectionWithTitle from "../commons/SectionWithTitle";
import StickyContents from "../commons/StickyContents";
import CodeCamp from "./codecamp/CodeCamp";
export default function WorkExperienceContents() {
  return (
    <SectionWithTitle title={"Work Experience"}>
      <StickyContents
        title="EAN 테크놀로지"
        subTitle="프론트엔드 개발자"
        duration={"2023.05~"}
        description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        listComponent={<CodeCamp />}
      />
      <StickyContents
        title="코드캠프"
        subTitle="프론트엔드 개발자"
        duration={"2021.10~2023.05"}
        description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        listComponent={<CodeCamp />}
      />
      <StickyContents
        title="뉴비즈스타트"
        subTitle="프론트엔드 개발자"
        duration={"2021.10~2023.05"}
        description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        listComponent={<CodeCamp />}
      />
    </SectionWithTitle>
  );
}
