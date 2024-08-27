import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder


# Load datasets (replace with your actual data loading code)
our_data = pd.read_csv('orgninal_clean_dataset.csv')

# Assuming 'our_data' is your DataFrame
our_data.describe(include='all')


# determine the non numeric columns 
non_numeric_cols = our_data.select_dtypes(include=['object']).columns
print(non_numeric_cols)


#processed_data = our_data.copy()
for col in non_numeric_cols:
    le = LabelEncoder()
    our_data[col] = le.fit_transform(our_data[col])
    
    
# save the result for the processed data
our_data.to_csv(f'clean_dataset_for_ML.csv', index=False)
