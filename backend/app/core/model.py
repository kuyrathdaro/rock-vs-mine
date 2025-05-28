import pandas as pd
from app.core.config import DATA_PATH, MODEL_PATH
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os
import numpy as np

def train_model():
    df = pd.read_csv(DATA_PATH, header=None)
    X = df.drop(columns=60, axis=1)
    y = df[60]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, stratify=y, random_state=1)
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)

    # Save the model
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    # Optionally, print accuracy
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_acc = accuracy_score(y_test, model.predict(X_test))
    print(f"Training accuracy: {train_acc:.4f}")
    print(f"Test accuracy: {test_acc:.4f}")

    return model

def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. Please train the model first.")
    
    model = joblib.load(MODEL_PATH)
    return model

def predict(input_data):
    """
    input_data: list or numpy array of 60 features
    returns: prediction label ('R' or 'M')
    """
    model = load_model()
    input_array = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_array)
    return prediction[0]