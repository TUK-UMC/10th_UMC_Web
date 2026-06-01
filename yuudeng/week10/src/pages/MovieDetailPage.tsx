import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="app">
      영화 상세 페이지입니다.
      <h1>유뎅</h1>
      <h1>{id}번 영화 상세 페이지를 패칭합니다.</h1>
    </div>
  );
}
