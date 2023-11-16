import ButtonStyled from "../../shared/components/ButtonStyled";
import Column from "../../shared/components/Column";
import InputFieldCustom from "../../shared/components/input-field-cutom";

import Row from "src/application/shared/components/Row";

import ball from "src/assets/brand/ball.png";
import logoWithoutBall from "src/assets/brand/logo-without-ball.png";

import azamTvLogo from "src/assets/partners/aztv.png";
import nbcLogo from "src/assets/partners/nbc_logo.png";
import tbcLogo from "src/assets/partners/tbc_logo.png";

import { motion } from "framer-motion";
import useLogin from "./loginHook";
import Label from "src/application/shared/components/Label";

const Login = () => {
  const loginHook = useLogin();

  return (
    <Row className="flex-col lg:flex-row">
      <Column
        a_center
        j_center
        style={{
          backgroundColor: "#031D4D",
          width: "100%",
          gap: 50,
        }}
        className="min-h-[70vh] lg:min-h-[100vh]"
      >
        <Column
          style={{
            gap: 0,
            position: "relative",
            width: "fit-content",
            marginRight: 30,
          }}
        >
          <img
            src={logoWithoutBall}
            alt=""
            className="h-[100px] md:h-[150px] lg:h-[200px] ml-[30px]"
          />
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: 359 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0,
              ease: "linear",
            }}
            src={ball}
            alt=""
            className="ml-[5px] h-[20px] md:h-[30px] md:ml-[-2px] lg:h-[45px] lg:ml-[-10px] absolute bottom-0 left-[50%] translate-x-[-50%] justify-self-center "
          />
        </Column>

        <Column style={{ color: "#fff" }}>
          <Label xBold xLarge text={"Welcome to NPL"} />
          <Label text={"Administration dashboard"} />
        </Column>

        <Row
          j_center
          a_center
          gap={10}
          style={{
            width: "fit-content",
            paddingInline: 30,
            paddingBlock: 10,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          {[azamTvLogo, nbcLogo, tbcLogo].map((logo, index) => (
            <img key={index} src={logo} alt="" style={{ height: 50 }} />
          ))}
        </Row>
      </Column>

      <Column
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          width: "100%",
        }}
      >
        <Row
          style={{
            backgroundColor: "tomato",
            padding: 50,
          }}
        >
          <Label color={"white"} xLarge xBold text={"Login"} />
        </Row>
        <Column
          j_center
          style={{ paddingInline: 50, height: "100%", flexGrow: 1 }}
        >
          {loginHook.fieldValues.map((val, index) => (
            <InputFieldCustom
              key={index}
              label={val.label}
              type={val.type}
              placeholder={val.placeHolder}
              value={val.value}
              setter={val.setter}
              letterSpacing={3}
              required
            />
          ))}
          <Label a_s_left text={"Forgot password ?"} />
          <ButtonStyled
            className="px-4 mt-3"
            onClick={loginHook.handleLogin}
            style={{
              backgroundColor: loginHook.loading ? "#DEDEDE" : "",
              color: loginHook.loading ? "grey" : "",
              cursor: loginHook.loading ? "not-allowed" : "",
            }}
            disabled={loginHook.loading}
          >
            {loginHook.loading ? "Signing in..." : "Sign in"}
          </ButtonStyled>
        </Column>
      </Column>
    </Row>
  );
};

export default Login;
