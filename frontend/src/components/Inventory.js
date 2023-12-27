import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Import Auth
import Auth from "../auth/Auth";

const Inventory = () => {
  const [data, setData] = useState(null); //fetchdata
  const [fetchSupplier, setSupplier] = useState(null); // fetch data supplier
  const [fetchStatus, setFetchStatus] = useState(true); //indikator
  const [currentId, setCurrentId] = useState(-1);

  // Handle Success
  const [success, setSuccess] = useState(true);

  // handleError
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  // Handling Input
  const [input, setInput] = useState({
    sku: "",
    name: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    category: "",
    supplierId: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { sku, name, quantity, purchasePrice, sellingPrice, category, supplierId } = input;

    try {
      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:8000/product", { sku, name, quantity, purchasePrice, sellingPrice, category, supplierId });
        setFetchStatus(true);
        setSuccess(result.data.msg);
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      } else {
        // Update Data
        const result = await axios.put(`http://localhost:8000/product/${currentId}`, { sku, name, quantity, purchasePrice, sellingPrice, category, supplierId });
        setFetchStatus(true);
        setSuccess(result.data.msg);
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }

      setInput({
        sku: "",
        name: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
        category: "",
        supplierId: "",
      });

      setCurrentId(-1);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        console.log(error.response);
        setErrorName(errorMessage.msgName);
        setErrorEmail(errorMessage.messageEmail);
        setErrorPhone(errorMessage.messagePhone);
        setTimeout(() => {
          setErrorName(null);
          setErrorEmail(null);
          setErrorPhone(null);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:8000/product");
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    let fetchSupplier = async () => {
      try {
        let result = await axios.get("http://localhost:8000/supplier");
        setSupplier(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchData();
      fetchSupplier();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  // Handling Edit
  const [edit, setEdit] = useState(false);

  const handleEdit = async (id) => {
    console.log(id);

    try {
      const res = await axios.get(`http://localhost:8000/product/${id}`);
      // setShowModal(true);
      handleOpen();
      setCurrentId(res.data.id);
      setEdit(false);
      setInput({ ...input, sku: res.data.sku, name: res.data.name, quantity: res.data.quantity, purchasePrice: res.data.purchasePrice, sellingPrice: res.data.sellingPrice, category: res.data.category, supplierId: res.data.supplierId });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
      swal({
        title: "Are you sure?",
        text: "You want to delete this item? this process cannot be undone",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          setFetchStatus(true);
          swal("Item Deleted Successfully", {
            icon: "success",
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const columns = [
    { id: "no", label: "NO", minWidth: 70 },
    { id: "sku", label: "Sku", minWidth: 100 },
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
      id: "Supplier",
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

  // function createData(id, name, quantity, purchasePrice, sellingPrice, category, supplier, entryDate, changeDate, action) {
  //   return { id, name, quantity, purchasePrice, sellingPrice, category, supplier, entryDate, changeDate, action };
  // }

  // const rows = [
  //   createData(
  //     "PI001",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "PI002",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "PI003",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "PT001",
  //     "Telkomsel",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Telkomsel",
  //     "Telkomsel",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "PT001",
  //     "Telkomsel",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Telkomsel",
  //     "Telkomsel",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "PT001",
  //     "Telkomsel",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Perdana Telkomsel",
  //     "Telkomsel",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "VI001",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Voucher Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "VI001",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Voucher Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  //   createData(
  //     "VI001",
  //     "Indosat",
  //     100,
  //     "Rp10.000",
  //     "Rp15.000",
  //     "Voucher Indosat",
  //     "Indosat",
  //     "17 March 2023, 7:13 PM",
  //     "18 March 2023, 10:13 PM",
  //     <>
  //       <div className="flex">
  //         <button className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">Edit</button>
  //         <button className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">Delete</button>
  //       </div>
  //     </>
  //   ),
  // ];

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
      <Auth />
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
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ backgroundColor: "#28CC9E" }} className="border border-slate-300">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const supplier = fetchSupplier.find((s) => s.id === row.supplierId);
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.sku}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>Rp {row.purchasePrice}</TableCell>
                          <TableCell>Rp {row.sellingPrice}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{supplier?.person_name}</TableCell>
                          <TableCell>{moment(row.createdAt).format("DD MMMM YYYY, LT")}</TableCell>
                          <TableCell>{moment(row.updatedAt).format("DD MMMM YYYY, LT")}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex">
                              <button onClick={() => handleEdit(row.id)} className="flex items-center bg-[#F2BE22] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#FFE569] hover:cursor-pointer duration-300">
                                Edit
                              </button>
                              <button onClick={() => handleDelete(row.id)} className="flex items-center bg-[#D71313] text-white px-4 py-2 rounded-lg hover:bg-[#F31559] hover:cursor-pointer duration-300">
                                Delete
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={columns.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap px-2">
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField onChange={handleInput} value={input.sku} name="sku" label="SKU" id="outlined-start-adornment" sx={{ m: 1, width: "10ch" }} />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField onChange={handleInput} value={input.name} name="name" label="Name" id="outlined-start-adornment" sx={{ m: 1, width: "61ch" }} />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      onChange={handleInput}
                      value={input.quantity}
                      name="quantity"
                      label="Quantity"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "10ch" }}
                      InputProps={{
                        disabled: edit, // Set readOnly when editing
                      }}
                    />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      onChange={handleInput}
                      value={input.purchasePrice}
                      name="purchasePrice"
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
                      onChange={handleInput}
                      value={input.sellingPrice}
                      name="sellingPrice"
                      label="Selling Price"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "42ch" }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                      }}
                    />
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <TextField onChange={handleInput} value={input.category} name="category" label="Category" id="outlined-start-adornment" sx={{ m: 1, width: "41ch" }} />
                  </Typography>
                  <FormControl sx={{ mt: 2, width: "41ch" }}>
                    <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleInput} value={input.supplierId} name="supplierId" label="Supplier">
                      {fetchSupplier &&
                        fetchSupplier.map((supplier) => (
                          <MenuItem key={supplier.id} value={supplier.id}>
                            {supplier.person_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <Button type="submit" size="large" sx={{ backgroundColor: "#29A19C", color: "#fff", marginTop: 1, marginBottom: 2, marginRight: 3, float: "right", ":hover": { backgroundColor: "#7ED7C1" } }}>
                  Submit
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Inventory;
