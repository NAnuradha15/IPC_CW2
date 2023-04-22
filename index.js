import express from 'express';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {   getDocs, updateDoc } from 'firebase/firestore/lite';
import { getFirestore, collection } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCJ3D7snUEgOpAwmMae3cpMM5xIy68qqYQ",
    authDomain: "ipccw2-5409e.firebaseapp.com",
    projectId: "ipccw2-5409e",
    storageBucket: "ipccw2-5409e.appspot.com",
    messagingSenderId: "221848359057",
    appId: "1:221848359057:web:ce60ff87f410050c816f30",
    measurementId: "G-P9N9XJLZV5"
  };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    async function getCollection(db, cName) {
        const datacll= collection(db, cName);
        const dataSpshot = await getDocs(datacll);
        const DataList = dataSpshot.docs.map(doc => doc.data());
        return DataList;

    };

  

    async function addToCollection(db, cName) {
        const data = {
            ax : ax,
            ay : ay,
            az : az,
            Speed : speed,
            gx : gx,
            gy : gy,
            gz : gz,
            DeviceID : id,
            Direction : direction,
        };
    
        const UUID = (new Date()).getTime();
        await setDoc(doc(db, cName, UUID.toString()), data);
    }

    async function addDataToCollection(db, cName, data) {
        const UUID = (new Date()).getTime();
        await setDoc(doc(db, cName, UUID.toString()), data);
    }

    const API = express();
    API.use(express.json());
    API.get('/', (req, res) => {
    res.send('Express API app running');
    });

    api.post('/recordTemp', (req, res) => {
        const sensorReading = req.query.temp || 0;
        const id = req.query.ID
        const data = {
            ax : ax,
            ay : ay,
            az : az,
            Speed : speed,
            gx : gx,
            gy : gy,
            gz : gz,
            DeviceID : id,
            Direction : direction,        

        }
        addDataToCollection(database, "nibm_IPCCw2", data).then(
            value => {res.send("Done");}
        ).catch(
            err => {
                res.send("Error writing to DB, Please check ");
                console.log(err);
            }
        )
    });

    const port = process.env.PORT || 8080;
    API.listen(port, () => console.log(`Express server listening on port
    ${port}`));

