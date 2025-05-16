#!/usr/bin/env python3
import sys
import json
import random  # Just for demonstration

def predict_application_score(application_data):
    """
    This is a placeholder function. Replace this with your actual prediction model.
    
    Parameters:
    application_data (dict): The application data from the form submission
    
    Returns:
    dict: The prediction results with the score
    """
    # In a real implementation, you would:
    # 1. Load your trained model
    # 2. Preprocess the application data
    # 3. Run the prediction
    # 4. Return the results
    
    # For demonstration, we'll just return a random score
    skills = application_data.get('skills', [])
    education_level = application_data.get('education', {}).get('highestLevel', '')
    experience = application_data.get('experience', {}).get('totalYears', '')
    
    # Simple scoring logic (replace with your actual model)
    base_score = random.uniform(50, 90)
    
    # Adjust score based on education
    education_bonus = {
        "High School": 0,
        "Associate's Degree": 5,
        "Bachelor's Degree": 10,
        "Master's Degree": 15,
        "Doctorate": 20,
    }.get(education_level, 0)
    
    # Adjust score based on experience
    experience_bonus = {
        "0-1 years": 0,
        "1-3 years": 5,
        "3-5 years": 10,
        "5-10 years": 15,
        "10+ years": 20,
    }.get(experience, 0)
    
    # Adjust score based on number of skills
    skill_bonus = min(len(skills) * 2, 10)
    
    final_score = min(base_score + education_bonus + experience_bonus + skill_bonus, 100)
    
    return {
        "applicationId": application_data.get('applicationId'),
        "score": round(final_score, 2)
    }

if __name__ == "__main__":
    # Get the JSON data passed as a command-line argument
    if len(sys.argv) > 1:
        try:
            application_data = json.loads(sys.argv[1])
            result = predict_application_score(application_data)
            # Print the result as JSON so it can be captured by the Node.js process
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    else:
        print(json.dumps({"error": "No application data provided"}))
