import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchInvestors } from "../services/api";
import { setInvestors } from "../store/investorsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const InvestorsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const investors = useSelector((state: RootState) => state.investors.list);

  useEffect(() => {
    const firmIds = [2670, 2792, 332, 3611];
    fetchInvestors(firmIds).then((data) => {
      dispatch(setInvestors(data));
    });
  }, [dispatch]);

  const handleRowClick = (investorId: number) => {
    navigate(`/investors/${investorId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>FirmId</TableCell>
            <TableCell>FirmName</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>DateAdded</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {investors.map((investor) => (
            <TableRow
              key={investor.firm_id}
              onClick={() => handleRowClick(investor.firm_id)}
            >
              <TableCell>{investor.firm_id}</TableCell>
              <TableCell>{investor.firm_name}</TableCell>
              <TableCell>{investor.firm_type}</TableCell>
              <TableCell>
                {new Date(investor.date_added).toLocaleDateString()}
              </TableCell>
              <TableCell>{investor.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvestorsTable;
