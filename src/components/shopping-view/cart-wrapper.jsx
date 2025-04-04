import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserCartWrapper() {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-5 m-4">Mohamed</div>
      <div className="mt-5 m-4 ">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
        <Button className="w-full mt-5">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
