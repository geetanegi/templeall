import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PplHD08w9GCuelEDGnoqZaYuUHrKTC0jR3Na4KDSZ8JSqvcL08Dgcn6Pkth2I6JcDHXD2vUIlB8pIF7xH3K7yo900LZFp4EVi",
);

// const StripeIntegration: React.FC = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default StripeIntegration;

interface StripeIntegrationProps {
  children?: React.ReactNode;
}

const StripeIntegration: React.FC<StripeIntegrationProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children ? children : <CheckoutForm />}
    </Elements>
  );
};

export default StripeIntegration;
