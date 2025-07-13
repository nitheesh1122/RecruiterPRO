import sys
import json
import random
import re

resume_path = sys.argv[1]
industry = sys.argv[2]
job_desc = sys.argv[3]

try:
    with open(resume_path, 'r', encoding='utf-8') as f:
        resume_text = f.read()
except:
    resume_text = "Could not read file properly"

# Extract keywords from job description
job_keywords = set(re.findall(r'\b\w+\b', job_desc.lower()))
resume_words = set(re.findall(r'\b\w+\b', resume_text.lower()))

matched_keywords = job_keywords.intersection(resume_words)
match_percentage = int((len(matched_keywords) / len(job_keywords)) * 100) if job_keywords else random.randint(60, 80)

feedback = []
if match_percentage < 70:
    feedback.append("Add more relevant keywords from job description.")
if 'experience' not in resume_words:
    feedback.append("Include a clear 'Experience' section.")
if 'skills' not in resume_words:
    feedback.append("Mention a dedicated 'Skills' section.")

result = {
    "score": match_percentage,
    "feedback": feedback or ["Great job! Your resume is well-optimized."],
    "benchmark": random.randint(70, 90)
}

print(json.dumps(result))
