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

// Import Auth
import Auth from "../auth/Auth";
import { formatRupiah } from "../utils";

const Dashboard = () => {
  const [dataProduct, setDataProduct] = useState(null); //fetch data product
  const [dataOrder, setDataOrder] = useState(null); //fetch data Order
  const [fetchSupplier, setSupplier] = useState(null); // fetch data supplier
  const [dataOutboundHistory, setDataOutboundHistory] = useState(null); // fetch data outbound history
  const [fetchStatus, setFetchStatus] = useState(true); //indikator

  useEffect(() => {
    let dataProduct = async () => {
      try {
        let result = await axios.get("http://localhost:8000/product");
        setDataProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    let dataOrder = async () => {
      try {
        let result = await axios.get("http://localhost:8000/order");
        setDataOrder(result.data);
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

    let dataOutboundHistory = async () => {
      try {
        let result = await axios.get("http://localhost:8000/outbound-history");
        setDataOutboundHistory(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      dataProduct();
      dataOrder();
      fetchSupplier();
      dataOutboundHistory();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalSupplier, setTotalSupplier] = useState(0);

  useEffect(() => {
    // Function to calculate total number of products
    const calculateTotalProduct = () => {
      if (dataProduct) {
        const total = dataProduct.length;
        setTotalProduct(total);
      }
    };

    const calculateTotalOrder = () => {
      if (dataOrder) {
        const total = dataOrder.length;
        setTotalOrder(total);
      }
    };

    const calculateTotalSupplier = () => {
      if (fetchSupplier) {
        const total = fetchSupplier.length;
        setTotalSupplier(total);
      }
    };

    calculateTotalProduct();
    calculateTotalOrder();
    calculateTotalSupplier();
  }, [dataProduct, dataOrder, fetchSupplier]);

  const columnsProduct = [
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
  ];

  const columnsOrder = [
    { id: "no", label: "NO", minWidth: 70 },
    { id: "sku", label: "Sku", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 70,
    },
    {
      id: "total",
      label: "Total Price",
      minWidth: 100,
    },
    {
      id: "status",

      label: "Status",
      minWidth: 100,
    },
    {
      id: "outDate",
      label: "Out Date",
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
  return (
    <>
      <Auth />
      <div className="w-full h-full">
        <div className="flex">
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#29A19C] text-xl font-bold">{totalProduct}</span>
            <p className="text-sm text-[#bbb] font-medium">Total Inventory</p>
          </div>
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#489CC1] text-xl font-bold">{totalOrder}</span>
            <p className="text-sm text-[#bbb] font-medium">Total Order</p>
          </div>
          <div className="w-max h-max bg-[#fff] p-2 m-2 rounded-md shadow-lg">
            <span className="text-[#28CC9E] text-xl font-bold">{totalSupplier}</span>
            <p className="text-sm text-[#bbb] font-medium">Total Supplier</p>
          </div>
        </div>
        <div className="bg-white w-11/12 mx-auto mt-10 border rounded">
          <div className="flex justify-between items-center p-3">
            {/* Left */}
            <h2 className="text-lg text-[#0A2647] font-semibold">Inbound History Product</h2>
          </div>

          {/* Table Data */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsProduct.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ backgroundColor: "#29A19C" }} className="border border-slate-300">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataProduct &&
                    dataProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const supplier = fetchSupplier ? fetchSupplier.find((s) => s.id === row.supplierId) : null;

                      return (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.sku}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{formatRupiah(row.purchasePrice)}</TableCell>
                          <TableCell>{formatRupiah(row.sellingPrice)}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{supplier?.person_name}</TableCell>
                          <TableCell>{moment(row.createdAt).format("DD MMMM YYYY, LT")}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={columnsProduct.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </div>

        <div className="bg-white w-11/12 mx-auto mt-10 border rounded">
          <div className="flex justify-between items-center p-3">
            {/* Left */}
            <h2 className="text-lg text-[#0A2647] font-semibold">Outbound History Product</h2>
          </div>

          {/* Table Data */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsOrder.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ backgroundColor: "#489CC1" }} className="border border-slate-300">
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*
                   */}
                  {dataOutboundHistory &&
                    dataOutboundHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const product = dataProduct ? dataProduct.find((s) => s.id === row.productId) : null;

                      const totalPrices = dataOutboundHistory.reduce((total, row) => total + row.total, 0);
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{product?.sku}</TableCell>
                          <TableCell>{product?.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{formatRupiah(row.total)}</TableCell>
                          <TableCell>
                            <span className="text-[#29A19C] font-bold">Completed</span>
                          </TableCell>
                          <TableCell>{moment(row.createdAt).format("DD MMMM YYYY, LT")}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25, 100]} component="div" count={dataOrder?.length || 0} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
