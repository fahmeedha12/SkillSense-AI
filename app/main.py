from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib


app = FastAPI(
    title="SkillSense AI API",
    description="ML-powered Job Role Prediction API",
    version="1.1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skill-sense-ai-alpha.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load trained ML model
model = joblib.load("model/model.pkl")


class SkillInput(BaseModel):
    skills: list[str]


@app.get("/")
def home():
    return {
        "message": "Welcome to SkillSense AI API",
        "version": "1.1.0",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "loaded"
    }


@app.post("/predict")
def predict(data: SkillInput):

    # Convert skill list into text
    skills_text = " ".join(data.skills)

    # Get probabilities for every career category
    probabilities = model.predict_proba([skills_text])[0]

    # Get career names
    career_roles = model.classes_

    # Combine role + probability
    predictions = list(zip(career_roles, probabilities))

    # Sort from highest probability to lowest
    predictions.sort(
        key=lambda item: item[1],
        reverse=True
    )

    # Take top 3
    top_predictions = predictions[:3]

    # Format response
    top_matches = []

    for role, probability in top_predictions:
        top_matches.append({
            "role": role,
            "confidence": round(float(probability), 2),
            "percentage": round(float(probability) * 100, 1)
        })

    return {
        "primary_role": top_matches[0]["role"],
        "primary_confidence": top_matches[0]["percentage"],
        "top_matches": top_matches,
        "skills_analyzed": data.skills
    }