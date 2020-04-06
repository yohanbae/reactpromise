import React, {useEffect, useState} from 'react';
import firebase from "./base";
import Header from "./component/Header";
import Footer from "./component/Footer";
import DayTask from "./component/DayTask";
import useInput from "./Hooks/useInput";
import styled, { createGlobalStyle } from "styled-components";
import './App.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoIosSunny,IoIosMedical, IoMdImages, IoMdRose } from "react-icons/io";
import thelogo from "./assets/finger-icon.png";


const Wrap = styled.div`
  width:100vw;    
  min-height:100vh;


`;

const Mobile = styled.div`
  @media only screen and (min-width: 769px) {
    display:none;
  }

  @media only screen and (max-width: 768px) {
    background: white;
    width:100%;
    height:100%;
    z-index:9999;
    position:fixed;
    left: 0; top:0;
    display:grid;
    justify-content:center;
    align-items:center;
  }
`;

const MobileComp = styled.div`
  text-align:center;
`;

const WeekWrap = styled.div`
  padding:20px;
  padding-top:0px;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  cursor: default;
  background:white;
  min-height:60vh;
  border-radius:5px;
`;

const WeekWrapColor = styled.div`
  padding:10px;
  padding-right:180px;
  margin-top:30px;
`;

const DayWrap = styled.div`
  position:relative;
`;

const TitleWrap = styled.div`
  padding-right:0px;
  padding-bottom:0;
  padding-left:30px;
  padding-top:30px;
  color:#32a851;

  width: calc(100% - 230px);
  display:grid;
  grid-template-columns: 1fr 1fr;
`;

const TitleBox = styled.div`
  font-weight:300;
  font-size:13px;
  color:#8490bb;
`;

const GlobalStyles = createGlobalStyle`
  @import url('href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
`

// const NoteTextarea = styled.textarea`
//   font-family: 'Montserrat', sans-serif;
//   font-size:13px;
//   font-weight:300;
// `;

const MonthTitle = styled.div`
    margin-top:40px;
    margin-bottom:10px;
    color:#8490bb;
`;

function Main({history}) {
    const [uid, setUid] = useState();
    const [theData, setTheData] = useState([]);
    const [noteData, setNoteData] = useState("");
    const [gcode, setGcode] =useState();
    const [mcode, setMcode] =useState();
    const [percent, setPercent] = useState(0);
    const [sideVisible, setSideVisible] = useState(false);

    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    const addTask = useInput("");
    const [weekData, setWeekData] = useState([]);

    const handleNoteChange = (event) => {
        setNoteData(event.target.value);
    };

    const db = firebase.firestore();

    useEffect(() => {
      // GET TODAY"S DAY CODE
      let today = new Date();
      let month = today.getMonth() + 1;
      let datecode = today.getFullYear() + "" + month + "" + today.getDate();
      let monthcode = today.getFullYear() + "" + month;
      setGcode(datecode);
      setMcode(monthcode);

      setCurrentMonth(month);
      setCurrentYear(today.getFullYear());

      // Calculate This Week
      let DayArray = [];
      // let doday = new Date();
      for(let i = 0; i < 7; i++){        
        today.setDate(today.getDate() + i - today.getDay());
        let datecode = today.getFullYear() + "" + month + "" + today.getDate();
        DayArray.push({id: datecode, day: getDayName(today), theDate: today.getDate()  });        
      }
      // console.log("DAY", DayArray);
      setWeekData(DayArray);

      let info;
      //Assign UID
      firebase.auth().onAuthStateChanged(user => {

        if(user) {
          setUid(user.uid);
          // CREATE WEEKLY DB BASED on TEMPLATE
            let datas = [];
            db.collection("izgym").doc(user.uid).get().then(data => {
              let momo = data.data();
              let temp;

              DayArray.map((day) => {
                if(!momo[day.id]){
                  temp = momo["template"][day.day];
                  datas[day.id] = temp;
                }
                // return true;
              });   
              console.log("APRIL", datas);
              db.collection("izgym").doc(user.uid).set({ ...momo, ...datas });
            });


          db.collection("izgym").doc(user.uid).get().then(doc => {
            let meme = doc.data();
            assignPercent(datecode, meme);
            let doday = new Date();
            document.getElementsByClassName('day-task-week')[doday.getDay()].classList.add("clicked-week");
          });
  

          const dbb = db.collection("izgym");
          info = dbb.doc(user.uid).onSnapshot(snapshot => {
            // console.log("The DATA ", snapshot.data());
            setTheData(snapshot.data());
            
            let meme = snapshot.data();
            // set note UI
            if(meme['note'][monthcode]){
              let theNote = meme['note'][monthcode].note;
              setNoteData(theNote);
            }
            // assignPercent(datecode, meme);
            // document.getElementsByClassName('day-task')[today.getDay()].classList.add("clicked");
          });

        }else {
          console.log('no user, need to login properly');
        }
      }); 
      return () => info();

    }, []); // [] 이게 있으면, 실행을 한번만 한다
    

    
    const getDayName = (today) => {
      var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var dayName = days[today.getDay()];      
      return dayName;
    }

    const onClickToday = (datecode, i, datas = theData) => {
      setGcode(datecode);
      assignPercent(datecode, datas);
      if(theData["note"][mcode] !== undefined){
        setNoteData(theData["note"][mcode]["note"]);
      }else {
        setNoteData("write a daily note");

        let meme = {[mcode] : {note: "write a daily note"}};
        db.collection("izgym").doc(uid).set({ ...theData, note: {...theData['note'], ...meme} });       // db.collection("izgym").doc("myuid").set({note: noteData});
      }


      [...document.getElementsByClassName("day-task-week")].forEach(element => {
        element.classList.remove("clicked-week");
      });      
      document.getElementsByClassName('day-task-week')[i].classList.add("clicked-week");

    }

    const assignPercent = (datecode, datas = theData) => { 
      let templateTotal = 0;
      let templateCurrent = 0;
      let extraTotal = 0; let extraCurrent = 0;

      if(datas[datecode]){
        datas[datecode].map(data => {
          templateTotal += parseInt(data.total);
          templateCurrent += parseInt(data.current);
        });
  
        if(datas['extra'][datecode] !== undefined){
          datas['extra'][datecode].map(data => {
            extraTotal += parseInt(data.total);
            extraCurrent += parseInt(data.current);
          });
        }
        let theTotal = templateTotal + extraTotal;
        let theCurrent = templateCurrent + extraCurrent;
        let finalPercent = Math.floor(theCurrent / theTotal * 100);
        console.log("PEREPPER", finalPercent);        
        setPercent(finalPercent);
      }

    }


    const saveNote = () => {
      console.log("note saved");
      let meme = {[mcode] : {note: noteData}};
      db.collection("izgym").doc(uid).set({ ...theData, note: {...theData['note'], ...meme} });
    }

    const onAddTask = (e) => {
        e.preventDefault();

        if(theData['extra'][gcode] !== undefined){
        // if extra on the day already exist
          theData['extra'][gcode].push({name: addTask.value, current:0, total:10 });
        } else {
          //if no extra task yet on the day
          let momo = [];
          momo.push({name: addTask.value, current:0, total:10 });
          theData['extra'][gcode] = momo;
        }
        // console.log("MOMO", theData);

        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
        assignPercent(gcode, theData);
        addTask.setValue("");
    }


    const updateGogo = () => {
      history.push('/updating');
    }

    const mouseEnter = () => {
      setSideVisible(true);
    }
    const mouseLeave = () => {
      setSideVisible(false);
    }
    const monthNames = ["", "JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];    

      return (
          <Wrap>
            <Mobile>
              <MobileComp>
                <img src={thelogo} width={100} height={100} />
                <p>PROMISE</p>
                <p>PLEASE DOWNLOAD MOBILE APP</p>
              </MobileComp>
            </Mobile>
          <Header current={0} />
{/* 
          <TitleWrap>
            <TitleBox>{currentYear} {monthNames[currentMonth]}</TitleBox>
          </TitleWrap> */}

          <WeekWrapColor>
          <WeekWrap>
            {
              weekData.map((day, i) => (
                <DayWrap key={day.id} onClick={() => onClickToday(day.id, i)}>
                  <div className="day-task-week">
                    <IoIosSunny style={{ fontSize:'40px', opacity:'0.4', color:'#fcba03', margin:'0', padding:'0', textAlign:'center' }} />
                  </div>
                  <DayTask 
                    onClick={() => onClickToday}
                    theDay={day.day} dayId={day.id} uid={uid} theData={theData} theDate={day.theDate}
                    assignPercent={assignPercent}
                    updateGogo={updateGogo}
                  />

                </DayWrap>
              ))
            }
          </WeekWrap>
          </WeekWrapColor>

          <div className={`side-wrap ${sideVisible ? "" : " show-side"}`} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div style={{transform: 'scale(0.7, 0.7)'}}>
            <CircularProgressbarWithChildren value={percent}>
              <span style={{fontSize:"40px", color:"gray"}}>{percent}%</span>

            </CircularProgressbarWithChildren >
            </div>
            <div>
              <MonthTitle>MONTHLY NOTE</MonthTitle>
              <textarea placeholder="Write your monthly plan here" style={{resize: "none" }} className="daily-note" onChange={handleNoteChange} onBlur={saveNote} value={noteData}>
              </textarea>
            </div>

            <div>
              <form onSubmit={onAddTask}>
                <input className="add-extra" type="text" name="task_name" value={addTask.value} onChange={addTask.onChange} placeholder="ADD EXTRA TASK" />
              </form>            
            </div>
          </div>

            <Footer />
        </Wrap>
      );
  }

  export default Main;