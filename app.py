from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data/<ticker>")
def get_data(ticker):
    conn = sqlite3.connect("test_stock_market.db")
    cursor = conn.cursor()
    query = f"SELECT * FROM test_stock_market WHERE Ticker = '{ticker}'"
    data = cursor.execute(query).fetchall()
    conn.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)