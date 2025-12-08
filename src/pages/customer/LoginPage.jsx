import { useLogin } from "@/hooks/useLogin";

function LoginPage() {
  const login = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="ایمیل" />
      <input name="password" type="password" placeholder="رمز" />
      <button disabled={login.isPending}>ورود</button>

      {login.error && <p>{login.error.message}</p>}
    </form>
  );
}
export default LoginPage;