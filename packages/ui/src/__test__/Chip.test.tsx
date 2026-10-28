import { screen } from "@testing-library/react";
import { renderWithTheme, testTheme } from "./render";
import { Chip } from "../components/Chip";

test("children을 렌더", () => {
  renderWithTheme(<Chip>NEW</Chip>);
  expect(screen.getByText("NEW")).toBeInTheDocument();
});

test("color prop 적용", () => {
  const color = "#00ff00";
  const { container } = renderWithTheme(<Chip color={color}>GREEN</Chip>);

  const el = container.firstChild as HTMLElement;

  expect(el).toHaveStyleRule("color", color);
  expect(el).toHaveStyleRule("border-color", color);
});

test("color prop이 없으면 theme의 textSecondary와 border 적용", () => {
  const { container } = renderWithTheme(<Chip>DEFAULT</Chip>);
  const el = container.firstChild as HTMLElement;

  expect(el).toHaveStyleRule("color", testTheme.colors.textSecondary);
  expect(el).toHaveStyleRule("border-color", testTheme.colors.border);
});

test("폰트 사이즈 xs 확인", () => {
  const { container } = renderWithTheme(<Chip>SIZE</Chip>);
  const el = container.firstChild as HTMLElement;

  expect(el).toHaveStyleRule("font-size", testTheme.typography.sizes.xs);
});
