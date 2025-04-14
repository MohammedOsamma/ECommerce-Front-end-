import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../comman/form";

const initialFormData = {
  status: "",
};
const AdminOrderDetailsView = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  function handleUpdateStatus(e) {
    e.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Id </p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Date </p>
            <Label>27/06/2024</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Price </p>
            <Label>$1000</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Status </p>
            <Label>In Process</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Order Details</p>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between ">
                <span>Product One </span>
                <span>$1000</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shopping Info</div>
            <div className="grid gap-0.5 text-muted-foreground ">
              <span>Mohamed Osama</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
