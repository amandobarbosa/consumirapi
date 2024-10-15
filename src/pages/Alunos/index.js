import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import { AlunoContainer } from "./styled";
import {
  FaUserCircle,
  FaEdit,
  FaExclamation,
  FaWindowClose,
} from "react-icons/fa";
import { get } from "lodash";
import { ProfilePicture } from "./styled";
import { Link } from "react-router-dom";
import Loading from "../../componentes/Loading";
import { toast } from "react-toastify";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/");
      setAlunos(response.data.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.persist();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  const handleDele = async (e, id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      e.currentTarget.parentElement.remove();
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, -1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (error) {
      const status = get(error, "response.status", []);
      if (status === 401) {
        toast.error("Você precisa fazer login");
      } else {
        toast.error("Ocorreu um erro ao excluir");
      }
      setIsLoading(false)
    }
  };
  return (
    <Container>
      <Loading isloading={isLoading} />
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={index}>
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img src={aluno?.Fotos[0]?.url} alt="fotos" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.fact}</span>

            <Link to={`/aluno/${aluno?.id}`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno?.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              onClick={(e) => handleDele(e, aluno.id, index)}
              size={16}
              cursor="pointer"
              display="none"
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
