import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { TablePagination } from '@mui/material';




export default function DenseTable({ products, deleteItem, category }) {
  const navigate = useNavigate()
  const filteredItems = category ? products.filter(item => item.category.includes(category.toLowerCase())) : products;
  const [page, setPage]= useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (event, newPage)=>{
    setPage(newPage)
  }
  
  const handleChangeRowsPerPage = (event)=>{
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Image</TableCell>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Title</TableCell>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Category</TableCell>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Stock</TableCell>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Price</TableCell>
            <TableCell sx={{ color: '#1976d2', fontSize: '18px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:nth-of-type(even)': {
                  backgroundColor: '#f9f9f9',
                },
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.images ? <TableCell component="th" scope="row">
                <div className="product-image">
                  <img src={item.images[0]} alt="" />
                </div>
              </TableCell>: <TableCell/>}
              <TableCell sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.price} $</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => navigate(`/about/${item.id}`)}>
                    View
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`/product/${item.id}`)}>
                    Edit
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteItem(item.id)}>
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component = "div"
        count= {filteredItems.length}
        page = {page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </TableContainer>
  );
};

