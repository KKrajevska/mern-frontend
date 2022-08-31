import styled from "@emotion/styled";
import React, { FC } from "react";

interface AvatarT {
  image: string;
  alt: string;
}

export const Avatar: FC<AvatarT> = ({ image, alt }) => {
  return (
    <Wrapper>
      <IMG src={image} alt={alt} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IMG = styled.img`
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
