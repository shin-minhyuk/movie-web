export default function Login() {
  return (
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
            type="password"
            placeholder="비밀번호를 작성해주세요"
            name="password"
          />
        </div>
      </div>
    </div>
  );
}
