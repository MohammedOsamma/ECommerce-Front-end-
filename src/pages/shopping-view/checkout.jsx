import React, { useState } from "react";
import image from "../../assets/banner-1.webp";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();

  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        // addressId: currentSelectedAddress?._id,
        // address: currentSelectedAddress?.address,
        // city: currentSelectedAddress?.city,
        // pincode: currentSelectedAddress?.pincode,
        // phone: currentSelectedAddress?.phone,
        // notes: currentSelectedAddress?.notes,
        addressId: "123456",
        address: "123 Main St",
        city: "New York",
        pincode: "10001",
        phone: "1234567890",
        notes: "Leave at the front door",
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
      if (data.payload.approvalURL) {
        window.location.href = data.payload.approvalURL;
      }
    });
  }

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          className="w-full h-full object-center object-cover"
          src={image}
          alt="accountImage"
        />
      </div>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4 w-2xl">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              Checkout With Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
