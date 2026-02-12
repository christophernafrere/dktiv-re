"use client";

import colors from "@/lib/color";
import styled from "styled-components";
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;

    input {
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid ${colors.tertiary.grey300};
    }
`;
