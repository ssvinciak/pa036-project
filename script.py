import requests
import urllib3
from datetime import datetime, timedelta
from sys import argv


cache_type = argv[1]
from_date = argv[2]
to_date = argv[3]

from_date_object = datetime.strptime(from_date, '%Y-%m-%d %H:%M:%S.%f')
to_date_object = datetime.strptime(to_date, '%Y-%m-%d %H:%M:%S.%f')

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

for x in range(50):
    for y in range(50):
        requests.get('https://localhost:5001/api/data?cacheType='+ cache_type +'&from='+ from_date+'&to=' + to_date, verify=False)
    from_date_object = from_date_object + timedelta(hours=1)
    to_date_object = to_date_object + timedelta(hours=1)
    from_date = from_date_object.strftime('%Y-%m-%d %H:%M:%S.%f')
    to_date = to_date_object.strftime('%Y-%m-%d %H:%M:%S.%f')

