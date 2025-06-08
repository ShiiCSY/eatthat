# EatTHAT!

EatTHAT! is a full-stack web app using Supabase and Google Places API to recommend nearby restaurants. Logged real user actions in a PostgreSQL backend, enabling real-time analytics and SQL-based behavioral insights.

![Screenshot 2025-06-08 at 5 10 48 PM](https://github.com/user-attachments/assets/0ff7124d-5006-47fd-82fb-b08dd32f10fa)



<h3>Key Features</h3>

<br>	•	🎰 Slot machine-style interface
<br>	•	📍 Auto-detects user’s location (GPS or IP fallback)
<br>	•	🍜 Displays restaurant name, address, rating, and price level
<br>	•	🗺️ Shows location on Google Maps with markers
<br>	•	🔁 “Try Again” button to reroll a new option
<br>	•	✅ “That’s it” button to confirm a choice and log history
<br>	•	🧠 Logs user decisions to Supabase for analytics


<h3>Tech Stack</h3>

| Layer    | Technology |
| -------- | ------- |
| Frontend | Vite + Vanilla JS + HTML/CSS |
| Mapping | Google Maps & Places JavaScript API     |
| Database   | Supabase (PostgreSQL-based)    |
| Hosting   | GitHub Pages    |
| Data Collection  | Supabase logging with user geolocation & distance    |
| Visualization (Planned)    | Tableau or Supabase dashboard    |

<h3>(User Interface)</h3>

![Screenshot 2025-06-08 at 5 17 48 PM](https://github.com/user-attachments/assets/e1a14d89-cfb8-4d23-940f-e4b7c6270931)

<h3>🔍 How It Works</h3>
<br>	1.	On page load, the app fetches the user’s geolocation using the browser’s navigator.geolocation.
<br>	2.	If denied or failed, it uses IP-based fallback via ipwho.is.
<br>	3.	Once a user clicks the main button:
<br>	  &nbsp&nbsp  •	A restaurant is randomly selected from Google Places API nearby results.
<br>	  &nbsp&nbsp  •	A marker appears on the map, and details are shown.
<br>	4.	If the user presses:
<br>	 &nbsp&nbsp   •	“Try Again”: logs a reject in Supabase and shows a new restaurant.
<br>	 &nbsp&nbsp   •	“That’s it”: logs an acceptance and stores the pick in LocalStorage.


<h3>🛠 Future Improvements</h3>
<br>	•	👍 Add “Too Far” and “Don’t Like It” buttons for more complex features
<br>	•	👤 Optional user login to track individual preferences
<br>	•	📊 Realtime dashboard with usage data
<br>	•	🧠 Use ML to recommend based on past likes/rejects
<br>	•	🗺️ Add price range and distance from user
