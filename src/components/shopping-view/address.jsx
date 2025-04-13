import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../comman/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const dispatch = useDispatch();

  function handleManageAddress(e) {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.info("You can add max 3 addresses");

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully!");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address added successfully!");
          }
        });
  }

  function handleDeleteAdress(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast.success("Address delete successfully!");
      }
    });
  }

  function handleEditAdress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      pincode: getCurrentAddress?.pincode || "",
      notes: getCurrentAddress?.notes || "",
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {addressList.map((singleAddressItem) => (
          <AddressCard
            addressInfo={singleAddressItem}
            handleDeleteAdress={handleDeleteAdress}
            handleEditAdress={handleEditAdress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            selectedId={selectedId}
          />
        ))}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          formControls={addressFormControls}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
