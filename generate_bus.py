from pykafka import KafkaClient
import json
from datetime import datetime
import time
import pandas as pd
input_file = pd.read_csv('./data/sample.csv')
#KAFKA PRODUCER
client = KafkaClient(hosts="localhost:9092")
topic = client.topics['bus_2019_brazil']
producer = topic.get_sync_producer()

#CONSTRUCT MESSAGE AND SEND IT TO KAFKA
data = {}

def generate_checkpoint(coordinates):
    i = 0
    while i < len(coordinates):
        t1 = time.time()
        old_unix_time = time.mktime(datetime.strptime(f"{coordinates.iloc[i]['date']} {coordinates.iloc[i]['time']}",\
            '%m-%d-%Y %H:%M:%S').timetuple())
        data['date'] = coordinates.iloc[i]['date']
        data['time'] = coordinates.iloc[i]['time']
        data['order'] = coordinates.iloc[i]['order']
        data['line'] = coordinates.iloc[i]['line']
        data['latitude'] = coordinates.iloc[i]['latitude']
        data['longitude'] = coordinates.iloc[i]['longitude']
        data['speed'] = coordinates.iloc[i]['speed']
        data['delta_time'] = (time.time() - old_unix_time)*1000
        message = json.dumps(data)
        producer.produce(message.encode('ascii'))
        if i != len(coordinates) -1:
            next_unix_time = time.mktime(datetime.strptime(f"{coordinates.iloc[i+1]['date']} {coordinates.iloc[i+1]['time']}",\
            '%m-%d-%Y %H:%M:%S').timetuple())
        else:
            next_unix_time=9999999999999
        delta_exe_time = time.time()-t1
        time.sleep(int(next_unix_time)-int(old_unix_time)-delta_exe_time)
        #if bus reaches last coordinate, start from beginning
        if i == len(coordinates)-1:
            i = 0
        else:
            i += 1
generate_checkpoint(input_file)
