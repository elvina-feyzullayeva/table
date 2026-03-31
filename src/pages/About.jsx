import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const About = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams()
  const getItem = () => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
  }
  useEffect(() => {
    getItem()
  }, [id])
  if (!item) return <p>Loading...</p>;

  return (
    <div className='about-page'>
      {item.images && <div className="image">
        <img src={item.images[0]} alt="" />
      </div>}
      <div className="product-info">
        <h1 className="title">{item.title}</h1>
        <p><b>Category:</b> {item.category}</p>
        {item.brand && <p><b>Brand:</b> {item.brand}</p>}
        <p><b>Description:</b> {item.description}</p>
        <p><b>Price:</b> {item.price} $</p>
        <p><b>Discount Percentsge:</b> {item.discountPercentage} %</p>
        <p><b>Rating: </b>{item.rating} <i class="fa-solid fa-star"></i></p>
        <p><b>In stock:</b> {item.stock} items</p>
        <p><b>Weight:</b> {item.weight}</p>
        <p><b>Dimensions:</b> {item.dimensions?.width} x {item.dimensions?.height} x {item.dimensions?.depth}</p>
        <p><b>Warranty:</b> {item.warrantyInformation}</p>
        <p><b>Shipping:</b> {item.shippingInformation}</p>
        <p><b>Availability Status:</b> {item.availabilityStatus}</p>
        <p><b>Return Policy:</b> {item.returnPolicy}</p>
        <p><b>Minimum order quantity:</b> {item.minimumOrderQuantity}</p>
      </div>
      <h2>Reviews</h2>
      {item.reviews && <div className="reviews">
        <div className="review">
          <p className="rate"><b>Rating:</b> {item.reviews[0].rating} / 5 <i class="fa-solid fa-star"></i></p>
          <p className="comment">{item.reviews[0].comment}</p>
          <p className="date">{item.reviews[0].date}</p>
          <p className="user-name">{item.reviews[0].reviewerName}</p>
          <p className="email">{item.reviews[0].reviewerEmail}</p>
        </div>
        <div className="review">
          <p className="rate"><b>Rating:</b> {item.reviews[1].rating} / 5 <i class="fa-solid fa-star"></i></p>
          <p className="comment">{item.reviews[1].comment}</p>
          <p className="date">{item.reviews[1].date}</p>
          <p className="user-name">{item.reviews[1].reviewerName}</p>
          <p className="email">{item.reviews[1].reviewerEmail}</p>
        </div>
        <div className="review">
          <p className="rate"><b>Rating:</b> {item.reviews[2].rating} / 5 <i class="fa-solid fa-star"></i></p>
          <p className="comment">{item.reviews[2].comment}</p>
          <p className="date">{item.reviews[2].date}</p>
          <p className="user-name">{item.reviews[2].reviewerName}</p>
          <p className="email">{item.reviews[2].reviewerEmail}</p>
        </div>
      </div>}
    </div>

  )
}

export default About;