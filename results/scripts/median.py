#!/usr/bin/env python

import numpy as np
import pandas as pd
d = pd.read_csv("./time.csv")
df = pd.DataFrame(data=d)
print(len(df))
print(df.groupby(np.arange(len(df))//50).median().to_string(index=False))
