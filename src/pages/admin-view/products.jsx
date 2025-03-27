import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/comman/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProductt,
  deleteProdut,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "./../../components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadinState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setOpenCreateProductsDialog(false);
              setCurrentEditedId(null);
              toast.success("Product Edited Successfully");
            }
          }
        )
      : dispatch(
          addNewProductt({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product Added Successfully");
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    console.log("Delete");
    dispatch(deleteProdut(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product Deleted Successfully");
      }
    });
  }

  function isFormValid() {
    const requiredFields = [
      "title",
      "description",
      "category",
      "brand",
      "price",
      "totalStock",
    ];
    return requiredFields.every((key) => formData[key] !== "");
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end ">
        <Button
          className="cursor-pointer"
          onClick={() => {
            setOpenCreateProductsDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className=" overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadinState={imageLoadinState}
            isEditMode={currentEditedId !== null}
          />
          <div className="px-6 py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
