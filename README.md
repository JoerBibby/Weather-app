Weather Forecast  

NOTE: The fetch request does not work on the hosted version of the app, although it is working on the local version. Assumedly because of a security issue with the api blocking the request.

This is a weather forecast app, it makes use of the free openweathermap.org api. You can enter the name of a city anywhere in the world and then press search, at which point an api call is made and the api retrieves weather forecast data at intervals of three hours for the next five days. The most relevant parts of that data are then displayed. 

In the course of building this app I learned how to interact with apis, and how to change how that interaction functions on the basis of what the user does. The most challenging parts of the process were related to formatting and presenting the data, which came in the form of an array of 40 individual forecasts. I needed to display the correct forecast for the current time, and for that same time over the next four days. As well as displaying the correct dates above those forecasts which I would need to generate myself. This all required improving my Javascript fundamentals; for loops, array methods, date constructor, and so on.  

In the future I would like to add a feature which allows you to scroll through the time on a given day to see the earlier and later forecasts, and thus access the full scope of the forecast data provided.  

 
