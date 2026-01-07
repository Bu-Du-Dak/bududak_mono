import { List, ListItem } from "@repo/ui/components/List";
import Anchor from "@repo/ui/typography/Anchor";
import SectionWithTitle from "../commons/SectionWithTitle";
export default function ContactContents() {
  return (
    <SectionWithTitle title="Contact">
      <List>
        <ListItem>
          <Anchor href="https://github.com/Bu-Du-Dak">Github</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="mailto:guri930219@gmail.com">Email</Anchor>
        </ListItem>
      </List>
    </SectionWithTitle>
  );
}
