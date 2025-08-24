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
        features_str = ",".join(str(x) for x in data.data)
        if isinstance(result, str):
            prediction = result
            result = { "features": features_str, "prediction": prediction }
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
        predictions = df.apply(lambda row: make_prediction(row.tolist()), axis=1)
        # Build response: features as one string, prediction as another field
        result = []
        for idx, row in df.iterrows():
            features_str = ",".join(str(x) for x in row.tolist())
            result.append({
                "features": features_str,
                "prediction": predictions.iloc[idx]
            })
        return api_response(
            message="Success",
            data=result
        )
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))