import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
function OnlineCounselLayout() {
  const location = useLocation();
  const shouldHideTitle = location.pathname.startsWith("/admin");

  return (
    <Container>
      <Title shouldHide={shouldHideTitle}>
        <h1>온라인 상담</h1>
        <Outlet />
      </Title>
    </Container>
  );
}
const Title = styled.div`
  h1 {
    display: ${({ shouldHide }) => (shouldHide ? "none" : "block")};
  }
  width: 1000px;

  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default OnlineCounselLayout;
