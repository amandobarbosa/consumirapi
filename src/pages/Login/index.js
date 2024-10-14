import React, { useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import * as actions from "../../store/modules/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import Loading from "../../componentes/Loading";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector(state=>state?.auth?.isLoading)

  const prevPath = get(props, "location.state.prevPath", "/");

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErros = false;
    if (password.length < 3 || password.length > 255) {
      formErros = true;
      toast.error("Senha inválida");
    }
    if (!isEmail(email)) {
      formErros = true;
      toast.error("Email inválido");
    }
    if (formErros) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isloading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Seu email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
