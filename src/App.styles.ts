import styled, { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle `
    html {
        height: 100%;
    }

    body {
        text-align: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }

`

export const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #fff;
    }

    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: Fascinate Inline Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
`