import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../componentes/Loading/index";
import { Form, Title } from "./styled";
import history from "../../services/history";
import axios from "../../services/axios";
import { get } from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos({ match }) {
  const id = get(match, "params.id", "");
  const [isLoading, setIsLoadind] = useState(false);
  const [foto, setFoto] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoadind(true);
        const { data } = await axios.get(`alunos/${id}`);
        setFoto(get(data, "Fotos[0].url", ""));
      } catch (error) {
        toast.error("Erro ao obter imagem");
        history.push("/");
      }
      setIsLoadind(false);
    };
    getData();
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("file", file);

    try {
      setIsLoadind(true);

      await axios.post("/fotos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("foto enviada com sucesso");

      setIsLoadind(false);
    } catch (error) {
      setIsLoadind(false);
      const {status} = get(error, 'response', '')
      toast.error('Erro ao enviar foto')

      if(status === 401) dispatch(actions.loginFailure)
    }
  };
  return (
    <Container>
      <Loading isLoadind={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="foto" /> : "Selecionar"}
          <input onChange={handleChange} type="file" id="foto" />
        </label>
      </Form>
    </Container>
  );
}

Fotos.prototype = {
  match: PropTypes.shape({}).isRequired,
};
