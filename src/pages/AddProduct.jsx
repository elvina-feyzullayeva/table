import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = ({ setProducts }) => {
  const { id } = useParams()
  const navigate = useNavigate();
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
      .then(data => setFormData(data))
  }



  const handleSubmit = (e) => {
    try {
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
          .then(data => {
            setProducts(prev => [
              ...prev,
              { ...data, id: Date.now() }
            ]);

            navigate("/");
          });
      }
    } catch (error) {

    }
  }
  const handleAddImage = () => {
    if (!imageInput) return;

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageInput]
    }));

    setImageInput("");
  };
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
          <TextField className="text-field" name="title" label="Product Name" value={formData.title} onChange={handleChange} />
          <TextField
            label="Description"
            multiline
            rows={4}
          />
          <TextField className="text-field" name="brand" label="Brand" value={formData.brand} onChange={handleChange} />
          <TextField
            id="outlined-select-category"
            select
            name="category"
            label="Select"
            defaultValue="beauty"
            helperText="Please select product's category"
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
          <TextField className="text-field" name="price" label="Price" value={formData.price} onChange={handleChange} />
          <TextField className="text-field" name="discountPercentage" label="Discount" value={formData.discountPercentage} onChange={handleChange} />
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100ch' } }}
          noValidate
          autoComplete="off">
          <h3>Inventory:</h3>
          <TextField className="text-field" name="stock" label="Stock Quantity" value={formData.stock} onChange={handleChange} />
          <TextField className="text-field" name="minimumOrderQuantity" label="Minimum Order Quantity" value={formData.minimumOrderQuantity} onChange={handleChange} />
          <TextField
            id="outlined-select-availability"
            select
            label="Availability Status"
            name="availabilityStatus"
            defaultValue="in stock"
            helperText="Please select product's availability"
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
          <TextField className="text-field" name="weight" label="Weight" value={formData.weight} onChange={handleChange} />
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
          noValidate
          autoComplete="off">
          <h3>Shipping & Warranty:</h3>
          <TextField className="text-field" name="shippingInformation" label="Shipping Information" value={formData.shippingInformation} onChange={handleChange} />
          <TextField className="text-field" name="warrantyInformation" label="Warranty Information" value={formData.warrantyInformation} onChange={handleChange} />
          <TextField className="text-field" name="returnPolicy" label="Return Policy" value={formData.returnPolicy} onChange={handleChange} />
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
};

export default AddProduct;