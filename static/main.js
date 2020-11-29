/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./assets/scss/styles.scss\");\n/* harmony import */ var _videoPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videoPlayer */ \"./assets/js/videoPlayer.js\");\n/* harmony import */ var _videoPlayer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videoPlayer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _videoRecord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videoRecord */ \"./assets/js/videoRecord.js\");\n/* harmony import */ var _videoRecord__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_videoRecord__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n//# sourceURL=webpack://wetube/./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/videoPlayer.js":
/*!**********************************!*\
  !*** ./assets/js/videoPlayer.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("const videoContainer = document.getElementById(\"jsVideoPlayer\");\nconst VideoPlayer = document.querySelector(\"#jsVideoPlayer video\");\nconst playBtn = document.getElementById(\"jsPlayButton\");\nconst volumnBtn = document.getElementById(\"jsVolumnButton\");\nconst screenBtn = document.getElementById(\"jsScreenButton\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst volumeControl = document.getElementById(\"jsVolume\");\n\nfunction handlePlayButton() {\n  if (VideoPlayer.paused) {\n    VideoPlayer.play();\n    playBtn.innerHTML = `<i class=\"fas fa-pause\"></i>`;\n  } else {\n    VideoPlayer.pause();\n    playBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\n  }\n}\n\n;\n\nfunction handleVolumnButton() {\n  if (VideoPlayer.muted) {\n    VideoPlayer.muted = false;\n    volumnBtn.innerHTML = `<i class=\"fas fa-volume-up\"></i>`;\n    volumeControl.value = VideoPlayer.volume;\n  } else {\n    volumeControl.value = 0;\n    VideoPlayer.muted = true;\n    volumnBtn.innerHTML = `<i class=\"fas fa-volume-mute\"></i>`;\n  }\n}\n\n;\n\nconst formatDate = seconds => {\n  const secondsNum = parseInt(seconds, 10);\n  let hours = Math.floor(secondsNum / 3600);\n  let minutes = Math.floor((secondsNum - hours * 3600) / 60);\n  let totalSeconds = secondsNum - hours * 3600 - minutes * 60;\n\n  if (hours < 10) {\n    hours = `0${hours}`;\n  }\n\n  if (minutes < 10) {\n    minutes = `0${minutes}`;\n  }\n\n  if (totalSeconds < 10) {\n    totalSeconds = `0${totalSeconds}`;\n  }\n\n  return `${hours}:${minutes}:${totalSeconds}`;\n};\n\nfunction getCurrentTime() {\n  currentTime.innerHTML = formatDate(Math.floor(VideoPlayer.currentTime));\n}\n\nfunction setTotalTime() {\n  const totalTimeString = formatDate(VideoPlayer.duration);\n  totalTime.innerHTML = totalTimeString;\n  setInterval(getCurrentTime, 1000);\n}\n\nfunction exitFullSreen() {\n  document.exitFullscreen();\n  screenBtn.innerHTML = `<i class=\"fas fa-expand\"></i>`;\n  screenBtn.addEventListener(\"click\", goFullScreen);\n}\n\nfunction goFullScreen() {\n  screenBtn.innerHTML = `<i class=\"fas fa-compress\"></i>`;\n  screenBtn.removeEventListener(\"click\", goFullScreen);\n  videoContainer.requestFullscreen();\n  screenBtn.addEventListener(\"click\", exitFullSreen);\n}\n\nfunction handleDrag(event) {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  VideoPlayer.volume = value;\n\n  if (value >= 0.6) {\n    volumnBtn.innerHTML = `<i class=\"fas fa-volume-up\"></i>`;\n  } else if (value >= 0.2) {\n    volumnBtn.innerHTML = `<i class=\"fas fa-volume-down\"></i>`;\n  } else {\n    volumnBtn.innerHTML = `<i class=\"fas fa-volume-off\"></i>`;\n  }\n}\n\nconst registerView = () => {\n  const videoId = window.location.href.split(\"/videos/\")[1];\n  fetch(`/api/${videoId}/view`, {\n    method: \"POST\"\n  });\n};\n\nconst handleEnded = () => {\n  registerView();\n  VideoPlayer.currentTime = 0;\n  playBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\n};\n\nfunction init() {\n  VideoPlayer.volume = 0.5;\n  playBtn.addEventListener(\"click\", handlePlayButton);\n  volumnBtn.addEventListener(\"click\", handleVolumnButton);\n  screenBtn.addEventListener(\"click\", goFullScreen);\n  VideoPlayer.addEventListener(\"loadedmetadata\", setTotalTime);\n  VideoPlayer.addEventListener(\"ended\", handleEnded);\n  volumeControl.addEventListener(\"input\", handleDrag);\n}\n\n;\n\nif (videoContainer) {\n  init();\n}\n\n;\n\n//# sourceURL=webpack://wetube/./assets/js/videoPlayer.js?");

/***/ }),

/***/ "./assets/js/videoRecord.js":
/*!**********************************!*\
  !*** ./assets/js/videoRecord.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("const recordContainer = document.getElementById(\"jsRecordContainer\");\nconst videoPreview = document.getElementById(\"jsVideoPreview\");\nconst recordButton = document.getElementById(\"jsRecordBtn\");\nlet streamObject;\nlet videoRecord;\n\nconst handleVideoData = event => {\n  const {\n    data: videoFile\n  } = event;\n  const link = document.createElement(\"a\");\n  link.href = URL.createObjectURL(videoFile);\n  link.download = \"recorded.webm\";\n  document.body.appendChild(link);\n  link.click();\n};\n\nconst startRecording = () => {\n  videoRecord = new MediaRecorder(streamObject);\n  videoRecord.start();\n  videoRecord.addEventListener(\"dataavailable\", handleVideoData);\n  recordButton.addEventListener(\"click\", stopRecording);\n};\n\nconst getVideo = async () => {\n  try {\n    const stream = await navigator.mediaDevices.getUserMedia({\n      audio: true,\n      video: {\n        width: 1280,\n        height: 720\n      }\n    });\n    videoPreview.srcObject = stream;\n    videoPreview.muted = true;\n    videoPreview.play();\n    recordButton.innerHTML = `Stop recording`;\n    streamObject = stream;\n    startRecording();\n  } catch (error) {\n    recordButton.innerHTML = `Can't record!`;\n  } finally {\n    recordButton.removeEventListener(\"click\", startRecording);\n  }\n};\n\nconst stopRecording = () => {\n  videoRecord.stop();\n  recordButton.removeEventListener(\"click\", stopRecording);\n  recordButton.addEventListener(\"click\", getVideo);\n  recordButton.innerHTML = \"Start recording\";\n};\n\nfunction init() {\n  recordButton.addEventListener(\"click\", getVideo);\n}\n\nif (recordContainer) {\n  init();\n}\n\n//# sourceURL=webpack://wetube/./assets/js/videoRecord.js?");

/***/ }),

/***/ "./assets/scss/styles.scss":
/*!*********************************!*\
  !*** ./assets/scss/styles.scss ***!
  \*********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wetube/./assets/scss/styles.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./assets/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;