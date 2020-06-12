import React, {useEffect, useState, useRef} from 'react';
import firebase from "../../base";
import Header from "../Header";
import MonthDayTask from "./MonthDayTask";
import SideDayTask from "./SideDayTask";
import MonthNote from "./MonthNote";
import useInput from "../../Hooks/useInput";
import styled from "styled-components";
import '../../App.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Footer from "../Footer";
import thelogo from "../../assets/finger-icon.png";

const Wrap = styled.div`
  width:100vw;    
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


const MonthWrap = styled.div`
padding:20px;
padding-right:190px;
padding-bottom:0px;
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
cursor: default;
`;

const DayWrap = styled.div`
  position:relative;
`;

const DivDay = styled.div`
  text-align:center;
  color:rgba(132, 144, 187, 1);
  text-transform: uppercase;
  font-weight:300;
  margin-bottom:30px;
`;


const TitleWrap = styled.div`
  padding-top:10px;
  padding-bottom:10px;
  margin-top:30px;
  color:#8490bb;
  display:grid;
  align-items:center;
`;

const ButtonWrap = styled.div`
  display:grid;
  align-items:center;
  grid-template-columns:150px 50px 50px 50px;
`;

const TitleBox = styled.div`
  text-align:left;
  font-weight:300;
  font-size:13px;
  padding-left:30px;
`;

const MonthButton = styled.div`
  background:none;
  border:none; padding:0; margin:0;
  margin-right:30px;
  color:#8490bb;
  cursor:pointer;
  font-weight:300;
  font-size:13px;
  display:inline;
`;


const Month = () => {
    const [uid, setUid] = useState();
    const [theData, setTheData] = useState([]);
    const [gcode, setGcode] =useState();
    const [mcode, setMcode] =useState("");
    const [percent, setPercent] = useState(0);
    const [sideVisible, setSideVisible] = useState(false);

    const [monthData, setMonthData] = useState([]);
    const [monthDataBefore, setMonthDataBefore] = useState([]);

    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    const [dayName, setDayName] = useState([]);

    const addTask = useInput("");
    const childRef = useRef();

    const db = firebase.firestore();



    useEffect(() => {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let numberOfMonth = new Date(year, month, 0).getDate(); 
      let monthcode = today.getFullYear() + "" + month;
      let datecode = today.getFullYear() + "" + month + "" + today.getDate();
      
      setGcode(datecode);
      setMcode(monthcode);    
      setCurrentMonth(month);
      setCurrentYear(year);

      setBeforeAfter(year, month - 1);

      // CREATE DAYS ARR this MONTH
      let MonthArray = [];
      for(let i = 1; i <= numberOfMonth; i++){
        today.setDate(i);
        let datecode = today.getFullYear() + "" + month + "" + today.getDate();
        MonthArray.push({id: datecode, day: getDayName(today), theDate: today.getDate()  });
      }
      setMonthData(MonthArray);


      let info;

      firebase.auth().onAuthStateChanged(user => {        
        if(user) {
          setUid(user.uid);

          db.collection("izgym").doc(user.uid).get().then(doc => {
            let doday = new Date();
            assignPercent(datecode, doc.data());
            document.getElementsByClassName('day-task-month')[doday.getDate() -1].classList.add("clicked-month");
            setDayName(getDayName(doday));
          });

          const dbb = db.collection("izgym");
          info = dbb.doc(user.uid).onSnapshot(snapshot => {
            setTheData(snapshot.data());            
          });
        }else {
          console.log('NO USER, MUST LOGGIN PROPERTLY');
        }
      }); 
      return () => info();

    }, []);
    
    const setBeforeAfter = (year, month) =>{
      let firstDay = new Date(year, month, 1); 
      let before = 0 + firstDay.getDay();

      let beforeBox = [];
      for(let i = 1; i <= before; i++){
        beforeBox.push({name:"hoho"});
      }
      setMonthDataBefore(beforeBox);
    }


    const getDayName = (today) => {
      var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var dayName = days[today.getDay()];      
      return dayName;
    }

    const onClickToday = (datecode, i, datas = theData, theDay) => {
      setGcode(datecode);
      setDayName(theDay);
      assignPercent(datecode, datas);

      [...document.getElementsByClassName("day-task-month")].forEach(element => {
          element.classList.remove("clicked-month");
      });
      document.getElementsByClassName('day-task-month')[i].classList.add("clicked-month");
    }

    const assignPercent = (datecode, datas = theData) => { 
      let templateTotal = 0;
      let templateCurrent = 0;
      let extraTotal = 0;
      let extraCurrent = 0;
      
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
    
        let finalPercent = Math.floor((templateCurrent + extraCurrent) / (templateTotal + extraTotal) * 100);
        setPercent(finalPercent);
      }else{
        console.log("ERROR");
      }

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

        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
        addTask.setValue("");
        assignPercent(gcode, theData);
    }

    const mouseEnter = () => {
      setSideVisible(true);
    }
    
    const mouseLeave = () => {
      setSideVisible(false);
    }

    const nextMonth = () => {
      let year = currentYear;
      let month = currentMonth;
      if(month == 12){
        year += 1;
        month = 1;
      }else{
        month += 1;
      }      
      monthArrayGenerator(year, month);

    }

    const prevMonth = () => {
      let year = currentYear; let month = currentMonth;
      if(month == 1){
        year -= 1;
        month = 12;
      }else {
        month -= 1;
      }
      monthArrayGenerator(year, month);
    }

    const monthArrayGenerator = (year, month) => {
      setBeforeAfter(year, month - 1);
      let numberOfMonth = new Date(year, month, 0).getDate(); 

      let newCode = year + ""+month;
      childRef.current.getNoteFromChild(newCode);
      setMcode(newCode);

      setCurrentMonth(month);
      setCurrentYear(year);

      // CREATE DAYS ARR this MONTH
      let MonthArray = [];
      let today = new Date(year, month, 0);

      for(let i = 1; i <= numberOfMonth; i++){
        today.setDate(i);
        let datecode = year + "" + month + "" + i;
        MonthArray.push({id: datecode, day: getDayName(today), theDate: today.getDate()  });
      }
      setMonthData(MonthArray);
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

          <Header current={1} />
          <TitleWrap>
            <ButtonWrap>
              <TitleBox>{currentYear} {monthNames[currentMonth]}</TitleBox>
              <div></div>
              <MonthButton onClick={()=> prevMonth()}>PREV</MonthButton>
              <MonthButton onClick={()=> nextMonth()}>NEXT</MonthButton>
            </ButtonWrap>
          </TitleWrap>

          <MonthWrap>
            <DivDay>Sunday</DivDay>
            <DivDay>Monday</DivDay>
            <DivDay>Tuesday</DivDay>
            <DivDay>Wednseday</DivDay>
            <DivDay>Thursday</DivDay>
            <DivDay>Friday</DivDay>
            <DivDay>Saturday</DivDay>
            {
              monthDataBefore.map((day, i) => (
                <DayWrap key={i}>
                </DayWrap>
              ))
            }

            {
              monthData.map((day, i) => (
                <DayWrap key={day.id} onClick={() => onClickToday(day.id, i, undefined, day.day)}>
                  <div className="day-task-month"></div>
                  <MonthDayTask 
                    theDay={day.day} dayId={day.id} uid={uid} theData={theData} theDate={day.theDate}
                  />                  
                </DayWrap>
              ))
            }
          </MonthWrap>
          
          <div className={`side-wrap-month ${sideVisible ? "" : " show-side"}`} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div style={{transform: 'scale(0.7, 0.7)'}}>
            <CircularProgressbarWithChildren value={percent}>
              {/* <span>MAR 04</span> */}
              <span style={{fontSize:"40px", color:"gray"}}>{percent}%</span>
            </CircularProgressbarWithChildren >
            </div>
            <SideDayTask dayId={gcode} theData={theData} uid={uid} theDay={dayName} percent={percent} assignPercent={assignPercent}  />
            <MonthNote ref={childRef} theData={theData} uid={uid} mcode={mcode} />

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

  export default Month;