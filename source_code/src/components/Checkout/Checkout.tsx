import React from "react";
import cardType from "../../assets/images/Mastercard.png";

const CheckoutCard: React.FC = () => {
  return (
    <div>
      <div className="space-y-2 border-t py-1">
        <p className="text-gray-600"> Card Details</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="savedCard"
              type="radio"
              value="savedCard"
              name="paymentDetails"
              className="h-5 w-5"
              // checked={selectedPaymentMethod === "credit_card"}
              // onChange={() => setSelectedPaymentMethod("credit_card")}
            />
            <label
              htmlFor="savedCard"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ICICI Bank Credit Card
              <p className="flex items-center justify-between text-xs text-gray-500">
                **1615
                <img src={cardType} alt="" className="px-2 text-xs" />|
                <span className="px-2 text-xs">Michael DeTizio</span>
              </p>
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="new-credit-card"
              type="radio"
              value="new-credit-card"
              name="paymentDetails"
              className="h-5 w-5"
              // checked={selectedPaymentMethod === "credit_card"}
              // onChange={() => setSelectedPaymentMethod("credit_card")}
            />
            <label
              htmlFor="new-credit-card"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Add New Credit Card
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <label htmlFor="Name-on-card" className="text-gray-500">
              Name on Card:
            </label>
            <input
              type="text"
              name="Name-on-card"
              placeholder="Name on Card"
              id="Name-on-card"
              // value=""
              // onChange=""
              // onBlur=""
              className="w-full rounded-md border-2 border-gray-200 px-2 py-1.5 outline-none"
            />
          </div>
          <div className="relative space-y-1">
            <label htmlFor="card-number" className="text-gray-500">
              Card Number:
            </label>
            <input
              type="text"
              name="card-number"
              placeholder="Card Number"
              id="card-number"
              // value=""
              // onChange=""
              // onBlur=""
              className="w-full rounded-md border-2 border-gray-200 px-2 py-1.5 pr-7 outline-none"
            />
            <img
              src={cardType}
              alt=""
              className="absolute right-2 top-11 -translate-y-1/2"
            />
          </div>
          <div className="flex items-center justify-between space-y-1">
            <div className="">
              <label htmlFor="Name-on-card" className="block text-gray-500">
                Expiry Date:
              </label>
              <select
                name="expirationDate"
                id="exp-date"
                className="rounded-md border-2 border-gray-200 px-2 py-1.5 outline-none"
              >
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
              </select>
              <select
                name="expirationDate"
                id="exp-date"
                className="mx-2 rounded-md border-2 border-gray-200 px-2 py-1.5 outline-none"
              >
                <option value="1">2030</option>
                <option value="2">2031</option>
                <option value="3">2032</option>
                <option value="4">2033</option>
                <option value="5">2034</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="CVV" className="block text-gray-500">
                CVV:
              </label>
              <input
                type="text"
                name="CVV"
                placeholder="CVV"
                id="CVV"
                // value=""
                // onChange=""
                // onBlur=""
                className="w-14 rounded-md border-2 border-gray-200 px-2 py-1.5 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
