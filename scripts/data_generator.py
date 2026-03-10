import psycopg2
from dotenv import load_dotenv
import random

load_dotenv("../backend/.env")

connection = psycopg2.connect(
    host="localhost",
    database="healthcare_db",
    user="postgres",
    password="postgres123",
    port="5432"
)

cursor = connection.cursor()

diagnosis_list = ["Flu", "Diabetes", "Hypertension", "Asthma", "Cold"]

for i in range(1, 101):
    name = f"Patient{i}"
    age = random.randint(20, 70)
    gender = random.choice(["Male", "Female"])
    phone = f"0400{random.randint(100000,999999)}"
    email = f"patient{i}@health.com"
    diagnosis = random.choice(diagnosis_list)

    cursor.execute(
        """
        INSERT INTO patients (full_name, age, gender, phone, email, diagnosis)
        VALUES (%s,%s,%s,%s,%s,%s)
        """,
        (name, age, gender, phone, email, diagnosis)
    )

connection.commit()
cursor.close()
connection.close()

print("100 patients inserted successfully.")