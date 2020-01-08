# Level 2, One

The goal of this problem is to check your ability to make web requests. A frequent operation that we have to do in VandyHacks is have our website retrieve data from the backend. For example, when a hacker loads Vaken (our hackathon registration system, open sourced [here](https://github.com/Vandyhacks/vaken)), we have to load if they've been accepted to VandyHacks as well as their name and such. In this problem, you'll be using an API from NASA, specifically their "Astronomy Photo of the Day" API. Here's a sample way to access it:

https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-07-20 

That specific URL will give you a JSON describing the photo of the day for July 20th, 2019. Additionally, notice how the URL contains a chunk that says "api_key=DEMO_KEY". DEMO_KEY is a placeholder that NASA uses but it has very strict usage limits that you'll probably go over when doing this problem. To rectify this, go to [this](https://api.nasa.gov/) URL, fill out the form, and you'll be given your own API key with much larger limits. 

For this problem, you'll be provided a JSON array of dates in YYYY-MM-DD format (the same format that NASA uses). Return the `hdurl` (NOT the `url`) for each of those dates in the same order as the original JSON array.