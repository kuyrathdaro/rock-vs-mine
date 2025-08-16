from fastapi import APIRouter, HTTPException, Body, File, UploadFile
import pandas as pd
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

@router.post("/predict-csv")
def predict_csv(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file, header=None)
        predictions = df.apply(lambda row: make_prediction(row.tolist()), axis = 1)
        df["prediction"] = predictions
        df.columns = [f"feature_{i+1}" for i in range(df.shape[1] - 1)] + ["prediction"]
        return api_response(
            message="Success",
            data=df.to_dict(orient="records")
        )
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))