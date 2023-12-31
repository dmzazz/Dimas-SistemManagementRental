import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

// Import from Material UI
import { Alert } from "@mui/material";
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
import Auth from "../auth/Auth";

const Supplier = () => {
  const [data, setData] = useState(null); //fetchdata
  const [fetchStatus, setFetchStatus] = useState(true); //indikator
  const [currentId, setCurrentId] = useState(-1);

  // Handle Success
  const [success, setSuccess] = useState("");

  // handleError
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  // Handling Input
  const [input, setInput] = useState({
    person_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { person_name, email, phone, address } = input;

    try {
      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:8000/supplier", { person_name, email, phone, address });
        setFetchStatus(true);
        setSuccess(result.data.msg);
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      } else {
        // Update Data
        const result = await axios.put(`http://localhost:8000/supplier/${currentId}`, { person_name, email, phone, address });
        setFetchStatus(true);
        setSuccess(result.data.msg);
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }

      setInput({
        person_name: "",
        email: "",
        phone: "",
        address: "",
      });

      setCurrentId(-1);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        console.log(errorMessage);
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
        let result = await axios.get("http://localhost:8000/supplier");
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  // Handling Edit
  const [edit, setEdit] = useState(false);

  const handleEdit = async (id) => {
    console.log(id);

    try {
      const res = await axios.get(`http://localhost:8000/supplier/${id}`);
      // setShowModal(true);
      handleOpen();
      setCurrentId(res.data.id);
      setInput({ ...input, person_name: res.data.person_name, email: res.data.email, phone: res.data.phone, address: res.data.address });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/supplier/${id}`);
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

  const [search, setSearch] = useState(""); // Search data

  const filteredData = data !== null ? data.filter((row) => (row.no && row.no.toLowerCase().includes(search.toLowerCase())) || (row.person_name && row.person_name.toLowerCase().includes(search.toLowerCase()))) : null;

  const columns = [
    { id: "no", label: "NO", minWidth: 70 },
    { id: "namePerson", label: "Name Person", minWidth: 130 },
    {
      id: "email",
      label: "Email",
      minWidth: 70,
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 100,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 100,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
            <h2 className="text-lg text-[#0A2647] font-semibold">Supplier</h2>

            {/* Right */}
            <div className="flex">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
                id="search"
                name="search"
                placeholder="Search..."
                className="border-2 border-[#A9A9A9] rounded-md p-1 mr-2 focus:border-black focus:outline-none"
              ></input>
              <button onClick={handleOpen} className="flex items-center bg-[#28CC9E] text-white p-2 rounded-lg hover:bg-[#9FF9C1] hover:cursor-pointer duration-300">
                <RiAddBoxLine size={22} className="mr-1" />
                Add Supplier
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
                  {filteredData &&
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.person_name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.address}</TableCell>
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

      {/* Modal Add Supplier */}
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
            {/* Success */}
            <div className="absolute top-2 right-2">
              {success && (
                <Alert variant="filled" severity="success">
                  {success}
                </Alert>
              )}
            </div>

            {/* Error */}
            <div className="absolute top-2 right-2">
              {errorName && (
                <Alert variant="filled" severity="error">
                  {errorName}
                </Alert>
              )}
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ background: "#28CC9E", padding: 2, color: "#fff", borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
              Add Supplier
            </Typography>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap px-2">
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField onChange={handleInput} value={input.person_name} name="person_name" label="Name Person" id="outlined-start-adornment" type="text" sx={{ m: 1, width: "41ch" }} required />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField onChange={handleInput} value={input.email} name="email" label="Email" id="outlined-start-adornment" type="text" sx={{ m: 1, width: "41ch" }} required />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField onChange={handleInput} value={input.phone} name="phone" label="Phone" id="outlined-start-adornment" type="number" sx={{ m: 1, width: "41ch" }} required />
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <TextField onChange={handleInput} value={input.address} name="address" label="Address" id="outlined-start-adornment" type="text" sx={{ m: 1, width: "42ch" }} required />
                </Typography>
              </div>
              <Button type="submit" size="large" sx={{ backgroundColor: "#28CC9E", color: "#fff", marginTop: 1, marginBottom: 2, marginRight: 3, float: "right", ":hover": { backgroundColor: "#9FF9C1" } }}>
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Supplier;
