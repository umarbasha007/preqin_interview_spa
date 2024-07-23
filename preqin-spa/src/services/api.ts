import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export interface Investor {
  firm_id: number;
  firm_name: string;
  firm_type: string;
  date_added: string;
  address: string;
}

export interface Commitment {
  id: number;
  asset_class: string;
  firm_id: number;
  currency: string;
  amount: string;
}

export const fetchInvestors = async (
  firmIds: number[]
): Promise<Investor[]> => {
  try {
    const response = await axios.get<Investor[]>(
      `${API_BASE_URL}/api/investors`
    );
    return response.data.filter((investor) =>
      firmIds.includes(investor.firm_id)
    );
  } catch (error) {
    console.error("Error fetching investors", error);
    throw error;
  }
};

export const fetchCommitment = async (
  assetClass: string,
  investorId: number
): Promise<Commitment[]> => {
  try {
    const response = await axios.get<Commitment[]>(
      `${API_BASE_URL}/api/investor/commitment/${assetClass}/${investorId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching commitment information", error);
    throw error;
  }
};
