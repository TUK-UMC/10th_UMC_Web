import { data } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList.ts";

const MainPage = () => {
  const {data : ResponseLpListDto | undefined, isPending:boolean, isError:boolean} = useGetLpList({});

  return <div>{data?.data.data.map((lp) => <h1>{lp.title}</h1>)}</div>;
};

export default MainPage;
