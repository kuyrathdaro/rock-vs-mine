from fastapi import APIRouter, HTTPException, Body
from app.schemas.sonar import SonarInput
from app.core.model import predict as make_prediction
from app.utils.response import api_response

router = APIRouter()

@router.post("/predict")
def predict(data: SonarInput = Body(...)):
    try:
        result = make_prediction(data.data)
        if isinstance(result, str):
            prediction = result
            result = {"prediction": prediction}
        else:
            prediction = result.get("prediction")
        message = "The object is a Rock." if prediction == "R" else "The object is a Mine."
        return api_response(
            message=message,
            data=result
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))