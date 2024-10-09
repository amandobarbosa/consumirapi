import React, { useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import { toast } from "react-toastify";
import { isEmail } from "validator";
// import axios from "../../services/axios";
import history from "../../services/history";

export default function Register() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let formErros = false;
    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error("Nome deve ter entre 3 e 255 caracteres");
    }
    if (password.length < 3 || password.length > 255) {
      formErros = true;
      toast.error("Password deve ter entre 3 e 255 caracteres");
    }
    if (!isEmail(email)) {
      formErros = true;
      toast.error("Email inválido");
    }
    if (formErros) return;

    try {
      // await axios.post('/users', {
      //   nome: nome,
      //   password: password,
      //   email: email
      // })
      toast.success("Você fez seu cadastro");
      history.push("/login");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <h1>Crie sua conta</h1>

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
        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
