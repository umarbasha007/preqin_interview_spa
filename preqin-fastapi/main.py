import json
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.routers import investors
from src.models.firms import Firm
from src.models.commitment import Commitment

app = FastAPI(
    title="Preqin APIs",
    version="1.0.0",
    description="These APIs are used by Preqin to provide data to the frontend.",
)

# Add routers
app.include_router(investors.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Modify the below structure for better readibility and code flow

# ASSET_CLASSES = ["pe", "pd", "re", "inf", "nr", "hf"]

# f = open("./db/data.json")
# data = json.load(f)

# INVESTOR_IDS: List[int] = []
# FIRMS: List[Firm] = []
# for firm in data["firms"]:
#     INVESTOR_IDS.append(firm["firm_id"])
#     parsed_firm = Firm(**firm)
#     FIRMS.append(parsed_firm)


# @app.get("/api/investors")
# def get_investors() -> List[Firm]:
#     return "hahah"
#     # return FIRMS


# @app.get("/api/investor/commitment/{asset_class}/{investor_id}")
# def get_commitments(investor_id: int, asset_class: str) -> List[Commitment]:
#     if investor_id not in INVESTOR_IDS:
#         raise HTTPException(
#             status_code=404, detail=f"investor with id {investor_id} not found"
#         )
#     if asset_class not in ASSET_CLASSES:
#         raise HTTPException(
#             status_code=404, detail=f"asset class {asset_class} does not exist"
#         )

#     result: List[Commitment] = []
#     for commitment in data["commitments"]:
#         if (
#             commitment["firm_id"] == investor_id
#             and commitment["asset_class"] == asset_class
#         ):
#             parsed_commitment = Commitment(**commitment)
#             result.append(parsed_commitment)

#     return result
