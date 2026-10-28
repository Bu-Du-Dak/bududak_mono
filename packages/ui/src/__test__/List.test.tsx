import { screen } from "@testing-library/react";
import { renderWithTheme, testTheme } from "./render";
import { List, ListItem } from "../components/List";

const tablet = testTheme.breakpoints.tablet;
const tabletMediaQuery =
  typeof tablet === "number"
    ? `(max-width: ${tablet}px)`
    : `(max-width: ${tablet})`;

test("ul 렌더 children 포함 확인", () => {
  renderWithTheme(
    <List>
      <ListItem>첫번째</ListItem>
    </List>,
  );

  const ul = screen.getByRole("list");
  expect(ul).toBeInTheDocument();
  expect(screen.getByText("첫번째")).toBeInTheDocument();
});

test("ListItem li로 렌더 기본 폰트 md", () => {
  const { container } = renderWithTheme(<ListItem>아이템</ListItem>);
  const li = container.firstChild as HTMLElement;

  expect(li.tagName.toLowerCase()).toBe("li");
  expect(li).toHaveStyleRule("font-size", testTheme.typography.sizes.md);
});

test("::before 컬러 primary", () => {
  const { container } = renderWithTheme(<ListItem>아이템</ListItem>);
  const li = container.firstChild as HTMLElement;

  expect(li).toHaveStyleRule("background", testTheme.colors.primary, {
    modifier: "::before",
  });

  expect(li).toHaveStyleRule("color", testTheme.colors.primary, {
    modifier: "::before",
  });
});

test("tablet 이하 font-size sm", () => {
  const { container } = renderWithTheme(<ListItem>아이템</ListItem>);

  expect(container.firstChild).toMatchSnapshot();
});
