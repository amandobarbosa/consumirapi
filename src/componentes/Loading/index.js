import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styled";

export default function Loading({ isloading }) {
  if (!isloading) return <></>;
  return (
    <Container>
      <div />
      <span>Carregando...</span>
    </Container>
  );
}

Loading.defaultProps = {
  isloading: false,
};

Loading.propTypes = {
  isloading: PropTypes.bool,
};
