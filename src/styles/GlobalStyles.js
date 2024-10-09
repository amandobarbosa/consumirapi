import styled, { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
}
body{
    font-family: sans-serif;
    background-color: ${colors.primaryDarkColor};
    color: ${colors.primaryColor};
}
html, body, #root{
    height: 100%;
}

button{
    cursor: pointer;
    background-color: ${colors.primaryColor};
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
}
a{
    text-decoration: none;
    color: ${colors.primaryColor};
}
ul{
    list-style: none;
}
body .Toasify .Toastify_toast-container .Toast_toast--success{
    background-color: ${colors.successColor};
}
body .Toasify .Toastify_toast-container .Toast_toast--error{
    background-color: ${colors.errorColor};
}
`;


export const Container = styled.section`
max-width: 480px;
background-color: white;
margin: 30px auto;
padding: 30px;
border-radius: 4px;
box-shadow: 0 0 10px #000;
`