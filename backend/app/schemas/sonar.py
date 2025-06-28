from pydantic import BaseModel, field_validator
from typing import List

class SonarInput(BaseModel):
    data: List[float]

    @field_validator('data')
    @classmethod
    def check_length(cls, v):
        if len(v) != 60:
            raise ValueError('data must have exactly 60 values')
        return v

class SonarPrediction(BaseModel):
    prediction: str  # 'R' for Rock, 'M' for Mine