import requests
import sqlite3
import sqlalchemy as sql
import pandas as pd

conn = sqlite3.connect("test_stock_market.db")
cursor = conn.cursor()

engine = sql.create_engine("sqlite:///test_stock_market.db")

import yfinance as yf
from datetime import datetime

start_date = datetime.now() - pd.DateOffset(months=3)
end_date = datetime.now()


''' "CVX","SHW","DD","UPS","RTX","DUK","ED","JNJ","PFE","AMZN","MCD","KO","PG","AAPL","MSFT","GOOG","META" '''
tickers = ["XOM"]

df_list = []

for ticker in tickers:
    data = yf.download(ticker, start=start_date, end=end_date)
    df_list.append(data)

df = pd.concat(df_list, keys=tickers, names=["Ticker", "Date"])
df.tail()

df.reset_index(inplace=True)

print(df.sample(10))

df.to_sql("test_stock_market", engine, if_exists="replace")

conn.commit()
conn.close()
