import styled from "styled-components";

const Column = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? `${props.gap}px` : "10px")};
  align-items: center;
  align-items: ${(props) => {
    if (props.a_center) return "center";
    if (props.a_start) return "flex-start";
    if (props.a_end) return "flex-end";
  }};
  justify-content: ${(props) => {
    if (props.j_center) return "center";
    if (props.j_start) return "flex-start";
    if (props.j_end) return "flex-end";
    if (props.j_between) return "space-between";
  }};
  user-select: none;
`;

export default Column;
