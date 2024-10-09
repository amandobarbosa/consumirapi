import React, { useEffect, useState } from "react";
import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import { AlunoContainer } from "./styled";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { get } from "lodash";
import { ProfilePicture } from "./styled";
import { Link } from "react-router-dom";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/");
      setAlunos(response.data.data);
    }
    getData();
  }, []);
  return (
    <Container>
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
            <Link to={`/aluno/${aluno?.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
