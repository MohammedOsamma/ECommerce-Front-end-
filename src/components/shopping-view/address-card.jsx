import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAdress,
  handleEditAdress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid gap-4">
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between px-5">
        <Button onClick={() => handleEditAdress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAdress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
