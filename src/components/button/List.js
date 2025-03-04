import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function List({ postType }) {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    switch (postType) {
      case 1:
        navigate("/admin/notice"); // 공지사항 관리 페이지로 이동
        break;
      case 2:
        navigate("/admin/onlineCounsel"); // 온라인 상담 관리 페이지로 이동
        break;
      // 추가적인 postType 값 처리 (예: 3번)
      case 3:
        navigate("/admin/review"); // 리뷰 관리 페이지로 이동
        break;
      default:
        console.warn("Invalid postType:", postType); // 예외 처리
        alert("잘못된 페이지 요청입니다.");
    }
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
