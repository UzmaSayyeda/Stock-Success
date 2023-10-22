import sqlalchemy as sql
import pandas as pd

engine = sql.create_engine("sqlite:///stock_market.db")

import yfinance as yf
from datetime import datetime

start_date = datetime.now() - pd.DateOffset(months=60)
end_date = datetime.now()


tickers = ["XOM","CVX","SHW","DD","UPS","RTX","DUK","ED","JNJ","PFE","AMZN","MCD","KO","PG","AAPL","MSFT","GOOG","META"]

df_list = []

for ticker in tickers:
    data = yf.download(ticker, start=start_date, end=end_date)
    df_list.append(data)

df = pd.concat(df_list, keys=tickers, names=["Ticker", "Date"])
df.tail()

df.reset_index(inplace=True)

print(df.sample(10))

df.to_sql("stock_market", engine, if_exists="replace")