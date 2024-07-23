import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type tableType = "investors" | "investor_details";

interface CustomTableProps<T> {
  data: T[];
  tableType?: tableType;
  columns: { id: keyof T; label: string; dateTypeBool?: boolean }[];
  rowsPerPageOptions?: number[];
}

const CustomTable: React.FC<CustomTableProps<any>> = ({
  data,
  columns,
  tableType,
  rowsPerPageOptions = [5, 10, 25],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const navigate = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (rowData: any) => {
    if (tableType === "investors") {
      const investorId = rowData.firm_id;
      navigate(`/investors/${investorId}`);
    }
  };

  return (
    <>
      <Paper sx={{ margin: "10px", overflow: "hidden" }}>
        <TableContainer>
          <MuiTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id as string}
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#d2d3d3",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id as string}>
                        {/* {row[column.id]} */}
                        {column.dateTypeBool === true
                          ? new Date(row[column.id]).toLocaleDateString()
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CustomTable;
