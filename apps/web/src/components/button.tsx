"use client";
import colors from "@/lib/color";
import styled from "styled-components";

export const Button = styled.button<{ $cta?: boolean }>`
    background-color: ${(props) =>
        props.$cta ? colors.primary.blue : "transparent"};

    border: ${(props) =>
        props.$cta ? "none" : `1px solid ${colors.base.white}`};
    color: ${colors.base.white};
    font-family: "dm-sans", sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    &:disabled {
        background-color: ${colors.opacity.blue10};
        color: ${colors.tertiary.grey400};
        cursor: not-allowed;
    }
`;

export const TransparentButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: auto;
    cursor: pointer;

    &:hover {
        background-color: ${colors.opacity.blue25};
    }
`;
