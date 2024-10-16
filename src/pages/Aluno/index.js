import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import { get } from "lodash";
import PropTypes from "prop-types";
import Form from './styled'
import { isEmail, isInt, isFloat,} from "validator";
import { toast } from "react-toastify";
import Loading from '../../componentes/Loading/index'
import axios from "../../services/axios";
import history from "../../services/history";

export default function Aluno({ match }) {
  const id = get(match, "params.id", 0);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(()=>{
    if(!id) return
    async function getData() {
      try {
        setIsloading(true)
        const {data} = await axios.get(`/alunos/${id}`)
        const Foto = get(data, 'Fotos[0].url', '')

        setNome(data.nome)
        setSobrenome(data.sobrenome)
        setIdade(data.idade)
        setEmail(data.email)
        setPeso(data.peso)
        setAltura(data.altura)
      } catch (error) {
        setIsloading(false)
        const status = get(error, 'response.status', 0)
        const errors = get(error, 'response.errors', 0)
        if(status === 400){
          errors.map(error=> toast.error(error))
          history.push('/')
        }
      }
    }
    getData()
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error("nome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error("sobrenome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error("Email inválido");
      formErrors = true;
    }
    if (!isInt(String(idade))) {
      toast.error("idade inválida");
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.error("altura inválida");
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.error("peso inválida");
      formErrors = true;
    }


  };

  return (
    <Container>
      <h1>{id ? "Editar aluno" : "Novo Aluno"}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="idade"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="altura"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="peso"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
Aluno.prototypes = {
  match: PropTypes.shape({}).isRequired,
};
