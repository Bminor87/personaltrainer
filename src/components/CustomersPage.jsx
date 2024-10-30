import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import UpdateCustomer from "./UpdateCustomer";
import ResetButton from "./partials/ResetButton";

import {getCustomers, deleteCustomer} from "../services/customers-service";

function CustomersPage() {

    const queryClient = useQueryClient();

    const { data: customers } = useQuery({
        queryKey: ["customers"],
        queryFn: getCustomers,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: queryClient.invalidateQueries("customers"),
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
            cellRenderer: (params) => <UpdateCustomer currentCustomer={params.data} />,
        },
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filter: false,
            cellRenderer: (params) => (
            <Button
                onClick={() => deleteMutation.mutate(params.data._links.self.href)}
            >
                Delete
            </Button>
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
        <div className="ag-list">
            <h1>Customers Page</h1>
            <ResetButton />
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
};

export default CustomersPage;