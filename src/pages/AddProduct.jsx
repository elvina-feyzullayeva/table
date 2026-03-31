import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const AddProduct = ({ setProducts }) => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageInput, setImageInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discountPercentage: "",
    stock: "",
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    minimumOrderQuantity: "",
    images: []
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const getData = () => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setFormData(prev => ({
        ...prev,
        ...data
      })
      ))
  }

  useEffect(() => {
    if (id) {
      getData()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (!id) {
        fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setProducts(prev => [
              ...prev,
              { ...data, id: Date.now() }
            ]);

            navigate("/");
          })
      } else {
        fetch(`https://dummyjson.com/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => setFormData(prev => ({
            ...prev,
            ...data
          })
          ))

        navigate("/");
      };
    }
    catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
      return; // остановить отправку
    }
  };
  const handleAddImage = () => {
    if (!imageInput) return;

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageInput]
    }));

    setImageInput("");
  };

  const validationSchema = yup.object({
    title: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    brand: yup.string().required("Brand is required"),
    category: yup.string().required("Category is required"),

    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),

    discountPercentage: yup
      .number()
      .typeError("Discount must be a number")
      .min(0, "Min 0")
      .max(100, "Max 100"),

    stock: yup
      .number()
      .typeError("Stock must be a number")
      .required("Stock is required"),

    minimumOrderQuantity: yup
      .number()
      .typeError("Must be a number"),

    availabilityStatus: yup.string().required("Select availability"),
    shippingInformation: yup.string().required("Product name is required"),
    weight: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),
    warrantyInformation: yup.string().required("Product name is required"),
    returnPolicy: yup.string().required("Product name is required")



  });

  const categories = [
    {
      value: 'beauty',
      label: 'beauty',
    },
    {
      value: 'fragrances',
      label: 'fragrances',
    },
    {
      value: 'furniture',
      label: 'furniture',
    },
    {
      value: 'groceries',
      label: 'groceries',
    },
  ];
  const availability = [
    {
      value: 'in stock',
      label: 'In stock',
    },
    {
      value: 'out of stock',
      label: 'Out of stock',
    },
  ]
  return (
    <div className="add-product-page">
      <div className="header">
        <h1>Add New Product</h1>
        <Button variant="contained" onClick={handleSubmit}>
          Save Product
        </Button>
      </div>
      <div className="form-page">
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100ch' } }}
          noValidate
          autoComplete="off">
          <h3>Basic info:</h3>
          <TextField className="text-field" name="title" label="Product Name" value={formData.title} onChange={handleChange} error={!!errors.title}
            helperText={errors.title} />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField className="text-field" name="brand" label="Brand" value={formData.brand} onChange={handleChange} error={!!errors.brand} helperText={errors.brand} />
          <TextField
            id="outlined-select-category"
            select
            name="category"
            label="Select"
            defaultValue="beauty"
            error={!!errors.category}
            helperText={errors.category}
            value={formData.category} onChange={handleChange}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
          noValidate
          autoComplete="off">
          <h3>Pricing:</h3>
          <TextField className="text-field" name="price" label="Price" value={formData.price} onChange={handleChange} error={!!errors.price} helperText={errors.price} />
          <TextField className="text-field" name="discountPercentage" label="Discount" value={formData.discountPercentage} onChange={handleChange} error={!!errors.discountPercentage} helperText={errors.discountPercentage} />
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100ch' } }}
          noValidate
          autoComplete="off">
          <h3>Inventory:</h3>
          <TextField className="text-field" name="stock" label="Stock Quantity" value={formData.stock} onChange={handleChange} error={!!errors.stock} helperText={errors.stock} />
          <TextField className="text-field" name="minimumOrderQuantity" label="Minimum Order Quantity" value={formData.minimumOrderQuantity} onChange={handleChange} error={!!errors.minimumOrderQuantity} helperText={errors.minimumOrderQuantity} />
          <TextField
            id="outlined-select-availability"
            select
            label="Availability Status"
            name="availabilityStatus"
            defaultValue="in stock"
            error={!!errors.availabilityStatus}
            helperText={errors.availabilityStatus}
            value={formData.availabilityStatus} onChange={handleChange}
          >
            {availability.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
          noValidate
          autoComplete="off">
          <h3>Product Details:</h3>
          <TextField className="text-field" name="weight" label="Weight" value={formData.weight} onChange={handleChange} error={!!errors.weight} helperText={errors.weight} />
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
          noValidate
          autoComplete="off">
          <h3>Shipping & Warranty:</h3>
          <TextField className="text-field" name="shippingInformation" label="Shipping Information" value={formData.shippingInformation} onChange={handleChange} error={!!errors.shippingInformation} helperText={errors.shippingInformation} />
          <TextField className="text-field" name="warrantyInformation" label="Warranty Information" value={formData.warrantyInformation} onChange={handleChange} error={!!errors.warrantyInformation} helperText={errors.warrantyInformation} />
          <TextField className="text-field" name="returnPolicy" label="Return Policy" value={formData.returnPolicy} onChange={handleChange} error={!!errors.returnPolicy} helperText={errors.returnPolicy} />
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
          noValidate
          autoComplete="off">
          <h3>Images link:</h3>
          <TextField
            label="Image URL"
            name="imageInput"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddImage} sx={{ margin: "10px", padding: "14px 20px" }}>Add Image</Button>
        </Box>
      </div>
    </div>
  );
}



export default AddProduct;