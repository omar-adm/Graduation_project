import csv

def csv_column_to_row(input_file, output_file):
    # Read the input CSV file
    with open(input_file, 'r', newline='') as infile:
        reader = csv.reader(infile)
        data = list(reader)

    # Transpose the data (convert columns to rows)
    transposed_data = list(map(list, zip(*data)))

    # Write the transposed data to the output CSV file
    with open(output_file, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(transposed_data)

# Example usage
input_file = 'results_Pima Dataset.csv'
output_file = 'Edited_pima.csv'
csv_column_to_row(input_file, output_file)
            

