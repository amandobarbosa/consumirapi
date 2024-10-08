import React from "react";
import { Title, Paragrafo } from "./styled";
import { Container } from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import * as exampleActions from "../../store/modules/example/actions";

export default function Login() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  };

  return (
    <Container>
      <Title>
        Pagina de login
        <small> Oi</small>
      </Title>
      <Paragrafo>lorem</Paragrafo>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
