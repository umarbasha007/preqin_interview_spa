import json
from typing import List

from src.models.firms import Firm
from src.models.commitment import Commitment

# Convert the logic into methods

# ASSET_CLASSES = ["pe", "pd", "re", "inf", "nr", "hf"]
# INVESTOR_IDS: List[int] = []
# FIRMS: List[Firm] = []

# f = open("./db/data.json")
# data = json.load(f)


# for firm in data["firms"]:
#     INVESTOR_IDS.append(firm["firm_id"])
#     parsed_firm = Firm(**firm)
#     FIRMS.append(parsed_firm)


def get_json_db_data():
    with open("./db/data.json") as f:
        data = json.load(f)
        return data


def get_firms(json_db_data) -> List[Firm]:
    """Return all firms."""
    firms: List[Firm] = []

    for firm in json_db_data["firms"]:
        parsed_firm = Firm(**firm)
        firms.append(parsed_firm)

    return firms


def get_investor_ids(json_db_data) -> List[int]:
    """Return all investor ids."""

    investor_ids: List[int] = []

    for firm in json_db_data["firms"]:
        investor_ids.append(firm["firm_id"])

    return investor_ids


def get_asset_classes() -> List[str]:
    """Return all asset classes."""
    asset_classes = ["pe", "pd", "re", "inf", "nr", "hf"]
    return asset_classes


def get_commitmemt_details(
    investor_id: int, asset_class: str, json_db_data
) -> List[Commitment]:
    """Return all related commitments"""

    result: List[Commitment] = []

    for commitment in json_db_data["commitments"]:
        if (
            commitment["firm_id"] == investor_id
            and commitment["asset_class"] == asset_class
        ):
            parsed_commitment = Commitment(**commitment)
            result.append(parsed_commitment)

    return result
