from flask import Flask, render_template, jsonify
import sqlite3
import subprocess

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data/<ticker>")
def get_data(ticker):
    conn = sqlite3.connect("test_stock_market1.db")
    cursor = conn.cursor()
    query = f"SELECT * FROM test_stock_market1 WHERE Ticker = '{ticker}'"
    data = cursor.execute(query).fetchall()

    column_names = [column[0] for column in cursor.description]
    data = [dict(zip(column_names, row)) for row in data]
    
    conn.close()
    return jsonify(data)




@app.route("/update_db")
def update_db():
    subprocess.call(["python", "db.py"])
    return "Database update Finished."




if __name__ == "__main__":
    app.run(debug=True)