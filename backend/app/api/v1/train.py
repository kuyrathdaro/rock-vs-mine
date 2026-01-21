from fastapi import APIRouter, HTTPException
from app.core.model import train_model
from app.utils.response import api_response

router = APIRouter()

@router.post("/train-model")
def train():
    try:
        train_model()
        return api_response(
            message="Success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))