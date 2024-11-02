import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

import { getTrainingsWithCustomer } from "../services/trainings-service";
import CreateTraining from "./partials/CreateTraining";
import DeleteTrainingButton from "./partials/DeleteTrainingButton";

export default function TrainingsPage() {
  const { data: trainings } = useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainingsWithCustomer,
  });

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "date",
      headerName: "Date",
      sort: "asc",
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY hh:mm"),
    },
    { field: "duration", headerName: "Duration" },
    { field: "activity", headerName: "Activity" },
    {
      field: "customer",
      headerName: "Customer",
      valueFormatter: (params) =>
        params.value.firstname + " " + params.value.lastname,
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <DeleteTrainingButton currentTraining={params.data} />
      ),
    },
  ]);

  const defaultColDef = {
    filter: true,
    sortable: true,
  };

  const autoSizeStrategy = {
    type: "fitGridWidth",
  };

  return (
    <div className="ag-list mt-4">
      <Typography variant="h3">Trainings</Typography>
      <CreateTraining />
      <div className="ag-theme-material" style={{ height: 800, width: "100%" }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
