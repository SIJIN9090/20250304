import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function List() {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  const handleCancelClick = () => {
    navigate("/admin/notice"); // "공지사항 관리"로 이동
  };

  return <Button onClick={handleCancelClick}>목록</Button>;
}

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;
export default List;
