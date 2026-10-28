import "styled-components";
import { AppTheme } from "../../../../packages/ui/src/themes/themes";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
