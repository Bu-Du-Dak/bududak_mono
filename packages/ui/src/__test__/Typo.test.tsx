import { screen } from "@testing-library/react";
import { renderWithTheme, testTheme } from "./render";
import Anchor from "../typography/Anchor";
import Heading from "../typography/Heading";
import Paragraph from "../typography/Paragraph";

const tablet = testTheme.breakpoints.tablet;
const tabletMediaQuery =
  typeof tablet === "number"
    ? `(max-width: ${tablet}px)`
    : `(max-width: ${tablet})`;

describe("Anchor", () => {
  test("a 태그 렌더 target _blank / rel(noopener noreferrer)", () => {
    renderWithTheme(<Anchor href="https://bududak.com">link</Anchor>);

    const a = screen.getByRole("link", { name: "link" });
    expect(a).toBeInTheDocument();
    expect(a).toHaveAttribute("href", "https://bududak.com");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("기본 스타일 확인", () => {
    const { container } = renderWithTheme(
      <Anchor href="https://bududak.com">link</Anchor>,
    );
    const a = container.firstChild as HTMLElement;

    expect(a).toHaveStyleRule("font-size", testTheme.typography.sizes.md);
    expect(a).toHaveStyleRule("color", testTheme.colors.primary);
    expect(a).toHaveStyleRule("text-decoration", "none");
    expect(a).toHaveStyleRule("cursor", "pointer");
  });

  test("&:visited 색상 secondary", () => {
    const { container } = renderWithTheme(
      <Anchor href="https://bududak.com">link</Anchor>,
    );
    const a = container.firstChild as HTMLElement;

    expect(a).toHaveStyleRule("color", testTheme.colors.secondary, {
      modifier: ":visited",
    });
  });

  test("tablet 이하 font-size(sm)", () => {
    const { container } = renderWithTheme(
      <Anchor href="https://bududak.com">link</Anchor>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Heading", () => {
  test("기본 h1로 렌더", () => {
    const { container } = renderWithTheme(<Heading>Title</Heading>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName.toLowerCase()).toBe("h1");
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  test("level=2 렌더", () => {
    const { container } = renderWithTheme(<Heading level={2}>Title</Heading>);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName.toLowerCase()).toBe("h2");
  });

  test("level별 font-size/line-height/font-weight가 theme 값으로 매핑", () => {
    {
      const { container } = renderWithTheme(<Heading level={1}>H1</Heading>);
      const h = container.firstChild as HTMLElement;
      expect(h).toHaveStyleRule("font-size", testTheme.typography.sizes["4xl"]);
      expect(h).toHaveStyleRule(
        "line-height",
        testTheme.typography.sizes["4xl"],
      );
      expect(h).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.bold),
      );
    }

    {
      const { container } = renderWithTheme(<Heading level={2}>H2</Heading>);
      const h = container.firstChild as HTMLElement;
      expect(h).toHaveStyleRule("font-size", testTheme.typography.sizes["3xl"]);
      expect(h).toHaveStyleRule(
        "line-height",
        testTheme.typography.sizes["3xl"],
      );
      expect(h).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.bold),
      );
    }

    {
      const { container } = renderWithTheme(<Heading level={3}>H3</Heading>);
      const h = container.firstChild as HTMLElement;
      expect(h).toHaveStyleRule("font-size", testTheme.typography.sizes["2xl"]);
      expect(h).toHaveStyleRule(
        "line-height",
        testTheme.typography.sizes["2xl"],
      );
      expect(h).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.medium),
      );
    }

    {
      const { container } = renderWithTheme(<Heading level={4}>H4</Heading>);
      const h = container.firstChild as HTMLElement;
      expect(h).toHaveStyleRule("font-size", testTheme.typography.sizes.xl);
      expect(h).toHaveStyleRule("line-height", testTheme.typography.sizes.xl);
      expect(h).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.regular),
      );
    }
  });

  test("tablet 이하 level별 font-size/line-height 고정 rem 값", () => {
    const { container: c1 } = renderWithTheme(<Heading level={1}>H1</Heading>);
    expect(c1.firstChild).toMatchSnapshot();

    const { container: c2 } = renderWithTheme(<Heading level={2}>H2</Heading>);
    expect(c2.firstChild).toMatchSnapshot();

    const { container: c3 } = renderWithTheme(<Heading level={3}>H3</Heading>);
    expect(c3.firstChild).toMatchSnapshot();

    const { container: c4 } = renderWithTheme(<Heading level={4}>H4</Heading>);
    expect(c4.firstChild).toMatchSnapshot();
  });
});

describe("Paragraph", () => {
  test("p 태그로 렌더 children 포함", () => {
    const { container } = renderWithTheme(<Paragraph>본문</Paragraph>);
    const p = container.firstChild as HTMLElement;

    expect(p.tagName.toLowerCase()).toBe("p");
    expect(screen.getByText("본문")).toBeInTheDocument();
  });

  test("color 확인 없으면 theme.colors.text", () => {
    {
      const { container } = renderWithTheme(
        <Paragraph color="#000222">c</Paragraph>,
      );
      const p = container.firstChild as HTMLElement;
      expect(p).toHaveStyleRule("color", "#000222");
    }

    {
      const { container } = renderWithTheme(<Paragraph>c</Paragraph>);
      const p = container.firstChild as HTMLElement;
      expect(p).toHaveStyleRule("color", testTheme.colors.text);
    }
  });

  test("$fontWeight 확인 없으면 theme.typography.weights.regular", () => {
    {
      const { container } = renderWithTheme(
        <Paragraph $fontWeight={700}>w</Paragraph>,
      );
      const p = container.firstChild as HTMLElement;
      expect(p).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.bold),
      );
    }

    {
      const { container } = renderWithTheme(<Paragraph>w</Paragraph>);
      const p = container.firstChild as HTMLElement;
      expect(p).toHaveStyleRule(
        "font-weight",
        String(testTheme.typography.weights.regular),
      );
    }
  });

  test("기본 font-size(md), tablet 이하에서 sm", () => {
    const { container } = renderWithTheme(<Paragraph>size</Paragraph>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
