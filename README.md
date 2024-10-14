# 🚌 Bus GPS Real-time Visualization 🗺️

This project brings the bustling streets of Rio de Janeiro to life, showcasing real-time bus locations using the power of Kafka and Flask. Get ready to watch your virtual buses navigate the city, all powered by actual GPS data! 

## 🏗️ Getting Started

### 1.  The Data 📊
   - This project uses GPS data from Rio de Janeiro buses, available on Kaggle: [GPS data from Rio de Janeiro buses](https://www.kaggle.com/datasets/igorbalteiro/gps-data-from-rio-de-janeiro-buses).
   - Download and extract the data to the `data` folder within the project.

### 2. Libraries and Platform used.

#### 2.1 Kafka
Kafka enables rapid transmission of bus location updates, making the visualization truly dynamic.
    
  - Producer (generate_bus.py): Sends simulated bus location data to a Kafka topic. The data is extracted and processed from the Rio de Janeiro bus dataset.
  
  - Consumer (Flask Server): Listens to the specific Kafka topic, receiving the latest bus location updates in real-time.

#### 2.2 Flask
To create a web service.
    
  - Receives bus location updates from Kafka.

  - Stores the latest data in memory.

  - Serves the data to the frontend web application (the map).

#### 2.3 Leaflet
This is a powerful JavaScript library for creating interactive maps.
    
  - Map Display: Leaflet renders the map on the frontend, providing the visual canvas for the bus locations.

  - Data Visualization: It receives the bus location data from the Flask server and dynamically places markers on the map to represent the buses.

  - User Interaction: Leaflet enables features like zooming, panning, and potentially adding additional map layers.
        
#### 2.4 Docker
A containerization platform that simplifies the creation, deployment, and running of applications in isolated environments (containers).
    
  - Consistent Environment: Docker helps ensure that the application (Kafka, Flask, and the frontend) runs consistently across different machines and development setups.

  - Deployment Simplification: It makes deployment easier, allowing you to package the entire application into a single container that can be easily deployed to different servers or cloud environments.

### 3. Set up Kafka

Run the following command to start Kafka in Docker:

 ```bash
 docker-compose -f docker-kafka.yml up
 ```

### 4. Install dependencies

Install the required libraries:

 ```bash
 pip install -r requirements.txt
 ```

### 5.  Run the application!

- Start the Kafka producer (simulating bus movements based on the real data):
    
 ```bash
 python generate_bus.py
 ```

-  Start the Flask server to handle data and visualization:

 ```bash
 python app.py
 ```

  -  Open your web browser and surf to `http://127.0.0.1:5000` to see the magic happen! 🎉

### 6. Demonstration

[![Demo](demo.gif)](https://github.com/danhtran8mind/bus-gps-real-time-visualization/blob/main/demo.gif)

## 🧠 Behind the Scenes

**Let's break down the components:**

- **Kafka Producer 📨:** Simulates real-time bus location data (using the Rio de Janeiro bus data) and sends it to a Kafka topic. Think of it as the bus driver reporting its location.
- **Kafka Consumer 👂:** Listens to the Kafka topic for bus updates and sends them to the Flask server. It's like the central dispatcher receiving information.
- **Flask Server 💻:** Receives bus location data, stores it, and serves it to a web application for visualization. This is the brains of the operation, keeping track of everything.
- **Frontend 🌐:**  A simple HTML/JavaScript application (powered by Leaflet) that displays bus locations on a map. This is what you see and interact with!

## ⚡️ Key Features

- **Real-time data:** Bus locations update in real-time thanks to Kafka.
- **Scalability:** Easily add more buses and handle more data with Kafka.
- **Flexibility:** Extend the system to integrate with other data sources and applications.

## 🚀 Next Steps

- **Add more features!** 
  -  Visualize bus routes.
  -  Show bus schedules.
  -  Let users interact with the map.
- **Persistent storage:** Store bus locations in a database for future analysis.
- **Cloud deployment:** Make your application accessible to everyone! 🌎

This is just the beginning! Use this project as a foundation to build an amazing real-time bus tracking system.

**Have fun exploring and customizing!** 

## References
[1] Igor Balteiro, "# GPS data from Rio de Janeiro buses". Available at: https://www.kaggle.com/datasets/igorbalteiro/gps-data-from-rio-de-janeiro-buses
