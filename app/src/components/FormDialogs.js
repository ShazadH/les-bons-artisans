import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { product, onClick } = props;

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(product);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (editProduct) => {
    axios
      .put(`http://localhost:5000/products/${editProduct._id}`, editProduct)
      .then((res) => {
        setEditProduct(res.data);
      })
      .catch((err) => console.log(err));
    setOpen(false);
    onClick();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Modify
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id={product._id}>{product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify your product</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product's name"
            defaultValue={product.name}
            type="text"
            fullWidth
            onChange={(e) =>
              setEditProduct({ ...product, name: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type"
            defaultValue={product.type}
            type="text"
            onChange={(e) =>
              setEditProduct({ ...product, type: e.target.value })
            }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            defaultValue={product.price}
            type="text"
            onChange={(e) =>
              setEditProduct({ ...product, price: e.target.value })
            }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Rating"
            defaultValue={product.rating}
            onChange={(e) =>
              setEditProduct({ ...product, rating: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Warranty_years"
            defaultValue={product.warranty_years}
            onChange={(e) =>
              setEditProduct({ ...product, warranty_years: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="available"
            defaultValue={product.available}
            onChange={(e) =>
              setEditProduct({ ...product, available: e.target.value })
            }
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleEdit(editProduct)} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
