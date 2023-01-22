import React, { useRef, useEffect, useState } from "react";

// 1. TODO - Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
import * as posenet from "@tensorflow-models/posenet";
// import * as faceapi from "face-api.js";

import Webcam from "react-webcam";
import "../styles/objects.css";

// 2. TODO - Import drawing utility here
import { drawRect } from "../utilities/ObjectUtilities";
import { drawKeypoints, drawSkeleton } from "../utilities/PoseUtilities";

function Objects() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // useEffect(()=>{
  //   loadModels();
  // },[]);

  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detectObj(net);
    }, 100);
  };

  const runPosenet = async () => {
    const net = await posenet.load(
      {
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      }
    )
    // loop and detect pose 
    setInterval(() => {
      detectPose(net)
    }, 100);
  };

  const detectObj = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections for objects 
      const obj = await net.detect(video);
      // console.log(obj);


      // Draw mesh
      const ctx1 = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx1);
    }
  };

  const detectPose = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections for poses 
      const pose = await net.estimateSinglePose(video);
      // console.log(pose);

      // 5. TODO - Update drawing utility
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  // const loadModels = () => {
  //   Promise.all([
  //     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  //     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  //     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  //     faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  //     faceapi.nets.ageGenderNet.loadFromUri('/models'),
  //   ]).then(() => {
  //     faceDetection();
  //   })
  // };

  // const faceDetection = async () => {
  //   setInterval(async () => {
  //     const detections = await faceapi.detectAllFaces(webcamRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
  //     console.log(detections);
  //     canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(webcamRef.current);
  //     faceapi.matchDimensions(canvasRef.current, {
  //       width: 940,
  //       height: 650,
  //     })

  //     const resized = faceapi.resizeResults(detections, {
  //       width: 940,
  //       height: 650,
  //     });

  //     faceapi.draw.drawDetections(canvasRef.current, resized)
  //     faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
  //     faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
  //     resized.forEach(detection => {
  //       const box = detection.detection.box
  //       const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
  //       drawBox.draw(canvasRef.current)
  //     })

  //     gender.current = detections[0].gender;
  //     age.current = Math.round(detections[0].age);

  //     // this is the logic for the most dominant expression
  //     let expressions = detections[0].expressions;
  //     let sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
  //     // console.log(sortedExpressions[0][0]);
  //     emotions.current = sortedExpressions[0][0];

  //     // buisness logic for 18-24 ages
  //     if(age.current < 24 && age.current > 18 && emotions.current === "happy" ){
  //       let arr = ["fashion", "deals", "gifts"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 24 && age.current > 18 && emotions.current === "neutral" ){
  //       let arr = ["internships", "jobs", "youth"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 24 && age.current > 18 && emotions.current === "sad" ){
  //       let arr = ["discounts", "nightlife"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     // buisness logic for 25-34 ages
  //     else if(age.current < 34 && age.current > 25 && emotions.current === "happy" ){
  //       let arr = ["Home", "travel", "loans", "health"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 34 && age.current > 25 && emotions.current === "sad" ){
  //       let arr = ["work"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 34 && age.current > 25 && emotions.current === "neutral" ){
  //       let arr = ["Home", "travel", "loans", "health"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     // buisness logic for 35-44 ages
  //     else if(age.current < 44 && age.current > 35 && emotions.current === "happy" ){
  //       let arr = ["Home", "luxury", "buisness", "wellness"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 44 && age.current > 35 && emotions.current === "sad" ){
  //       let arr = ["lifeinsurance"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current < 44 && age.current > 35 && emotions.current === "neutral" ){
  //       let arr = ["family", "services", "wellness"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     // buisness logic for 45-100 ages 
  //     else if(age.current > 45 && emotions.current === "happy" ){
  //       let arr = ["Home", "luxury", "education", "health"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current > 45 && emotions.current === "sad" ){
  //       let arr = ["financial", "investement"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //     else if(age.current > 45 && emotions.current === "neutral" ){
  //       let arr = ["parent", "home", "retirement", "senior","insurance"];
  //       let randomIndex = Math.floor(Math.random() * arr.length);
  //       let randomElement = arr[randomIndex];
  //       setSearch(randomElement);
  //     }
  //   }, 15000)
  // }

  // const gender = useRef();
  // const age = useRef();
  // const emotions = useRef();
  // const [search, setSearch] = useState("Clothing");
  // const accesstoken = "EABZASJJ0RRIoBAOyePlRZCYLkuOMJk9hxOUSy4MGZCfYO56M38CgXGA8iTmtMbj1EMtC04F2nu3qUF3ZAZCPeIiLhdeEJBHoaONAKiymv9ZCZBPGOjpP5hIVbuM4ykvmZB312iwRjixA3kye1dNN81x2VhJfWXiEtLKzCZAd3CELQhPpHof0GZCjnJwKDn2w5vxP4SNMHtKitdvGrZAz3hsY5IuBs7oiksDFzMZD";

  // useEffect(() => {
  //   if (search && age.current && gender.current !== undefined) {
  //     fetch(`https://graph.facebook.com/v15.0/ads_archive?ad_reached_countries=US&search_terms=${search}?age=${age.current}?gender=${gender.current}&transport=cors&access_token=${accesstoken}`)
  //       .then((Response) => Response.json())
  //       .then((data) => {
  //         let randomIndex = Math.floor(Math.random() * data.data.length);
  //         // console.log("asdasd", data.data[randomIndex]["ad_snapshot_url"]);
  //         window.open(data.data[randomIndex]["ad_snapshot_url"], "_blank");
  //       })
  //       .catch(error => {
  //         console.log(`https://graph.facebook.com/v15.0/ads_archive?ad_reached_countries=US&search_terms=${search}?age=${age.current}?gender=${gender.current}&transport=cors&access_token=${accesstoken}`, error);
  //       });
  //   }
  // }, [search]);

  useEffect(() => {
    runCoco();
    runPosenet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default Objects;
