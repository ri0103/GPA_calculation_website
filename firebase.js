  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA1ed1y7_McwlYeybNhPjuugHp6aMMKM3Y",
    authDomain: "gpa-calculator-3ade9.firebaseapp.com",
    projectId: "gpa-calculator-3ade9",
    storageBucket: "gpa-calculator-3ade9.firebasestorage.app",
    messagingSenderId: "21208702181",
    appId: "1:21208702181:web:42c7e6848785ca2f7cc80c",
    measurementId: "G-2ZGX3T210S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // ページビューイベントを送信
logEvent(analytics, 'page_view');

export { app, analytics, logEvent };