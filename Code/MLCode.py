import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score, matthews_corrcoef
from sklearn.metrics import precision_score, recall_score, f1_score
import matplotlib.pyplot as plt
import seaborn as sns

# Function to train and evaluate models
def train_and_evaluate(X_train, X_test, y_train, y_test):
    models = {
        'Logistic Regression': LogisticRegression(),
        'K Nearest Neighbour': KNeighborsClassifier(),
        'Support Vector Machine': SVC(probability=True),
        'Naive Bayes': GaussianNB(),
        'Decision Tree': DecisionTreeClassifier(),
        'Random Forest': RandomForestClassifier(),
        'Multi-layer Perceptron': MLPClassifier(max_iter=1000)
    }

    results = []

    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        accuracy = accuracy_score(y_test, y_pred)
        error_rate = 1 - accuracy
        sensitivity = recall_score(y_test, y_pred)
        specificity = recall_score(y_test, y_pred, pos_label=0)
        precision = precision_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        mcc = matthews_corrcoef(y_test, y_pred)
        cv_accuracy = np.mean(cross_val_score(model, X_train, y_train, cv=10))
        auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])

        results.append({
            'Model': name,
            'Accuracy': accuracy,
            'Error Rate': error_rate,
            'Sensitivity': sensitivity,
            'Specificity': specificity,
            'Precision': precision,
            'F-Measure': f1,
            'MCC': mcc,
            '10-fold CV': cv_accuracy,
            'AUC': auc
        })

    return pd.DataFrame(results)

#Load clean datasets 
our_data = pd.read_csv('clean_dataset_for_ML.csv.csv')

#Load pima datasets with replaced Outcome with Diabetic
pima_data = pd.read_csv('modified_diabetes_for_test.csv')

datasets = [our_data, pima_data]
dataset_names = ['Our Dataset', 'Pima Dataset']

for i, data in enumerate(datasets):
    print(f"\nAnalyzing {dataset_names[i]}:")

    # Assuming 'Diabetic' is your target variable
    X = data.drop('Diabetic', axis=1)
    y = data['Diabetic']

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train and evaluate models
    results = train_and_evaluate(X_train_scaled, X_test_scaled, y_train, y_test)

    # Display results
    print(results)

    # Optional: Save results to CSV
    #results.to_csv(f'results_{dataset_names[i]}.csv', index=False)

    # Plot variable importance for Random Forest
    rf_model = RandomForestClassifier()
    rf_model.fit(X_train_scaled, y_train)
    importances = rf_model.feature_importances_
    feature_importance = pd.DataFrame({'feature': X.columns, 'importance': importances})
    feature_importance = feature_importance.sort_values('importance', ascending=False)

    plt.figure(figsize=(10, 6))
    sns.barplot(x='importance', y='feature', data=feature_importance)
    plt.title(f'Feature Importance for {dataset_names[i]}')
    plt.tight_layout()
    plt.show()