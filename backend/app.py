from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)  

pipeline = joblib.load("best_churn_pipeline.pkl")

BALANCE_75TH = 127644.24  

def engineer_features(data: dict) -> pd.DataFrame:
    df = pd.DataFrame([data])
    
    df['balance_per_product'] = df['balance'] / df['products_number'].replace(0, np.nan)
    df['balance_per_product'].fillna(0, inplace=True)
    
    df['salary_balance_ratio'] = df['estimated_salary'] / df['balance'].replace(0, np.nan)
    df['salary_balance_ratio'].replace([np.inf, -np.inf], np.nan, inplace=True)
    df['salary_balance_ratio'].fillna(df['salary_balance_ratio'].median(), inplace=True)
    
    bins = [0, 25, 35, 45, 55, 65, 100]
    labels = ['<25', '25-34', '35-44', '45-54', '55-64', '65+']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels)
    
    df['tenure_bucket'] = pd.cut(df['tenure'], bins=[-1, 0, 2, 5, 10, 100],
                                  labels=['0', '1-2', '3-5', '6-10', '10+'])
    
    df['high_balance'] = (df['balance'] > BALANCE_75TH).astype(int)
    
    return df

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        df = engineer_features(data)
        pred = int(pipeline.predict(df)[0])
        prob = float(pipeline.predict_proba(df)[0, 1])
        return jsonify({"churn": pred, "probability": round(prob, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)