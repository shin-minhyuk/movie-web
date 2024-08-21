import { useSelector } from "react-redux";

export default function Login() {
  const modal = useSelector((state) => state.modal);

  return (
    <>
      {modal ? (
        <div className="login_container">
          <div className="login_inner">
            <div className="login_modal">
              <h1>
                Min<span style={{ color: "red" }}>Flix</span>
              </h1>
              <input
                type="email"
                placeholder="이메일을 작성해주세요"
                name="email"
              />
              <input
                placeholder="비밀번호를작성해주세요"
                type="password"
                name="password"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
