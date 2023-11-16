import { useSetAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import { tokenAtom } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";

const useLogin = () => {
  const navigate = useNavigate();
  const tokenAtomSetter = useSetAtom(tokenAtom);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fieldValues = [
    {
      value: email,
      setter: setEmail,
      type: "email",
      label: "Email (required)",
      placeHolder: "Your Email",
    },
    {
      value: password,
      setter: setPassword,
      type: "password",
      label: "Password (required)",
      placeHolder: "Enter your password",
    },
  ];

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const fieldsCheck = () => {
    if (email === "") {
      toast.error("The email field should not be empty");
      return false;
    }
    if (password === "") {
      toast.error("The password field should not be empty");
      return false;
    }
    return true;
  };

  // const handleLogin = () => navigate("matches");
  const handleLogin = async () => {

    if (!fieldsCheck()) return;

    try {
        setLoading(true);
        let _body = { username:email, password };
        let response = await apiCall({
          url: URLS.adminLogin,
          method: "post",
          body: _body,
        });


        if (response.status === 200) {
          //console.log(response.data,'login response')
          tokenAtomSetter((prev) => {
            return {
              ...prev,
              token: response.data.token,
              name: `${response.data.firstName} ${response.data.lastName}`,
              email: response.data.email,
              phone: response.data.phone,
              position: response.data.position,
            };
          });
          //console.log(response)
          clearFields();
          setLoading(false);
          toast.success('succesfullly login')
          navigate(routeStrings.analytics);
        } else {
          clearFields();
          setLoading(false);
          toast.error("an errror occured in else");
        }
    } catch(err){
        console.log(err)
        toast.error("an errror occured in catch");
        clearFields();
        setLoading(false);
    }

  };

  return {
    handleLogin,
    fieldValues,
    email,
    password,
    loading,
  };
};

export default useLogin;
