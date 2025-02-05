import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { setUserData } from "../features/userSlice";
import { useDispatch } from "react-redux";

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    userId: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = uuidv4();
    const userData = { ...formData, userId: newUserId };

    dispatch(setUserData(userData));
    Swal.fire({
      title: "Success!",
      text: "Your data has been successfully submitted.",
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      userId: "",
    });
    setIsFormChanged(false);
  };

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (isFormChanged) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormChanged]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Registration Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;
