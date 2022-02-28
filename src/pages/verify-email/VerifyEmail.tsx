import React from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "ui/buttons/MainButton";
import { MainInput } from "ui/inputs/MainInput";
import { emailRegex, checkEmail } from "lib/apis";
import { useUserEmail, useUserName } from "hooks/hooks";

export function VerifyEmailPage() {
   const navigate = useNavigate();
   const [userEmail, setUserEmail] = useUserEmail();
   const [userName, setUserName] = useUserName();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;

      if (!email) return alert("Ingrese un email");
      if (!emailRegex.test(email)) return alert("Por favor ingrese un email válido");

      const response = await checkEmail(email);

      if (response) {
         setUserEmail({
            email: response.email,
         });

         setUserName({
            fullname: response.fullname,
         });

         navigate("/login");
      } else {
         const result = window.confirm("El emial no existe ¿desea registrarse?");
         if (result) {
            setUserEmail({
               email: email,
            });

            navigate("/my-data");
         }
      }
   };

   return (
      <div>
         <h1>Verify Email</h1>
         <form onSubmit={handleSubmit}>
            <MainInput label={"Emial"} name={"email"} />
            <MainButton>Siguiente</MainButton>
         </form>
      </div>
   );
}