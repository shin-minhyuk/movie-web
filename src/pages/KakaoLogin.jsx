import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userSlice } from "../RTK/uesrSlice";
import { client } from "../Client/client";

function KakaoLogin() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { VITE_KAKAO_REDIRECT_URI, VITE_KAKAO_REST_API_KEY } = import.meta.env;

  useEffect(() => {
    try {
      const fetchKakaoPost = async () => {
        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: VITE_KAKAO_REST_API_KEY,
            redirect_uri: VITE_KAKAO_REDIRECT_URI,
            code: CODE,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        const { access_token, refresh_token } = response.data;
        localStorage.setItem("KAKAO_ACCESS_TOKEN", access_token);
        navigate("/");
        dispatch(userSlice.actions.setIsUser(true));
        console.log(access_token);

        const userResponse = await axios.get(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(userResponse);
        const userInfo = userResponse.data;
        dispatch(userSlice.actions.setKakaoLogin(userInfo));
      };
      fetchKakaoPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <></>;
}

export default KakaoLogin;
