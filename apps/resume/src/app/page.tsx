import SectionWithTitle from "../components/SectionWithTitle";
import ResumeContents from "../components/ResumeContents";
import ResumeCodeCamp from "../components/ResumeCodeCamp";

export default function Home() {
  return (
    <div>
      <SectionWithTitle title={"test"}>
        <ResumeCodeCamp />
        <ResumeContents />
        <ResumeContents />
      </SectionWithTitle>
      {/* <Button2 /> */}
    </div>
  );
}
