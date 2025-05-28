from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import predict, train

app = FastAPI(swagger_ui_parameters={ "syntaxHighlight.theme": "dracula"})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(train.router)
app.include_router(predict.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)