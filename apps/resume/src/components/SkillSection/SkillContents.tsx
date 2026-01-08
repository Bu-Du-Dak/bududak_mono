import SectionWithTitle from "../commons/SectionWithTitle";
import SkillItem from "./SkillItem";

const SkillConstant = [
  {
    title: "JavaScript / TypeScript",
    itemArr: [
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasasdkljasjdlkasjdklasjdklasdjlkasddjlkasd",
      "asdkljasjdlkasjdklasjdklasdkljasjdlkasjdklasjdklasdjlkasdasdkljasjdlkasjdklasjdklasdjlkasdasdjlkasd",
    ],
  },
  {
    title: "Styles",
    itemArr: [
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklaasdkljasjdlkasjdklasjdklasdjlkasdsdjlkasd",
      "asdkljasjdlkasjdklasjdklasasdkljasjdlkasjdklasjdklasdjlkasddjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklaasdkljasjdlkasjdklasjdklasdjlkasdsdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
    ],
  },
  {
    title: "Communication",
    itemArr: [
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklaasdkljasjdlkasjdklasjdklasdjlkasdsdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasdasdkljasjdlkasjdklasjdklasdjlkasdasdkljasjdlkasjdklasjdklasdjlkasd",
      "asdkljasjdlkasjdklasjdklasdjlkasd",
    ],
  },
];
export default function SkillContents() {
  return (
    <SectionWithTitle title={"Skills"}>
      {SkillConstant.map((e) => (
        <SkillItem key={e.title} title={e.title} itemArr={e.itemArr} />
      ))}
    </SectionWithTitle>
  );
}
