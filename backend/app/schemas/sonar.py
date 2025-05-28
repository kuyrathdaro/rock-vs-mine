from pydantic import BaseModel, field_validator

class SonarInput(BaseModel):
    features: list[float]

    @field_validator('features')
    @classmethod
    def check_length(cls, v):
        if len(v) != 60:
            raise ValueError('features must have exactly 60 values')
        return v

class SonarPrediction(BaseModel):
    prediction: str  # 'R' for Rock, 'M' for Mine