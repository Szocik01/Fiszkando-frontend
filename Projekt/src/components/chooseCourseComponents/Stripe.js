import { loadStripe } from "@stripe/stripe-js";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51JyxVpGlGt0q5M6Y87GrlfoMQ7crF9vX1DwO4V3d2qINTdc06XyzxrBtxyyTkMEhPNr2j7PPhF6Vgc5eNAtSWKAJ00oBYoNl7H"
);

const Stripe = () => {
  const auth = useSelector((state) => state.autoIndentification);
  const products = useSelector((s) => s.basket);
  const [loading, setLoading] = useState(true);

  console.log(products)

  const fetchSecretKey = async () => {
    setLoading(true);
    const prodIds = products.items.map((p) => {
      console.log(p.id)
      return p.id});
    console.log(prodIds);
    try {
      const res = await fetch("http://localhost:8080/get-checkout", {
        method: "POST",
        body: JSON.stringify({ products: prodIds }),
        headers: {
          uid: auth.uid,
          token: auth.token,
          remeberMe: auth.remeberMe,
          "Content-Type": "application/json",
        },
      });
      const parsRes = await res.json();
      if (res.ok) {
        console.log(parsRes);
        redirectToStripeHandler(parsRes.sessionKey);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const redirectToStripeHandler = async (key) => {
    const stripe = await stripePromise;
    stripe.redirectToCheckout({
      sessionId: key,
    });
  };

  useEffect(() => {
    fetchSecretKey();
  }, []);

  return <>{loading && <LoadingSpinner />}</>;
};

export default Stripe;
