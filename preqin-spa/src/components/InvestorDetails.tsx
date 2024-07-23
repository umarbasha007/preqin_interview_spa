import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommitment, Commitment } from "../services/api";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  //   Typography,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const InvestorDetails: React.FC = () => {
  const { investorId } = useParams<{ investorId: string }>();
  const [assetClass, setAssetClass] = useState<string>("");
  const [commitment, setCommitment] = useState<Commitment[]>([]);

  useEffect(() => {
    if (assetClass && investorId) {
      fetchCommitment(assetClass, parseInt(investorId)).then((data) => {
        setCommitment(data);
      });
    }
  }, [assetClass, investorId]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAssetClass(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Asset Class</InputLabel>
        <Select value={assetClass} onChange={handleChange}>
          <MenuItem value="pe">Private Equity</MenuItem>
          <MenuItem value="pd">Private Debt</MenuItem>
          <MenuItem value="re">Real Estate</MenuItem>
          <MenuItem value="inf">Infrastructure</MenuItem>
          <MenuItem value="nr">Natural Resources</MenuItem>
          <MenuItem value="hf">Hedge Funds</MenuItem>
        </Select>
      </FormControl>
      {commitment.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Asset Class</TableCell>
                <TableCell>Firm Id</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commitment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.asset_class.toUpperCase()}</TableCell>
                  <TableCell>{item.firm_id}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default InvestorDetails;
