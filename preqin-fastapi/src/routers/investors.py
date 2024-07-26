from typing import List, Any

from fastapi import APIRouter, Depends, HTTPException
import starlette.status as status

from src.models.firms import Firm
from src.models.commitment import Commitment
from src.handlers.investor_handler import (
    get_asset_classes,
    get_commitmemt_details,
    get_firms,
    get_investor_ids,
    get_json_db_data,
)

router = APIRouter(prefix="/api", tags=["Investor APIs"])


@router.get("/investors")
def get_investors(json_db_data: Any = Depends(get_json_db_data)) -> List[Firm]:
    """Return list of investors / Firms."""

    firms = get_firms(json_db_data=json_db_data)
    if not firms:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Firms not found",
        )
    else:
        return firms


@router.get("/investor/commitment/{asset_class}/{investor_id}")
def get_commitments(
    investor_id: int, asset_class: str, json_db_data: Any = Depends(get_json_db_data)
) -> List[Commitment]:
    """Return list of commitments."""

    investor_ids = get_investor_ids(json_db_data=json_db_data)
    asset_classes = get_asset_classes()

    if investor_id not in investor_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"investor with id {investor_id} not found",
        )

    if asset_class not in asset_classes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"asset class {asset_class} does not exist",
        )

    result: List[Commitment] = get_commitmemt_details(
        investor_id=investor_id, asset_class=asset_class, json_db_data=json_db_data
    )

    if result.count != 0:
        return result
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"commitment with investro id = {investor_id} & asset class = {asset_class} not found",
        )
