import DenseTable from '../components/Table';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({products, setProducts}) => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')

  const deleteItem = (id) => {
    const newItems = products.filter(item => item.id !== id)
    setProducts(newItems)
  }

  return (
    <div className="page">
      <div className="buttons">
        <input type="text" placeholder="Search by category..." onChange={(e) => setCategory(e.target.value)} />
        <Button variant="contained" onClick={()=>navigate('/product/')}>
          + Add product
        </Button>
      </div>
      {products && <DenseTable products={products} deleteItem={deleteItem} category={category} />}
    </div>
  )

}

export default Home;