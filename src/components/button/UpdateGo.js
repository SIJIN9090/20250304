import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HttpHeadersContext } from "../../context"; // HttpHeadersContext import

function UpdateGo() {
  const { setHeaders } = useContext(HttpHeadersContext); // setHeaders 가져오기
  const { noticeId } = useParams(); // useParams로 noticeId 받기
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(null); // notice 상태 추가

  // 게시글 상세 데이터를 가져오는 함수
  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/notice/${noticeId}`);
      setNotice(response.data); // 받아온 데이터를 notice 상태에 저장
    } catch (error) {
      console.error("getBbsDetail() error:", error);
    }
  };

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    getBbsDetail();
  }, [noticeId, setHeaders]);

  useEffect(() => {
    if (location.state) {
      setNotice(location.state.bbs); // location.state로 전달된 notice가 있으면 상태로 설정
    }
  }, [location.state]);

  const handleEditClick = () => {
    navigate(`/admin/notice/${noticeId}/update`, { state: { bbs: notice } });
  };

  return <Button onClick={handleEditClick}>수정</Button>;
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
export default UpdateGo;
