"use client";

import { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

type FlipProfileProps = {
  frontSrc: string;
  backSrc: string;
  altFront?: string;
  altBack?: string;
  size?: number;
};

export default function FlipProfile({
  frontSrc,
  backSrc,
  altFront = "front",
  altBack = "back",
  size = 100,
}: FlipProfileProps) {
  const [isBack, setIsBack] = useState(false);
  const [animation, setAnimation] = useState<"toBack" | "toFront" | null>(null);
  const insideRef = useRef(false);

  const triggerFlip = () => {
    setAnimation(isBack ? "toFront" : "toBack");
    setIsBack((v) => !v);
  };

  const onEnter = () => {
    if (insideRef.current) return;
    insideRef.current = true;
    triggerFlip();
  };

  const onLeave = () => {
    insideRef.current = false;
  };

  return (
    <Wrap
      style={{ width: size, height: size }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label="flip profile"
    >
      <Inner
        $isBack={isBack}
        $animation={animation}
        onAnimationEnd={() => setAnimation(null)}
      >
        <Face>
          <Img src={frontSrc} alt={altFront} draggable={false} />
        </Face>
        <BackFace>
          <Img src={backSrc} alt={altBack} draggable={false} />
        </BackFace>
      </Inner>
    </Wrap>
  );
}

const toBack = keyframes`
  0%   { transform: rotateY(0deg) scaleX(1); }
  55%  { transform: rotateY(720deg) scaleX(0.94); }
  100% { transform: rotateY(900deg) scaleX(0.97); }
`;

const toFront = keyframes`
  0%   { transform: rotateY(900deg) scaleX(0.97); }
  55%  { transform: rotateY(180deg) scaleX(0.94); }   
  100% { transform: rotateY(0deg) scaleX(1); }
`;

const Wrap = styled.div`
  border-radius: 100%;
  perspective: 90rem;
`;

const Inner = styled.div<{
  $isBack: boolean;
  $animation: "toBack" | "toFront" | null;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transform-style: preserve-3d;

  //동작 끝나고 보여줄 면 확정지어야징
  ${({ $isBack }) =>
    $isBack ? "transform: rotateY(180deg);" : "transform: rotateY(0deg);"}

  ${({ $animation }) =>
    $animation === "toBack"
      ? css`
          animation: ${toBack} 1700ms ease-out forwards;
        `
      : $animation === "toFront"
        ? css`
            animation: ${toFront} 1700ms ease-out forwards;
          `
        : css`
            animation: none;
          `}
`;

const FaceBase = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 100%;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const Face = styled(FaceBase)`
  transform: rotateY(0deg);
`;

const BackFace = styled(FaceBase)`
  transform: rotateY(180deg);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  pointer-events: none;
`;
