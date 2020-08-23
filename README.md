# PoliTalks | HackForThePeople Hackathon Project
Amit Harlev, Ingrid Tsang

## Inspiration
Recently I went on a hike with a friend of mine that I hadn't seen in over a year and we ended up chatting about politics. After a while, we realized that we were both hesitant to say what we believed due to past experiences where others got mad at us for having different opinions and beliefs then them. After realizing this, we both opened up and had a great discussion--disagreement stopped being a problem and became an opportunity to try thinking from a new perspective instead!

## What it does
Politalks lets you find people with different poetical ideologies so that you can have great discussions like the one I had with my friend while also learning how to have difficult discussions in a civilized manner. We hope that people will be able to take advantage of their differences to learn from each other instead of arguing. The goal of Politalks is not to convince others of your opinions, but to come out of the conversation feeling like you have a better understanding of the other person's point of view. We incentivize this behavior using a rating system. At the end of each conversation you'll rate each other for how respectful and civilized you were and this rating will be visible to others in the future before they agree to chat with you.

## How we built it
We built Politalks using Firebase's Firestore as our backend and ReactJS for our frontend. We also used bootstrap (specifically react-bootstrap) for making our pages look pretty :).

## Challenges we ran into
While we both had experience with React, neither of us had much experience using Firestore. This lead to challenges regarding how to structure our data properly (normalization vs denormalization in a noSQL database) as well as just the normal challenges that arise from using technology with which you're less familiar (needing to google every single thing you want to do even if its just a simple get or set from the database).

## Accomplishments that we're proud of
We're really proud that we made a fully functional app over the course of a single weekend! While there's definitely still room for improvement, we successfully completed all the core functionality and had time to polish up the appearance of our site. It's awesome that using a service like Firebase and a weekends worth of time that we made something that can support real users!

## What we learned
Apparently, when you discuss an idea verbally without being able to draw it out on a whiteboard, it's really easy to be saying the same things but have completely different images in your head. We ran into this problem a few times but by the end we got a lot better at describing our ideas in detail so that we would both be on the same page. On the technical side we both learned a lot about using Firestore (especially how to choose a reasonable data model, see challenges we ran into) and React.

## What's next for Politalks
Feature features include:
- Video and audio calling to allow for more in depth conversations
- Natural language processing to gauge how positive/negative people's messages are. If someone is being too negative we'll let them know and if it doesn't improve it will lower their rating.
- Politics are complicated and can't easily be summarized into a single dimension for each issue. In the future you should be able to place yourself on a larger selection of dimensions for each issue (think political compass chart).
- More resources about having productive political conversations about polarizing topics.
