"use client";
import pxTorem from "@/utils/pxToRem";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    // Fonts
  --font-poppins: 'poppins', sans-serif;
  --font-italianno: 'italianno', monospace;
  --extra-bold: 700;
  --bold: 600;
  --semi-bold: 500;
  --regular: 400;


  // Colors
  --col-000: #000000;
  --col-100: #ffffff;
  --col-200: #6A00FF;
  --col-200-light: #b47effe1;
  --col-300: #FF2828;
  --col-400: #0099ffff;
  --body-bg: #FFF0F0;

    // Others
  --border-radius: ${pxTorem(12)};
  --shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
  --max-width: ${pxTorem(1200)};
  --centered: 0 auto;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;}

body {
    font-family: var(--font-poppins);
    background-color: var(--body-bg);
    color: var(--col-000);
    overflow-x: hidden;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${pxTorem(16)};
}
a {
    text-decoration: none;
    color: unset;
    cursor: pointer;
}
ul, ol {
    list-style: none;
}
button{
    cursor: pointer;
    background: none;
    border: none;
}
button:disable, input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
h1{
    font-size: clamp(${pxTorem(28)},${pxTorem(32)},${pxTorem(40)});
    font-weight: var(--extra-bold);
    line-height: 1.2;
    text-transform: capitalize;
}
h2, legend{
    font-size: clamp(${pxTorem(24)},${pxTorem(28)},${pxTorem(32)});
    font-weight: var(--bold);
    line-height: 1.3;
    text-transform: capitalize;
}
h3, label{
    font-size: clamp(${pxTorem(16)},${pxTorem(18)},${pxTorem(24)});
    font-weight: var(--bold);
    line-height: 1.4;
    text-transform: capitalize;
}
p, li{
    font-size: ${pxTorem(16)};
    font-weight: var(--regular);
    line-height: 1.4;
}

.status {
    padding: ${pxTorem(15)};
    border-radius: var(--border-radius);
  }

.pending {
      background-color: #ffbe86ff;
      color: orange;
    }

.transit {
      background-color: #87cefa;
      color: #00b7ffff;
    }

.recieved, .accepted {
      background-color: #90ee90;
      color: #00ff00;
    }
.canceled, .rejected {
      background-color: #ff4c4cff;
      color: var(--col-300);
    }


input, textarea, select {
  display: block;
    border-radius: var(--border-radius);
    padding: ${pxTorem(16)} ${pxTorem(8)} ;
    width: 100%;
    border: ${pxTorem(1)} solid grey;
    transition: all ease 0.5s;
    &[type="checkbox"] {
      width: fit-content;
      border-radius: var(--border-radius);
    }
    &[type='file']{
      display: none;
    }

  }
  input:focus {
    border-color: var(--col-400);
    outline: none;
  }

  input:read-only{
    cursor: not-allowed;
    &:hover{
      cursor: not-allowed;
    }
  }

   form {
    display: grid;
    max-width: ${pxTorem(1024)};
    width: 100%;
    border-radius: var(--border-radius);
    gap: ${pxTorem(32)};
    background-color: var(--col-100);
    box-lines: ${pxTorem(6)} ${pxTorem(6)} ${pxTorem(10)} rgba(0, 0, 0, 0.1);
    padding: ${pxTorem(40)} ${pxTorem(16)};

    div {
      position: relative;
      width: 100%;
     
      .password {
        padding-right: ${pxTorem(50)};
      }
      .error {
        position: absolute;
        color: var(--col-300);
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        font-size: ${pxTorem(11)};
      }

      .eye {
        color: grey;
        font-size: ${pxTorem(32)};
        position: absolute;
        right: 8px;
        bottom: 0;
      }
    }

    fieldset {
      border: none;
      display: grid;
      gap: ${pxTorem(24)};
      legend{
        text-align: center;
        margin-bottom: ${pxTorem(16)};
      }
    }

    .seperator {
      p {
        flex: 2;
        flex-wrap: nowrap;
        width: 100%;
      }
      div {
        flex: 1;
        height: 1px;
        border-color: grey;
        border: solid 1px;
        opacity: 0.6;
      }
    }

    .google {
      padding: ${pxTorem(16)};
      border-radius: var(--border-radius);
      border: grey 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${pxTorem(10)};
      font-weight: bold;
      transition: all ease 0.5s;
      color: grey;

      svg {
        font-size: ${pxTorem(24)};
      }

      &:hover {
        background-color: grey;
        color: var(--col-100);
      }
    }

    > div {
      text-align: center;
      h1 {
        margin-bottom: ${pxTorem(16)};
      }
      p {
        font-weight: var(--bold);
        color: grey;
        a {
          color: var(--col-400);
        }
      }
    }
  }
`;

export default GlobalStyle;
