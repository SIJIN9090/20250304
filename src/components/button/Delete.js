import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function Delete() {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  const deleteNotice = async () => {
    try {
      const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (!isConfirmed) return;

      // 삭제 요청 보내기 (단일 요청)
      const response = await axios.delete(`/api/admin/notice/${noticeId}`);

      // 응답 확인
      if (response.status === 200) {
        alert("게시글이 삭제되었습니다.");
        navigate("/admin/notice"); // 관리자의 공지사항 페이지로 이동
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("deleteNotice error", error);
      alert("삭제에 실패하였습니다. 다시 시도해 주세요.");
    }
  };

  return <Button onClick={deleteNotice}>삭제</Button>;
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
export default Delete;
