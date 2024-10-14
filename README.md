# 🚌 Bus GPS Real-time Visualization 🗺️

This project brings the bustling streets of Rio de Janeiro to life, showcasing real-time bus locations using the power of Kafka and Flask. Get ready to watch your virtual buses navigate the city, all powered by actual GPS data! 

## 🏗️ Getting Started

### 1.  The Data 📊
   - This project uses GPS data from Rio de Janeiro buses, available on Kaggle: [GPS data from Rio de Janeiro buses](https://www.kaggle.com/datasets/igorbalteiro/gps-data-from-rio-de-janeiro-buses).
   - Download and extract the data to the `data` folder within the project.

### 2. Libraries and Platform used.


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

![Demo](demo.gif)

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
