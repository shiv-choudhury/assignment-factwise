import React, { useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeBalham,
  themeMaterial,
  themeQuartz
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import Button from "../basic-components/Button";
import localPrice from "../utils/utils";
import data from "../data.json";
import ToggleSwitch from "../basic-components/ToggleSwitch";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Dashboard() {
  const [selectRow, setSelectRow] = useState(false);
  const [highlightRow, setHighlightRow] = useState(false);
  const [highlightCell, setHighlightCell] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const [theme, setTheme] = useState(themeMaterial);
  const [activeButton, setActiveButton] = useState("Material");
  const [rowData, setRowData] = useState(data.employees);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id"
    },
    {
      headerName: "User ID",
      valueGetter: (params) => params.data.firstName + "#" + params.data.id
    },
    { field: "firstName", cellRenderer: MyCellFirstName },
    { field: "lastName" },
    { field: "isActive" },
    {
      field: "salary",
      valueFormatter: (params) => localPrice(params.data.salary) || "--",
      // cellClass: "green-cell",
      cellClassRules: {
        "green-cell": (params) => params.data.salary > 100000 && highlightCell
      }
    },
    { field: "email" },
    { field: "department" },
    {
      field: "position",
      cellEditorParams: { values: ["Manager", "Developer", "Designer"] }
    },
    { field: "hireDate" },
    { field: "age" },
    { field: "location" },
    { field: "performanceRating" },
    { field: "projectsCompleted" },
    {
      field: "skills",
      valueGetter: (params) => params.data.skills.join(", ") || "--"
    },
    {
      field: "manager",
      valueGetter: (params) => params.data.manager || "--"
    }
  ]);

  const handleButtonClick = (theme, buttonName) => {
    setTheme(theme);
    setActiveButton(buttonName);
  };

  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: showFilter,
      editable: true,
      cellRenderer: "agTextCellRenderer",
      cellRendererParams: {
        suppressTextTrimming: true,
        suppressMultiLine: true,
        autoHeight: true
      }
    };
  }, [showFilter]);

  const rowClassRules = useMemo(() => {
    return {
      "blue-cell": (params) =>
        params.data.position === "Senior Developer" && highlightRow
    };
  }, [highlightRow]);

  return (
    <div className="px-2">
      <div className="mt-2 text-2xl font-semibold text-red-500 text-center">
        FactWise AG Grid Dashboard
      </div>
      <div className="p-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-[#111]">Choose Theme:</div>
          <Button
            btnStyle={activeButton === "Balham" ? "!bg-red-400" : ""}
            onClick={() => handleButtonClick(themeBalham, "Balham")}
          >
            Balham Theme
          </Button>
          <Button
            btnStyle={activeButton === "Material" ? "!bg-red-400" : ""}
            onClick={() => handleButtonClick(themeMaterial, "Material")}
          >
            Material Theme
          </Button>
          <Button
            btnStyle={activeButton === "Quartz" ? "!bg-red-400" : ""}
            onClick={() => handleButtonClick(themeQuartz, "Quartz")}
          >
            Quartz Theme
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ToggleSwitch
            label1="Pagination"
            isTrue={showPagination}
            handleToggle={() => setShowPagination(!showPagination)}
          />
          |
          <ToggleSwitch
            label1="Floating Filter"
            isTrue={showFilter}
            handleToggle={() => setShowFilter(!showFilter)}
          />
          |
          <ToggleSwitch
            label1="Highlight Row"
            isTrue={highlightRow}
            handleToggle={() => setHighlightRow(!highlightRow)}
          />
          |
          <ToggleSwitch
            label1="Select Multiple Row"
            isTrue={selectRow}
            handleToggle={() => setSelectRow(!selectRow)}
          />
        </div>
      </div>
      <div style={{ height: "calc(100vh - 95px)", width: "100%" }}>
        <AgGridReact
          theme={theme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={selectRow ? "multiple" : "single"}
          pagination={showPagination}
          paginationPageSize={15}
          paginationPageSizeSelector={[5, 10, 15, 20]}
          animateRows={true}
          rowClassRules={rowClassRules}
        />
      </div>
    </div>
  );
}

const MyCellFirstName = (params) => {
  return (
    <button
      className="mt-2 bg-blue-500 text-white p-1 h-6 flex items-center justify-between rounded"
      onClick={() =>
        alert(
          "My full name is " +
            params.data.firstName +
            " " +
            params.data.lastName
        )
      }
    >
      {params.data.firstName}
    </button>
  );
};
