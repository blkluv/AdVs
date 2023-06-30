import { useRef, useEffect, useState } from 'react';
import './App.css';
import * as faceapi from "face-api.js";

function App() {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ageGenderNet.loadFromUri('/models'),
    ]).then(() => {
      faceDetection();
    })
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err)
      });
  }

  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
      console.log(detections);
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      })

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
        // width: 1000,
        // height: 800,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
      resized.forEach(detection => {
        const box = detection.detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
        drawBox.draw(canvasRef.current)
      })
      
      gender.current = detections[0].gender;
      age.current = Math.round(detections[0].age);

      // this is the logic for the most dominant expression
      let expressions = detections[0].expressions;
      let sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
      // console.log(sortedExpressions[0][0]);
      emotions.current = sortedExpressions[0][0];

      // buisness logic for 18-24 ages
      if(age.current < 24 && age.current > 18 && emotions.current === "happy" ){
        let arr = ["fashion", "deals", "gifts"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 24 && age.current > 18 && emotions.current === "neutral" ){
        let arr = ["internships", "jobs", "youth"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 24 && age.current > 18 && emotions.current === "sad" ){
        let arr = ["discounts", "nightlife"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      // buisness logic for 25-34 ages
      else if(age.current < 34 && age.current > 25 && emotions.current === "happy" ){
        let arr = ["Home", "travel", "loans", "health"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 34 && age.current > 25 && emotions.current === "sad" ){
        let arr = ["work"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 34 && age.current > 25 && emotions.current === "neutral" ){
        let arr = ["Home", "travel", "loans", "health"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      // buisness logic for 35-44 ages
      else if(age.current < 44 && age.current > 35 && emotions.current === "happy" ){
        let arr = ["Home", "luxury", "buisness", "wellness"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 44 && age.current > 35 && emotions.current === "sad" ){
        let arr = ["lifeinsurance"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current < 44 && age.current > 35 && emotions.current === "neutral" ){
        let arr = ["family", "services", "wellness"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      // buisness logic for 45-100 ages 
      else if(age.current > 45 && emotions.current === "happy" ){
        let arr = ["Home", "luxury", "education", "health"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current > 45 && emotions.current === "sad" ){
        let arr = ["financial", "investement"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
      else if(age.current > 45 && emotions.current === "neutral" ){
        let arr = ["parent", "home", "retirement", "senior","insurance"];
        let randomIndex = Math.floor(Math.random() * arr.length);
        let randomElement = arr[randomIndex];
        setSearch(randomElement);
      }
    }, 8000)
  }

  const gender = useRef();
  const age = useRef();
  const emotions = useRef();
  const [search, setSearch] = useState("Clothing");
  const accesstoken = "EABDiieDamvYBAPMcskzNuZAa7hPC0n2GtT4kp7bt6EpCHsACJ0WISvMeDEYZBP8zA3nKZBUwrQe6koV17isVZBP1W9znJEk7E3X5AIOYXjOm273HAjCd6VGKDfOsCZCnHpNqqoXHT8LZBw0H1hJSdcV2o8cYIyiZCP22NZAMp33P8xGcbWM19Gkpkd9IZAo7Ie9bZB3VqgoYZC1xV4VJcTA3njR0ZCydcgF49LmvDsmBfkZCQZAUZBaNDtMDlY7zWTcwszIQVMZD";

    useEffect(() => {
      if(search && age.current && gender.current !== undefined){
        fetch(`https://graph.facebook.com/v15.0/ads_archive?ad_reached_countries=US&search_terms=${search}?age=${age.current}?gender=${gender.current}&transport=cors&access_token=${accesstoken}`)
        .then((Response) => Response.json())
        .then((data) => {
          let randomIndex = Math.floor(Math.random() * data.data.length);
          console.log("asdasd", data.data[randomIndex]["ad_snapshot_url"]);
          window.open(data.data[randomIndex]["ad_snapshot_url"], "_blank");
        }) 
        .catch(error => {
          console.log(`https://graph.facebook.com/v15.0/ads_archive?ad_reached_countries=US&search_terms=${search}?age=${age.current}?gender=${gender.current}&transport=cors&access_token=${accesstoken}`, error);
        });
      }
    }, [search]); 
    
  return (
    <div className="app">
      <div className='app__video'>
        <video crossOrigin='anonymous' ref={videoRef} autoPlay ></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className='app__canvas' />
    </div>
  );
}

export default App;
