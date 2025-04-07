import React from "react";
import image from "../../assets/banner-1.webp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col ">
      <div className="relative w-full h-[300px] overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={image}
          alt="account-image"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background m-2 p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">Orders</TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
