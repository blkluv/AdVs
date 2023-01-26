# Adverie

## The New Way To Target Ads At Consumers.

https://user-images.githubusercontent.com/92615235/214764587-b36e7068-4b50-493b-a5c2-1c03aeeac14d.mp4

#### Consumers passing by a digital banner in a mall or another location with ADVERIE software installed will be able to see the most relevant and customized advertisements based on their physical characteristics and types of equipment, increasing their interest in the ads and lowering the cost to the advertising company because they only have to pay for the duration of the display when they have the targeted audience. The firm will save money on advertising by not paying for periods when there is no audience to see the advertisement. Aside from this advertising, ADVERIE will also collect public feedback based on the passer's state reactions and other characteristics such as the duration of the passer's involvement with the banner, and send it to the advertising company's analytics field to improve their services or advertisement. The program would lessen public involvement in viewing advertisements in physical areas since they would not need to involve themselves to see their desired advertisement. Making the consumer experience more pleasant reduces the time between noticing and acquiring the product, which also benefits the advertising business.

## Technologies

**Client:** React, A javascript library for building UI.

|  models  	|                            Github                                  	|
|:--------:	|----------------------------------------------------------------------	|
| coco-ssd 	| https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd       	|
| posenet  	| https://github.com/tensorflow/tfjs-models/tree/master/pose-detection 	|

**API's:**
- [Meta Ad Library API](https://www.facebook.com/ads/library/api/?source=nav-header)
- [Face API](https://justadudewhohacks.github.io/face-api.js/docs/index.html)

**Packages:**
```
    "axios": "^1.2.3",
    "face-api.js": "^0.22.2",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.6.2",
    "react-scripts": "5.0.0",
    "react-webcam": "^7.0.1",
    "web-vitals": "^2.1.4"
```



## Architecture
![alt text](https://raw.githubusercontent.com/ajaysinghpanwar2002/Adverie/main/assets/adveriearchitecture.png)


## Demo Video 
https://user-images.githubusercontent.com/92615235/213909739-ac45fa89-9cae-4cd7-9617-edcd699c219e.mp4

## Presentation

- [Google Doc](https://docs.google.com/presentation/d/1hRRgJOeYDQbmXxmWivBtOfguw_bynbiST_7V_2DzgH4/edit?usp=sharing)

- [YouTube](https://www.youtube.com/watch?v=yp_HWlSnIzU)
## Run Locally

1) Clone the project

```bash
  git clone https://github.com/ajaysinghpanwar2002/Adverie.git
```

2) Go to the project directory

```bash
  cd adverie-face
```

3) Install dependencies

```bash
  npm install
```

4) Access Token, Meta Ad Library

```bash
  https://www.facebook.com/ads/library/api/
```
Step 1: We'll need to confirm your identity and location
Go to Facebook.com/ID. This is the same ID confirmation required to become authorised to run ads about social issues, elections or politics. If you haven't already confirmed your ID, it typically takes 1-2 days to complete this step.

Step 2: Create a Meta for Developers account
Visit Meta for Developers and select Get started. As part of account creation, you'll need to agree to our Platform Policy.

Step 3: Add a new app
Once you have an account, return to this web page and select Access the API to begin making queries. You can create a new app by selecting My apps > Add new app. You need to have a role or be assigned a role by the app owner to continue.

5) Start the server

```bash
  npm run start
```


## Feedback

If you have any feedback, please reach out to us at adverie.help@gmail.com

