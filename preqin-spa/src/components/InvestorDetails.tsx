import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommitment, Commitment } from "../services/api";
import { SelectChangeEvent } from "@mui/material";
import CustomSelect from "./ui-common/CustomSelect";
import CustomTable from "./ui-common/CustomTable";

const assetClassDetials = [
  {
    label: "Private Equity",
    value: "pe",
  },
  {
    label: "Private Debt",
    value: "pd",
  },
  {
    label: "Real Estate",
    value: "re",
  },
  {
    label: "Infrastructure",
    value: "inf",
  },
  {
    label: "Natural Resources",
    value: "nr",
  },
  {
    label: "Hedge Funds",
    value: "hf",
  },
];
const InvestorDetails = () => {
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
    <>
      <h2 style={{ margin: "10px" }}>
        Investor Details : Commitment information for investor in an asset type
      </h2>
      <CustomSelect
        value={assetClass}
        onChange={handleChange}
        options={assetClassDetials}
        label="Asset Class"
        defaultWidth="250px" // Custom width
      />

      {commitment.length > 0 && (
        <CustomTable
          data={commitment}
          columns={[
            { id: "id", label: "Id" },
            { id: "asset_class", label: "Asset Class" },
            { id: "firm_id", label: "Firm Id" },
            { id: "currency", label: "Currency" },
            { id: "amount", label: "Amount" },
          ]}
        />
      )}
    </>
  );
};

export default InvestorDetails;
