 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Weather   Application – by Sani
-----------------------------------
This project is a weather forecast web application built using **HTML, CSS and JavaScript**.  
The application retrieves real-time weather information from the **OpenWeather API** and displays it in a clean and user-friendly interface.  
The goal of this project was to understand weather APIs, asynchronous JavaScript (fetch), DOM manipulation, and UI development.

 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# App Features  
-----------------
1.  Location-Based Weather Search
2.  Auto Location (GPS)
3.  Temperature Unit Toggle
4. Weather-Based Background Video
5.  Custom Weather Alert
6. Recently Searched Cities
7. Extended Forecast
8. Voice Weather Assistant
9. Error Handling
10. Smart Auto-Suggestion (Search Prediction)

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Location-Based Weather Search
------------------------------------
- Users can search weather by city name.
- Current weather information includes temperature, feels like, humidity, wind, AQI, pressure, sunrise and sunset.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Auto Location (GPS)
--------------------------
- On page load, the app automatically fetches weather for the user’s current location.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Temperature Unit Toggle
-------------------------------
- Users can switch between **°C and °F**.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Weather-Based Background Video
------------------------------------
The background changes dynamically based on the current weather condition:
|             Condition               |               Background               |
|-------------------------------------|----------------------------------------|
|            Clear/Sunny              |            sunny.mp4                   |
|            Cloudy                   |            cloud.mp4                   |
|            Rain                     |            rain.mp4                    |
|            Snow                     |            snow.mp4                    |
|            Thunderstorm             |            storm.mp4                   |
|            Night (any weather)      |            night.mp4                   |

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Custom Weather Alert
---------------------------
- If the temperature crosses **40°C**, an alert message appears.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Recently Searched Cities
-------------------------------
- The app stores the last 5 searched cities using localStorage and populates them in a dropdown.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
# Extended Forecast
------------------------
- Next **24-hour forecast** and **7-day weekly forecast** with temperature and time/date.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Voice Weather Assistant
----------------------------
- Users can tap the microphone button to hear the weather through text-to-speech.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#   Error Handling
--------------------
- Invalid locations and empty searches show a clean, user-friendly error message (not JS alert).

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#   Smart Auto-Suggestion (Search Prediction)
-----------------------------------------------
- While typing city name, a list of matching cities appears.
- Clicking a suggestion fetches the weather instantly.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 
#  Technologies Used
------------------------

|               Area           |                Technologies           |
|------------------------------|---------------------------------------|
|             Markup           |            HTML                       |
|            Styling           |            CSS (Glassmorphism UI)     |
|              Logic           |            JavaScript                 |
|                API           |            OpenWeatherMap API         |



 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

#  Project Folder Structure
----------------------------

**Weather By Sunny-folder**
├─ index.html 
├─ style.css
├─ script.js 
└─ **video**
 ├─ sunny.mp4
 ├─ cloud.mp4 
 ├─ rain.mp4 
 ├─ snow.mp4 
 ├─ storm.mp4
 ├─ night_cloud.mp4 
 ├─ night_rain.mp4 
 ├─ nigth_cloud.mp4 
 ├─ night_storm.mp4 
 ├─ ssnow.mp4 
 ├─ darkcloud.mp4
 └─ night.mp4


 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

#  How to Run the Project
---------------------------
1. Download   the project folder.
2. Open index.html in any browser.
3. Select your city and search city form the search bar.
4. Make sure you have an active internet connection (API fetch required).
5. Replace your **OpenWeather API key** inside script.js:

 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

#  Learnings from this Project
--------------------------------
While building this application, I understood:
- How to fetch data from third-party APIs.
- Working with JSON responses and async/await.
- DOM manipulation and event handling.
- Temperature conversion logic.
- Error handling in UI.
- Web UI design using CSS glass effects.

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

#  Future Improvements (Optional)
---------------------------------
- Dark & Light theme toggle
- Hourly forecast graph
- Multiple language support

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  GitHUB link
-----------------


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
#  Developer
---------------
Project created by **Sani** (as part of Internshala Training Assignment).

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\     SANI    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 
]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] 