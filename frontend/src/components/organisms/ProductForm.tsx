"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useProductStore from "@/lib/store/productStore";
import { Product, ProductFormProps } from "@/types/product";
import FormField from "@/components/atoms/FormField";
import { productSchema } from "@/constants/productSchema";

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave = () => {},
  onCancel,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const initialValues: Product = product || {
    id: 0,
    name: "",
    description: "",
    price: 0,
    availableStock: 0,
  };

  const handleSubmit = (values: Product, { resetForm }: any) => {
    if (product) {
      updateProduct(values.id, values);
    } else {
      createProduct(values);
    }
    resetForm();
    setIsFormVisible(false);
    onSave(values);
  };

  useEffect(() => {
    if (product) {
      setIsFormVisible(true);
    }
  }, [product]);

  return (
    <div>
      {!product && (
        <Button
          onClick={() => setIsFormVisible(true)}
          variant="outlined"
          color="primary"
        >
          Add Product
        </Button>
      )}
      <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)}>
        <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          {product
            ? "Update the details below to edit the product."
            : "Fill in the details below to add a new product."}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(productSchema)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form className="space-y-4 mt-4">
                <FormField
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  label="Name"
                  required
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name ? errors.name : undefined}
                />
                <FormField
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  label="Description"
                  required
                  error={touched.description && Boolean(errors.description)}
                  helperText={
                    touched.description ? errors.description : undefined
                  }
                />
                <FormField
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  label="Price"
                  required
                  min="0.01"
                  step="0.01"
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price ? errors.price : undefined}
                />
                <FormField
                  name="availableStock"
                  type="number"
                  value={values.availableStock}
                  onChange={handleChange}
                  label="Available Stock"
                  required
                  min="0"
                  error={
                    touched.availableStock && Boolean(errors.availableStock)
                  }
                  helperText={
                    touched.availableStock ? errors.availableStock : undefined
                  }
                />

                <DialogActions>
                  <Button
                    onClick={() => {
                      setIsFormVisible(false);
                      onCancel && onCancel();
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {product ? "Update Product" : "Add Product"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
