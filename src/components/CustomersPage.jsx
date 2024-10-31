import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import UpdateCustomer from "./partials/UpdateCustomer";

import { getCustomers } from "../services/customers-service";
import DeleteCustomerButton from "./partials/DeleteCustomerButton";
import CreateCustomer from "./partials/CreateCustomer";

export default function CustomersPage() {
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstname", headerName: "First Name", sort: "asc" },
    { field: "lastname", headerName: "Last Name" },
    { field: "streetaddress", headerName: "Street Address" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <UpdateCustomer currentCustomer={params.data} />
      ),
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <DeleteCustomerButton currentCustomer={params.data} />
      ),
    },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
  };

  const autoSizeStrategy = {
    type: "fitColumns",
  };

  return (
    <div className="ag-list mt-4">
      <Typography variant="h3">Customers</Typography>
      <CreateCustomer />
      <div className="ag-theme-material" style={{ height: 800, width: "100%" }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
