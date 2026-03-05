# 🔍 Customer Churn Predictor  
### AI-Powered Bank Customer Retention Prediction System

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/Backend-Flask-black)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)
![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-orange)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

Customer Churn Predictor is a full-stack Machine Learning web application that predicts whether a bank customer is likely to leave (churn) based on financial and behavioral attributes.

It combines:

- 🤖 Gradient Boosting ML Model  
- ⚙️ Flask REST API  
- ⚛️ React + Vite Frontend  
- 📊 Real-time probability visualization  

---

# 📌 Overview

Customer churn directly impacts revenue in banking and fintech industries.

This system:

- Analyzes customer financial data  
- Applies engineered behavioral features  
- Predicts churn probability  
- Provides real-time visual feedback  

The model achieves strong performance with optimized cross-validation.

---

# ✨ Features

- ✅ Real-time churn prediction  
- ✅ Probability-based output (not just binary)  
- ✅ Engineered financial features  
- ✅ REST API architecture  
- ✅ Clean modern dark UI  
- ✅ Production-ready backend  
- ✅ Cross-validated ML performance  
- ✅ Easy deployment (Render + Vercel)  

---

# 🧠 Machine Learning Model

| Metric | Value |
|--------|--------|
| Algorithm | Gradient Boosting Classifier |
| Dataset Size | 10,000 customers |
| Test ROC AUC | **0.8692** |
| Test Accuracy | **86.8%** |
| CV ROC AUC (5-Fold) | **0.8628 ± 0.0097** |

---

## 🔬 Feature Engineering

The model includes custom engineered features:
```sh
- `balance_per_product`
- `salary_balance_ratio`
- `age_group`
- `tenure_bucket`
- `high_balance` (75th percentile threshold)
```
---

## 📊 Top Predictors

1. Age  
2. Number of products  
3. Balance per product  
4. Account balance  
5. Active membership status  

---

# 📁 Project Structure
```sh
Customer-Churn-Prediction/
├── Analysis.ipynb
├── README.md
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── best_churn_pipeline.pkl
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        └── main.jsx
```
---

# 🚀 Installation Guide

1️⃣ Clone Repository

git clone https://github.com/ishitadey955/AI_Churn_Predictor_App.git 
cd Customer-Churn-Prediction  

---

3️⃣ Run Backend
```sh
cd backend  
pip install -r requirements.txt  
python app.py  
```
Backend runs at:

http://localhost:5000  

Test API:

curl http://localhost:5000/health  

Expected response:

{"status": "ok"}  

---

4️⃣ Run Frontend

Open a new terminal:
```sh
cd frontend  
npm install  
npm run dev  
```
Frontend runs at:

http://localhost:5173  

---

# 🔌 API Documentation

POST /predict  

Predicts churn probability.

Request Body:

{
  "credit_score": 650,
  "country": "France",
  "gender": "Male",
  "age": 40,
  "tenure": 3,
  "balance": 50000.0,
  "products_number": 2,
  "credit_card": 1,
  "active_member": 1,
  "estimated_salary": 60000.0
}

Response:

{
  "churn": 0,
  "probability": 0.0304
}

---

GET /health  

Returns API status.

{ "status": "ok" }

---

# 🌍 Deployment

Backend → Render  

Root Directory: backend  
Build Command: pip install -r requirements.txt  
Start Command: gunicorn app:app  

Frontend → Vercel  

Root Directory: frontend  
Update API URL inside App.jsx  
Deploy  

---

# 📈 Model Comparison

Model                     ROC AUC  
Logistic Regression       0.7877  
Random Forest             0.8486  
Gradient Boosting         0.8628  
AdaBoost                  0.8462  
SVC                       0.8351  

Gradient Boosting delivered the best performance and was selected for deployment.

---

# Author

Made by **Ishita Dey**  
Feel free to ⭐ the repo if you found it useful!
