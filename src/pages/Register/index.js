import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import Loading from "../../componentes/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../store/modules/types";

export default function Register() {

  const dispatch = useDispatch()
  const id = useSelector((state) => state?.auth?.user?.id);
  const nomeStorage = useSelector((state) => state?.auth?.user?.nome);
  const emailStorage = useSelector((state) => state?.auth?.user?.email);
  const isLoading = useSelector((state) => state?.auth?.user?.isLoading);

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!id) return;
    setNome(nomeStorage);
    setEmail(emailStorage);
  }, [emailStorage, id, nomeStorage]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;
    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error("Nome deve ter entre 3 e 255 caracteres");
    }
    if (!id && (password.length < 3 || password.length > 255)) {
      formErros = true;
      toast.error("Password deve ter entre 3 e 255 caracteres");
    }
    if (!isEmail(email)) {
      formErros = true;
      toast.error("Email inválido");
    }
    if (formErros) return;
    dispatch(actions.REGISTER_REQUEST({nome, email, password, id}))
  }
  return (
    <Container>
      <Loading isloading={isLoading} />
      <h1>{id ? "Editar dados" : "Crie sua conta"}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome
          <input
            placeholder="Seu nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            placeholder="Seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          password
          <input
            placeholder="Sua senha"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{id ? "Salvar" : "Criar minha conta"}</button>
      </Form>
    </Container>
  );
}
