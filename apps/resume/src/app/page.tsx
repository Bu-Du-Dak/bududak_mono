import StickySection from "../components/StickySection";
import ResumeContents from "../components/ResumeContents";

export default function Home() {
  return (
    <div>
      <StickySection title={"resume"}>
        <ResumeContents />
        <ResumeContents />
        <ResumeContents />
      </StickySection>
      {/* <Button2 /> */}
    </div>
  );
}
