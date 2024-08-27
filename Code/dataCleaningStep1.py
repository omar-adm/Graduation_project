import pandas as ps


#import the file with the name diabetes into csv dataframe called data 
data = ps.read_csv('diabetes.csv')

new_data = data.fillna({
    'PhysicallyActive':'less than half an hr',
    'Pregancies':0,
    'Pdiabetes':'no'
})

new_data['BPLevel'] = new_data['BPLevel'].str.replace('High', 'high')

new_data['BPLevel'] = new_data['BPLevel'].str.strip()
new_data['BPLevel'] = new_data['BPLevel'].str.replace('Low', 'low')


new_data['RegularMedicine'] = new_data['RegularMedicine'].str.replace('o', 'no')
new_data['RegularMedicine'] = new_data['RegularMedicine'].str.replace('nno', 'no')
new_data['Pdiabetes'] = new_data['Pdiabetes'].str.replace('0', 'no')


new_data['Diabetic'] = new_data['Diabetic'].str.strip()
new_data['Diabetic'].unique()
new_data['Diabetic'].value_counts()

data['Diabetic'] = data['Diabetic'].str.strip()

new_data['BMI'] = new_data['BMI'].fillna(round(new_data['BMI'].mean()))


data_rev = new_data.dropna()

data_rev.to_csv('orgninal_clean_dataset.csv', index=False)
