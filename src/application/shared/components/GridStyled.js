import styled from "styled-components";

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props["windowWidth"] < 800
      ? "repeat(1, 1fr)"
      : props["windowWidth"] < 1200
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)"};
  gap: 10px;
  margin-block: 20px;
`;

export default GridStyled;
