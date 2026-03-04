import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import GradientBoostingClassifier
import joblib

print("Loading data...")
df = pd.read_csv("customer_data.csv")

# Feature engineering
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

df['high_balance'] = (df['balance'] > df['balance'].quantile(0.75)).astype(int)

numeric_features = [
    'credit_score', 'age', 'tenure', 'balance', 'products_number',
    'estimated_salary', 'balance_per_product', 'salary_balance_ratio'
]
categorical_features = [
    'country', 'gender', 'credit_card', 'active_member',
    'age_group', 'tenure_bucket', 'high_balance'
]

df[categorical_features] = df[categorical_features].astype('object')

target = 'churn'
features = [c for c in df.columns if c not in [target, 'customer_id']]

X = df[features]
y = df[target]

numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer([
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', GradientBoostingClassifier(n_estimators=200, random_state=42))
])

print("Training model...")
pipeline.fit(X, y)

joblib.dump(pipeline, 'best_churn_pipeline.pkl')
print("✅ Model trained and saved as best_churn_pipeline.pkl")