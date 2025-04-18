import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/products-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.success(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart successfully");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[90vw] lg:max-w-[60vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-.5">
              <StarIcon className="fill-primary w-5 h-5" />
              <StarIcon className="fill-primary w-5 h-5" />
              <StarIcon className="fill-primary w-5 h-5" />
              <StarIcon className="fill-primary w-5 h-5" />
              <StarIcon className="fill-primary w-5 h-5" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5 ">
            {productDetails?.totalStock === 0 ? (
              <Button
                className="w-full opacity-60 cursor-not-allowed"
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full "
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Mohamed Osama</h3>
                  </div>

                  <div className="flex items-center gap-.5">
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Mohamed Osama</h3>
                  </div>

                  <div className="flex items-center gap-.5">
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Mohamed Osama</h3>
                  </div>

                  <div className="flex items-center gap-.5">
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                    <StarIcon className="fill-primary w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5  flex gap-2 ">
              <Input
                className=" focus-visible:ring-[0px]"
                placeholder="Write a Review ..."
              />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
