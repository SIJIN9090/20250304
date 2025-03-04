import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Write({
  title,
  content,
  files,
  setTitle,
  setContent,
  setFiles,
  headers,
  postType,
}) {
  const navigate = useNavigate(); // navigate 훅 추가

  // 파일 업로드 함수
  const fileUpload = async (noticeId) => {
    if (!files || files.length === 0) {
      return;
    }

    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    try {
      await axios.post(`/api/admin/notice/${noticeId}/file`, fd, { headers });
      alert("파일 업로드 성공 :D");
    } catch (err) {
      console.error("파일 업로드 오류:", err);
    }
  };
  // 공지사항 게시글 작성
  const createBbsForNotice = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const req = { title, content };

    try {
      const response = await axios.post("/api/admin/notice", req, { headers });
      const noticeId = response.data.id;

      if (noticeId) {
        fileUpload(noticeId); // 파일 업로드 실행
        alert("새로운 공지사항 게시글을 성공적으로 등록했습니다 :D");
        // 상태 리셋
        setTitle("");
        setContent("");
        setFiles([]);
        navigate("/admin/notice");
      } else {
        alert("공지사항 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("공지사항 게시글 작성 오류:", err);
    }
  };

  // 질문 게시글 작성
  const createBbsForQuestion = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const req = { title, content };

    try {
      const response = await axios.post("/api/admin/question", req, {
        headers,
      });
      const questionId = response.data.id;

      if (questionId) {
        alert("새로운 질문 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/admin/onlineCounselDetail`);
      } else {
        alert("질문 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("질문 게시글 작성 오류:", err);
    }
  };
  const handleSubmit = () => {
    console.log("postType 값:", postType); // 디버깅 로그 추가
    if (postType === 1) {
      createBbsForNotice(); // 공지사항 게시글 작성
    } else if (postType === 2) {
      createBbsForQuestion(); // 질문 게시글 작성
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={!title || !content} // 제목이나 내용이 비어있으면 버튼 비활성화
    >
      작성 완료
    </Button>
  );
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
export default Write;
