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
      const response = await axios.post("/api/question", req, {
        headers,
      });
      const questionId = response.data.id;

      if (questionId) {
        alert("새로운 질문 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/onlineCounselDetail`);
      } else {
        alert("질문 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("질문 게시글 작성 오류:", err);
    }
  };
  const postTypeHandlers = {
    1: createBbsForNotice,
    2: createBbsForQuestion,
    // 3: createBbsForAnswer,
    // 4: createBbsForArticle,
  };

  // handleSubmit 함수
  const handleSubmit = () => {
    const handler = postTypeHandlers[postType];
    if (handler) {
      handler(); // 해당하는 handler 실행
    } else {
      console.error("지원되지 않는 postType 값입니다.");
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
