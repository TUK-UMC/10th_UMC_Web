import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
    const getData = async () => {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
    };
    getData();
    }, []);

    return <div className="text-white">{data?.data.name}님의 페이지입니다.</div>;
};

export default MyPage;