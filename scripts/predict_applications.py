#!/usr/bin/env python3
import sys
import json
import random  # Just for demonstration
import re
import unicodedata
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import List, Dict, Optional
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="PISA Job Application Predictor",
    description="API to predict job application scores",
    version="1.0.0"
)

# Cargar el modelo de embeddings una sola vez al iniciar
try:
    model = SentenceTransformer('intfloat/multilingual-e5-base')
    print("Modelo de embeddings cargado exitosamente")
except Exception as e:
    print(f"Error al cargar el modelo de embeddings: {e}")
    model = None

class Education(BaseModel):
    highestLevel: str
    field: Optional[str] = None
    

class Experience(BaseModel):
    totalYears: str
    currentPosition: Optional[str] = None
    achievements: Optional[List[str]] = None

class Skills(BaseModel):
    skills: List[str]
    
class Project(BaseModel):
    name: str
    description: str
    technologies: List[str]

class Job(BaseModel):
    requirements: str
    responsibilities: str
    
class ApplicationData(BaseModel):
    applicationId: str
    skills: List[str]
    education: Education
    experience: Experience
    projects: List[Project]

def clean_text(text):
    if not isinstance(text, str):
        return ""
    # Normaliza tildes, acentos, etc.
    text = unicodedata.normalize("NFKD", text)
    # Elimina caracteres especiales no alfanuméricos comunes
    text = re.sub(r'[^\w\s,.:-]', '', text)  # puedes afinar esta expresión
    text = re.sub(r'\s+', ' ', text)  # quita espacios múltiples
    return text.strip().lower()

#Generates emmedings for the experience 
def generate_experience_embedding(experience: Experience, skills: List[str]):
    experience_text = f"{clean_text(experience.currentPosition)} : {clean_text(experience.achievements)} ,skills: {clean_text(skills)}"
    if model:
        embedding = model.encode(experience_text)
    return embedding
#Generates emmedings for the education
def generate_education_embedding(education: Education):
    education_text = f"{clean_text(education.highestLevel)}, {clean_text(education.field)}"
    if model:
        embedding = model.encode(education_text)
    return embedding
#Generates emmedings for the job
def generate_job_embedding(job: Job):
    job_text = f"{clean_text(job.requirements)} {clean_text(job.responsibilities)}"
    if model:
        embedding = model.encode(job_text)
    return embedding

#Generates emmedings for the projects/certifications
def generate_project_embedding(projects: List[Project]):
    project_embeddings = []
    for project in projects:
        project_text = f"{clean_text(project.name)} {clean_text(project.description)} {' '.join(clean_text(tech) for tech in project.technologies)}"
        if model:
            embedding = model.encode(project_text)
            project_embeddings.append(embedding)

    if not project_embeddings:
        return None

    # (shape: (768,))
    profile_embedding = np.mean(project_embeddings, axis=0)
    return profile_embedding
         
def get_relation_embeddings(skills: List[str], experience: Experience, education: Education, job: Job, projects: List[Project]) -> np.ndarray:
    XP = generate_experience_embedding(experience, skills)
    ED = generate_education_embedding(education)
    JO = generate_job_embedding(job)
    PR = generate_project_embedding(projects)
    cosine_similarity(XP, JO)
    cosine_similarity(ED, JO)
    cosine_similarity(PR, JO)
    #[0.8,0.5,0.01]
    
    

def predict_application_score(application_data: ApplicationData):
    """
    Función para predecir la puntuación de una aplicación.
    
    Parameters:
    application_data (ApplicationData): Los datos de la aplicación
    
    Returns:
    dict: Los resultados de la predicción con la puntuación
    """
    try:
        # Generar embeddings para las habilidades
        skill_embeddings = get_skill_embeddings(application_data.skills)
        
        # Generar embeddings para los proyectos
        project_embeddings = generate_projects(application_data.projects)
        
        # Por ahora, usamos la lógica de demostración
        skills = application_data.skills
        education_level = application_data.education.highestLevel
        experience = application_data.experience.totalYears
        
        # Lógica de puntuación simple (reemplazar con tu modelo real)
        base_score = random.uniform(50, 90)
        
        # Ajustar puntuación basado en educación
        education_bonus = {
            "High School": 0,
            "Associate's Degree": 5,
            "Bachelor's Degree": 10,
            "Master's Degree": 15,
            "Doctorate": 20,
        }.get(education_level, 0)
        
        # Ajustar puntuación basado en experiencia
        experience_bonus = {
            "0-1 years": 0,
            "1-3 years": 5,
            "3-5 years": 10,
            "5-10 years": 15,
            "10+ years": 20,
        }.get(experience, 0)
        
        # Ajustar puntuación basado en número de habilidades
        skill_bonus = min(len(skills) * 2, 10)
        
        final_score = min(base_score + education_bonus + experience_bonus + skill_bonus, 100)
        
        return {
            "applicationId": application_data.applicationId,
            "score": round(final_score, 2),
            "embeddings_shape": skill_embeddings.shape,  # Para verificar que los embeddings se generaron
            "projects_embeddings_shape": project_embeddings.shape if project_embeddings is not None else None
        }
    except Exception as e:
        raise Exception(f"Error en la predicción: {str(e)}")

@app.post("/predict")
async def predict(application_data: ApplicationData):
    try:
        score = predict_application_score(application_data)
        return {"success": True, "result": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "embeddings_model_loaded": model is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
