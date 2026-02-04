import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #000000;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
        font-family: "sora", sans-serif;
    }

    p {
        font-family: "dm-sans", sans-serif;
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size:36px;
        font-weight: 800;
        line-height: 48px;
        letter-spacing: auto;
    }

    h2 {
        font-size:28px;
        font-weight: 800;
        line-height: 48px;
        letter-spacing: auto;
    }

    h3 {
        font-size:24px;
        font-weight: 600;
        line-height: 40px;
        letter-spacing: auto;
    }

    h4 {
        font-size:18px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: auto;
    }

    h5 {
        font-size:20px;
        font-weight: 600;
        line-height: 32px;
        letter-spacing: auto;
    }

    p {
        font-family: "dm-sans", sans-serif;
    }

    .regular-16 {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: auto;
    }

    .regular-18 { 
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: auto;
    }

    .regular-20 {
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: auto;
    }

    .medium-16 {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: auto;
    }

    .medium-18 {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: auto;
    }

    .medium-20 {
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: auto;
    }

    .bold-16 {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: auto;
    }

    .bold-18 {
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: auto;
    }

    .bold-20 {
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: auto;
    }

    .caption-regular {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: auto;
    }

    .caption-medium {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: auto;
    }

    .caption-bold {
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: auto;
    }
`;

export default GlobalStyles;
