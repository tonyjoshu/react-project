import styled from "styled-components";

const Row = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  gap: ${(props) => `${props.gap}px` ?? "20px"};
  align-items: center;
  align-items: ${(props) => {
    if (props.a_center) return "center";
    if (props.a_end) return "flex-end";
    if (props.a_start) return "flex-start";
  }};
  justify-content: ${(props) => {
    if (props.j_center) return "center";
    if (props.j_end) return "flex-end";
    if (props.j_between) return "space-between";
    if (props.j_evenly) return "space-evenly";
  }};
  user-select: none;
`;

export default Row;
