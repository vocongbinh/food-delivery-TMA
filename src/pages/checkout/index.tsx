// import React from 'react'
import { BackButton } from "@twa-dev/sdk/react";
import { useOrdersContext } from "../../context/orders-context";
import { useTonConnect } from "../../hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";
// import { Address, toNano } from 'ton-core';
import { deployNFT, MetaData } from "../../api/deployNFT";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { MainButton, BottomBar } from "@twa-dev/sdk/react";
import { useRef } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Address, toNano } from "ton-core";
import { mintJetton } from "../../api/mintJetton";

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("Name can not be empty!"),
  address: Yup.string().required("Address can not be empty!"),
  phone: Yup.string().required("Phone can not be empty!"),
});
export interface CheckoutProps {
  address: string;
  name: string;
  phone: string;
}

const CheckoutPage = () => {
  const { orderItems } = useOrdersContext();
  const {sender} = useTonConnect();
  const total = orderItems.reduce(
    (total, item) => total + item.dish.price * item.quantity,
    0
  );
  const { connected } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const initialValues: CheckoutProps = {
    address: "",
    name: "",
    phone: "",
  };
  const handleOrder = async () => {
    console.log(formRef.current?.values);
    formRef.current?.submitForm();
  };
  const handleSubmit = async (values: CheckoutProps) => {
    if (!connected) {
      WebApp.showAlert("Please connect to your wallet!");
      return;
    }
    console.log("fdfsdsdf");

    sender.send({
      value: toNano(total),
      to: Address.parse("0QD0uqZiQwMt2SfZo5OPo5xxr5yJRaZICJg4dKMi3DKTyfne")
    })
    const data: MetaData = {
      orderItems,
      ...values!,
    };

    // console.log(userFriendlyAddress, data);
    await deployNFT(data, userFriendlyAddress);

    await mintJetton(userFriendlyAddress);
  };
  const formRef = useRef<FormikProps<CheckoutProps>>(null);
  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className="w-full h-screen container flex flex-col gap-8 bg-gray-100 py-4">
        <TonConnectButton className="self-end" />
        <div className="flex flex-col relative bg-white py-4 px-8 rounded-2xl ">
          <div className="flex justify-between items-start mb-4 border-b border-[#ccc] pb-3">
            <img
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474102JKE/anh-do-an-chibi-dep_014003970.png"
              className="w-24 h-24"
              alt=""
            />
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold">Food Delivery TMA</span>
              <span className="text-sm text-gray-400">Order food quickly!</span>
            </div>
          </div>
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex gap-2">
                <img
                  src={item.dish.imageUrl}
                  alt=""
                  className="w-12 h-12 rounded-xl"
                />
                <div className="flex flex-col gap-0  items-start">
                  <span className="font-bold">
                    {item.dish.name}{" "}
                    <span className="text-yellow-500 font-bold">
                      {item.quantity}x
                    </span>
                  </span>
                </div>
              </div>
              <span>${item.dish.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col relative bg-white px-8 rounded-2xl">
          <Formik<CheckoutProps>
            initialValues={initialValues}
            validationSchema={CheckoutSchema}
            innerRef={formRef}
            onSubmit={handleSubmit}
          >
            {(FormikState) => {
              const errors = FormikState.errors;
              return (
                <Form className="grid grid-cols-1 gap-4 mt-4">
                  <div className="flex flex-col items-start">
                    <div className="flex w-full justify-between items-center py-3 border-b border-[#ccc]">
                      <span className="text-base font-bold">Address</span>
                      <Field
                        className="text-base"
                        name="address"
                        style={{
                          outline: "none",
                        }}
                        placeholder="Type your address..."
                      />
                    </div>
                    {!!errors.address && (
                      <div className="text-sm text-red-500 mt-1">
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex w-full justify-between items-center py-3 border-b border-[#ccc]">
                      <span className="text-base font-bold">Name</span>
                      <Field
                        className="text-base"
                        name="name"
                        style={{
                          outline: "none",
                        }}
                        placeholder="Type your name..."
                      />
                    </div>
                    {!!errors.name && (
                      <div className="text-sm text-red-500">{errors.name}</div>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex w-full justify-between items-center py-3 border-b border-[#ccc]">
                      <span className="text-base font-bold">Phone</span>
                      <Field
                        className="text-base"
                        name="phone"
                        style={{
                          outline: "none",
                        }}
                        placeholder="Type your phone..."
                      />
                    </div>
                    {!!errors.phone && (
                      <div className="text-sm text-red-500">{errors.phone}</div>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
          <button onClick={handleOrder}>haha</button>
          <BottomBar>
            <MainButton text={`PAY $${total}`} onClick={handleOrder} />
          </BottomBar>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
