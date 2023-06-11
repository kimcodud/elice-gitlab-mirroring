import LoginPageComponent from "../../components/LoginPage/LoginPage";
import Google from "../../components/LoginPage/Google";
import Kakao from "../../components/LoginPage/Kakao";
function LoginPage() {
  return (
    <>
      <LoginPageComponent />
      <Google />
      <Kakao />
    </>
  );
}
export default LoginPage;
