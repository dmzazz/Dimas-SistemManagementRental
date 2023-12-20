import React, { useState } from "react";

// Import from Material UI
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Import from React Icon
import { RiAddBoxLine } from "react-icons/ri";

// Import Modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const Inventory = () => {
  const columns = [
    { id: "id", label: "ID", minWidth: 70 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 70,
    },
    {
      id: "purchasePrice",
      label: "Purchase Price",
      minWidth: 100,
    },
    {
      id: "sellingPrice",
      
      label: "Selling Price",
      minWidth: 100,
    },
    {
      id: "category",
      label: "Category",
      minWidth: 100,
    },
    {
      id: "supplier",
      label: "Supplier",
      minWidth: 100,
    },
    {
      id: "entryDate",
      label: "Entry Date",
      minWidth: 100,
    },
    {
      id: "changeDate",
      label: "Change Date",
      minWidth: 100,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
    },
  ];

  function createData(id, name, quantity, purchasePrice, sellingPrice, category, supplier, entryDate, changeDate, action) {
    return { id, name, quantity, purchasePrice, sellingPrice, category, supplier, entryDate, changeDate, action };
  }

  const rows = [
    createData(
      "PI001",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "PI002",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "PI003",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "PT001",
      "Telkomsel",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Telkomsel",
      "Telkomsel",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "PT001",
      "Telkomsel",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Telkomsel",
      "Telkomsel",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "PT001",
      "Telkomsel",
      100,
      "Rp10.000",
      "Rp15.000",
      "Perdana Telkomsel",
      "Telkomsel",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "VI001",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Voucher Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "VI001",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Voucher Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
    createData(
      "VI001",
      "Indosat",
      100,
      "Rp10.000",
      "Rp15.000",
      "Voucher Indosat",
      "Indosat",
      "17 March 2023, 7:13 PM",
      "18 March 2023, 10:13 PM",
      <>
        <div className="flex">
          <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
          <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
        </div>
      </>
    ),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styleModalForm = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
  };

  return (
    <>
      <div className="h-full">
        <div className="bg-white w-11/12 mx-auto mt-10 border rounded">
          <div className="flex justify-between items-center p-3">
            {/* Left */}
            <h2 className="text-lg text-[#0A2647] font-semibold">Inventory</h2>

            {/* Right */}
            <div className="flex">
              <input type="search" className="border-2 border-[#A9A9A9] rounded-md p-1 mr-2 focus:border-black focus:outline-none"></input>
              <button onClick={handleOpen} className="flex items-center bg-[#29A19C] text-white p-2 rounded-lg hover:bg-[#7ED7C1] hover:cursor-pointer duration-300">
                <RiAddBoxLine size={22} className="mr-1" />
                Add Inventory
              </button>
            </div>
          </div>

          {/* Table Data */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{backgroundColor: "#29A19C"}} className="border border-slate-300">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} className="border">
                              {column.format && typeof value === "number" ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </div>
      </div>

      {/* Modal Add Inventory */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={styleModalForm}>
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ background: "#29A19C", padding: 2, color: "#fff", borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                Add Inventory
              </Typography>

              {/* Input Form */}
              <div className="flex flex-wrap px-2">
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField label="ID" id="outlined-start-adornment" sx={{ m: 1, width: "10ch" }} />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField label="Name" id="outlined-start-adornment" sx={{ m: 1, width: "61ch" }} />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField label="Quantity" id="outlined-start-adornment" sx={{ m: 1, width: "10ch" }} />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    label="Purchase Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "41ch" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                    }}
                  />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    label="Selling Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "42ch" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                    }}
                  />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField label="Category" id="outlined-start-adornment" sx={{ m: 1, width: "41ch" }} />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField label="Supplier" id="outlined-start-adornment" sx={{ m: 1, width: "42ch" }} />
                </Typography>
              </div>
              <Button size="large" sx={{ backgroundColor: "#29A19C", color: "#fff", marginTop: 1, marginBottom: 2, marginRight: 3, float: "right", ":hover": { backgroundColor: "#7ED7C1" } }}>
                Submit
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Inventory;
