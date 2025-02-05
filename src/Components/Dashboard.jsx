import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "../features/uiSlice";
import MovingCounter from "./Counter";
import RichTextEditor from "./RichTextEditor";
import UserForm from "./UserForm";
import ChartComponent from "./ChartComponent";
import { Container, Grid, Paper, Typography, Modal, Box } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
const user = "Umesh";
  const openModalComponent = useSelector((state) => state.ui.openModal);

  const handleOpen = (component) => dispatch(openModal(component));
  const handleClose = () => dispatch(closeModal());

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Grid container spacing={3}>
        {[{ comp: MovingCounter, label: "Counter" },
          { comp: RichTextEditor, label: "Rich Text Editor" },
          { comp: UserForm, label: "User Form" },
          { comp: ChartComponent, label: "User Trends" }].map(({ comp: Component, label }, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper sx={{ p: 2, cursor: "pointer" }} onClick={() => handleOpen(Component)}>
              <Typography variant="h6" align="center">{label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal open={Boolean(openModalComponent)} onClose={handleClose}>
        <Box sx={modalStyle}>{openModalComponent && React.createElement(openModalComponent)}</Box>
      </Modal>
    </Container>
  );
};

export default Dashboard;
