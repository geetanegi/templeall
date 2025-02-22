// import React from "react";
// import { Formik, Form, FormikHelpers } from "formik";
// import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";

// import FormikControl from "../Formik/components/FormikControl";
// import * as Yup from "yup";

// interface FormValues {
//   name: string;
//   email: string;
// }

// const CheckoutForm: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const initialValues: FormValues = {
//     name: "",
//     email: "",
//   };

//   const handleSubmit = async (
//     values: FormValues,
//     { setSubmitting }: FormikHelpers<FormValues>,
//   ) => {
//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (cardElement) {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//         billing_details: {
//           name: values.name,
//           email: values.email,
//         },
//       });

//       if (error) {
//         console.error("Error:", error);
//       } else {
//         console.log("PaymentMethod:", paymentMethod);

//         // // Send paymentMethod.id to your backend for further processing
//         // const response = await fetch('/create-payment-intent', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     body: JSON.stringify({
//         //         paymentMethodId: paymentMethod.id,
//         //         amount: 1000, // The amount to be charged in cents
//         //     }),
//         // });

//         // const paymentIntentResponse = await response.json();

//         // // Confirm the payment with the client secret
//         // const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
//         //     paymentIntentResponse.clientSecret
//         // );
//       }
//     }

//     setSubmitting(false);
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name on card is required"),
//     email: Yup.string().required("Email on card is required"),
//   });

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={validationSchema}
//     >
//       {({ isSubmitting }) => (
//         <Form className="w-full">
//           <div>
//             <FormikControl
//               label="Name on Card"
//               name="name"
//               id="name"
//               control="input"
//               className="w-full"
//               placeholder="Enter Your Name"
//               type="text"
//             />
//           </div>
//           <div>
//             <FormikControl
//               label="Email"
//               name="email"
//               id="email"
//               control="input"
//               className="w-full"
//               placeholder="Enter Your email"
//               type="text"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="cardElement">Card Details</label>
//             <CardElement id="cardElement" className="rounded border-2 p-4" />
//           </div>
//           <button
//             type="submit"
//             disabled={!stripe || isSubmitting}
//             className="mt-6 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
//           >
//             Pay here
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CheckoutForm;
