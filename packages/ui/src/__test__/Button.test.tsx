import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";
import { renderWithTheme, testTheme } from "./render";

test("children 텍스트를 렌더링한다", () => {
  renderWithTheme(<Button>확인</Button>);

  expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
});

test("disabled prop이 button에 전달된다", () => {
  renderWithTheme(<Button disabled>확인</Button>);

  expect(screen.getByRole("button", { name: "확인" })).toBeDisabled();
});

test("클릭하면 onClick이 호출된다", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  renderWithTheme(<Button onClick={onClick}>확인</Button>);

  await user.click(screen.getByRole("button", { name: "확인" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("theme.colors.primary가 background-color로 적용된다", () => {
  const { container } = renderWithTheme(<Button>확인</Button>);

  expect(container.firstChild).toHaveStyleRule(
    "background-color",
    testTheme.colors.primary,
  );
});
