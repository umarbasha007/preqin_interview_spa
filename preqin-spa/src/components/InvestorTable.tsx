// InvestorsTable using axios

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store";
// import { fetchInvestors } from "../services/api";
// import { setInvestors } from "../store/investorsSlice";

// import CustomTable from "./ui-common/CustomTable";

// const InvestorsTable = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const investors = useSelector((state: RootState) => state.investors.list);

//   useEffect(() => {
//     const firmIds = [2670, 2792, 332, 3611];
//     fetchInvestors(firmIds).then((data) => {
//       dispatch(setInvestors(data));
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <h2 style={{ margin: "10px" }}>Investors</h2>
//       {investors.length > 0 && (
//         <CustomTable
//           data={investors}
//           tableType={"investors"}
//           columns={[
//             { id: "firm_id", label: "FirmId" },
//             { id: "firm_name", label: "FirmName" },
//             { id: "firm_type", label: "Type" },
//             { id: "date_added", label: "DateAdded", dateTypeBool: true },
//             { id: "address", label: "Address" },
//           ]}
//         />
//       )}
//     </>
//   );
// };

// export default InvestorsTable;

// InvestorsTable using rtk-query for better performance

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useFetchInvestorsQuery } from "../services/apiSlice";
import CustomTable from "./ui-common/CustomTable";
import { setInvestors } from "../store/investorsSlice";

const InvestorsTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Define firm IDs
  const firmIds = [2670, 2792, 332, 3611];

  // Fetch investors using rtk-query hook
  const {
    data: investors = [],
    error,
    isLoading,
  } = useFetchInvestorsQuery(firmIds);

  useEffect(() => {
    if (investors.length > 0) {
      dispatch(setInvestors(investors));
    }
  }, [dispatch, investors]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching investors</p>;

  return (
    <>
      <h2 style={{ margin: "10px" }}>Investors</h2>
      {investors.length > 0 && (
        <CustomTable
          data={investors}
          tableType={"investors"}
          columns={[
            { id: "firm_id", label: "FirmId" },
            { id: "firm_name", label: "FirmName" },
            { id: "firm_type", label: "Type" },
            { id: "date_added", label: "DateAdded", dateTypeBool: true },
            { id: "address", label: "Address" },
          ]}
        />
      )}
    </>
  );
};

export default InvestorsTable;
