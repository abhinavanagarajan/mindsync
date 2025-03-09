# **AI-Powered Real-Time Stress Detection & Emergency Response System**

## **Overview**
This project is a **low-cost, AI-driven wearable system** designed to detect stress levels in real time using **Galvanic Skin Response (GSR) and Heart Rate (MAX30102) sensors**. Unlike existing smartwatches that rely solely on heart rate variability, our device uses a **multi-sensor approach** to achieve **97.7% accuracy** in detecting stress. 

When stress levels exceed a predefined threshold, the system **automatically sends alerts, provides stress management solutions, and initiates emergency response actions** such as triggering an SOS call (112) after prolonged distress.

---
## **Features**
- **Real-time stress detection** using **GSR and MAX30102 sensors**
- **AI-powered analysis** with a **97.7% accurate machine learning model**
- **Live data transmission** via WiFi to a cloud-based system
- **Emergency alerts & auto SOS calls** when stress remains high for over 5 minutes
- **Personalized stress management tools**, including **music therapy, podcasts, and relaxation games**
- **Comprehensive report generation** for daily, weekly, and monthly stress trends

---
## **Technical Specifications**
### **Hardware Components**
- **ESP32** (Microcontroller for wireless data transmission)
- **GSR Sensor** (Measures sweat gland activity as a stress indicator)
- **MAX30102 Heart Rate Sensor** (Detects heart rate variations linked to stress)
- **Battery & Charging Module** (For standalone functionality)

### **Software & AI Model**
- **Programming Languages**: Python, C++ (Arduino IDE for ESP32)
- **AI Model**: Custom-built **ML model trained on self-collected data**
- **Server & Backend**: Flask-based HTTP server for data handling
- **Frontend**: Web-based **real-time monitoring dashboard**
- **Communication Protocol**: WiFi-based MQTT/HTTP

---
## **How It Works**
1. **Wearable device tracks stress markers** (GSR & HR sensor readings).
2. **Data is transmitted** to a cloud server via WiFi.
3. **AI model analyzes stress levels** and compares them to threshold values.
4. **If stress exceeds the critical threshold:**
   - Alerts are sent to caregivers/emergency contacts.
   - Stress-relief interventions (music, games, podcasts) are provided.
   - If stress remains critical for **5+ minutes**, **an automated SOS call (112) is triggered**.
5. **Users can track their stress levels** via the web dashboard.

---
## **Installation & Setup**
### **Hardware Setup**
1. Connect the **GSR sensor** and **MAX30102** to the **ESP32**.
2. Power the ESP32 using a **3.7V Li-ion battery**.
3. Upload the firmware using **Arduino IDE**.

### **Software Setup**
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/stress-detection.git
   cd stress-detection
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python server.py
   ```
4. Deploy the web dashboard:
   ```bash
   cd frontend
   npm install
   npm start
   ```

---
## **Challenges Faced**
- **ESP32 Incompatibility**: AI model could not be directly deployed due to memory constraints.
- **MAX30102 Sensor Issues**: Sensor failed multiple times due to incorrect wiring and voltage mismatch.
- **Data Transmission Errors**: The HTTP server initially failed to receive data reliably from ESP32.
- **Model Optimization**: Required heavy tuning to achieve high accuracy with limited dataset.

---
## **Future Improvements**
- **Integration with Smartwatches & Wearables**
- **Bluetooth & Mobile App Connectivity**
- **Expanding AI Model for Personalized Stress Analysis**
- **Integration with Health Monitoring APIs for Medical Use**

---
## **Contributors**
- **Vishnu Swaroop G.** – Project Lead & AI Developer
- **[Team Members]** – Hardware, Software, and Web Development

---
## **License**
This project is **open-source** under the **MIT License**.

For inquiries, contact: [vishnugvs.2005@gmail.com](mailto:vishnugvs.2005@gmail.com)
