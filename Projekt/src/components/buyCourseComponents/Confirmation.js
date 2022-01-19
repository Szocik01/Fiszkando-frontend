import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Confirmation = () => {
  const uid = useParams().uid;
  const auth = useSelector((state) => state.autoIndentification);

  const grantAccessHandler = async () => {
    const res = await fetch("http://localhost:8080/grant-payment-access", {
      method: "POST",
      body: JSON.stringify({ uid: uid }),
      headers: {
        uid: auth.uid,
        token: auth.token,
        remeberMe: auth.remeberMe,
        "Content-Type": "application/json",
      },
    });
    const parsedRes = await res.json();
    console.log(parsedRes);
  };

  useEffect(() => {
    grantAccessHandler();
  }, []);

  return <></>;
};

export default Confirmation;
