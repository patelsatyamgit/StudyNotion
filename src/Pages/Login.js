import loginImg from "../assets/Images/login.webp"
import ProfileDropdown from "../Componets/core/Auth/ProfileDropDown"
import Template from "../Componets/core/Auth/Template"

function Login() {
  return (
    <div className="pt-[10vh]">
       <ProfileDropdown/>
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
      
    </div>
   
  )
}

export default Login