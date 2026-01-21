from pydantic import BaseModel, field_validator
from typing import List, Union

class SonarInput(BaseModel):
    data: Union[str, List[float]]

    @field_validator('data', mode='before')
    @classmethod
    def parse_and_validate(cls, v):
        # Accept comma-separated string or list of floats
        if isinstance(v, str):
            try:
                values = [float(x) for x in v.split(",")]
            except Exception:
                raise ValueError("data string must be comma-separated floats")
        elif isinstance(v, list):
            values = v
        else:
            raise ValueError("data must be a comma-separated string or a list of floats")
        if len(values) != 60:
            raise ValueError("data must have exactly 60 values")
        return values

class SonarPrediction(BaseModel):
    prediction: str  # 'R' for Rock, 'M' for Mine