import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";
import { renderWithTheme, testTheme } from "./render";

test("children 텍스트 렌더", () => {
  renderWithTheme(<Button>확인</Button>);

  expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
});

test("disabled 처리", () => {
  renderWithTheme(<Button disabled>확인</Button>);

  expect(screen.getByRole("button", { name: "확인" })).toBeDisabled();
});

test("onClick 호출", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  renderWithTheme(<Button onClick={onClick}>확인</Button>);

  await user.click(screen.getByRole("button", { name: "확인" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("배경색 primary 확인", () => {
  const { container } = renderWithTheme(<Button>확인</Button>);

  expect(container.firstChild).toHaveStyleRule(
    "background-color",
    testTheme.colors.primary,
  );
});
