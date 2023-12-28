import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Auth from "../auth/Auth";
import { formatRupiah } from "../utils";

const Order = () => {
  const [data, setData] = useState(null); //fetchdata
  const [fetchStatus, setFetchStatus] = useState(true); //indikator
  const [products, setProducts] = useState([]);

  const handleChangeProduct = (e) => {
    const product = products.find((p) => p.id === e.target.value);
    setInput({
      ...input,
      productId: product.id,
      productPrice: product.sellingPrice,
    });
  };

  // Handling Input
  const [input, setInput] = useState({
    productId: "",
    productPrice: 0,
    qty: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  // Handling Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create Data
      await axios.post("http://localhost:8000/order", input);
      setFetchStatus(true);
      setInput({
        productId: "",
        productPrice: 0,
        qty: "",
      });
      handleClose();
    } catch (error) {}
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:8000/order");
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

  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:8000/product");
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to confirm this order ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.get(`http://localhost:8000/order/confirm/${id}`);
          setFetchStatus(true);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.msg || "error",
            icon: "error",
          });
        }
      }
    });
  };

  // Handling Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this order? this process cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios.delete(`http://localhost:8000/order/${id}`);
        setFetchStatus(true);
      }
    });
  };

  const [search, setSearch] = useState("");
  const filteredData = data !== null ? data.filter((row) => (row.no && row.no.toLowerCase().includes(search.toLowerCase())) || (row.product.name && row.product.name.toLowerCase().includes(search.toLowerCase()))) : null;

  const columns = [
    {
      id: "code",
      label: "ID",
      minWidth: 70,
    },
    {
      id: "product",
      label: "Name",
      minWidth: 100,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 70,
    },
    {
      id: "qty",
      label: "Qty",
      minWidth: 70,
    },
    {
      id: "total",
      label: "Total",
      minWidth: 70,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 70,
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
            <h2 className="text-lg text-[#0A2647] font-semibold">Order</h2>

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
              <button onClick={handleOpen} className="flex items-center bg-[#489CC1] text-white p-2 rounded-lg hover:bg-[#17B3C1] hover:cursor-pointer duration-300">
                <RiAddBoxLine size={22} className="mr-1" />
                Add Order
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
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ backgroundColor: "#489CC1" }} className="border border-slate-300">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*
                   */}
                  {filteredData &&
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.product.name}</TableCell>
                          <TableCell>{formatRupiah(row.price)}</TableCell>
                          <TableCell>{row.qty}</TableCell>
                          <TableCell>{formatRupiah(row.total)}</TableCell>
                          <TableCell>
                            <span className="text-[#D71313] font-bold">{row.status}</span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex">
                              <button onClick={() => handleConfirm(row.id)} className="flex items-center bg-[#29A19C] text-white mr-2 px-4 py-2 rounded-lg hover:bg-[#47D6B6] hover:cursor-pointer duration-300">
                                Confirm
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
            <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={data?.length || 0} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </div>
      </div>

      {/* Modal Add Order */}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  background: "#489CC1",
                  padding: 2,
                  color: "#fff",
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}
              >
                Add Order
              </Typography>

              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap px-2">
                  <FormControl sx={{ m: 1, width: "53ch", mt: 3 }}>
                    <InputLabel id="product-label">Product</InputLabel>
                    <Select labelId="product-label" id="product" label="Agesssddddd" name="productId" onChange={handleChangeProduct} value={input.productId} required>
                      {products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "21ch", mt: 3 }}>
                    <TextField label="Price" id="outlined-start-adornment" value={formatRupiah(input.productPrice)} disabled />
                  </FormControl>
                  <FormControl sx={{ m: 1, mt: 2 }} fullWidth>
                    <TextField label="Quantity" id="outlined-start-adornment" type="number" name="qty" onChange={handleInput} value={input.qty} required />
                  </FormControl>
                </div>
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    backgroundColor: "#489CC1",
                    color: "#fff",
                    marginTop: 1,
                    marginBottom: 2,
                    marginRight: 2,
                    float: "right",
                    ":hover": { backgroundColor: "#17B3C1" },
                  }}
                >
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

export default Order;
