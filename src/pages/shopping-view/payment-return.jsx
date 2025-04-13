import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaymentReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("token");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data.payload.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/paypal-success";
        }
      });
    }
  }, [dispatch, paymentId, payerId]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment ... Please Wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaymentReturnPage;
