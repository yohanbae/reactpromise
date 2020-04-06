import React, {useEffect, useState} from 'react';
import firebase from "../base";
import Header from "./Header";
import styled from "styled-components";
import TemplateTask from "./TemplateTask";
import Footer from "./Footer";
import thelogo from "../assets/finger-icon.png";

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


const WeekWrap = styled.div`
  padding:20px;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
const DayWrap = styled.div`
`;

const TitleWrap = styled.div`
  padding:30px;
  padding-bottom:0;
  color:#32a851;
  display:grid;
  grid-template-columns:1fr 1fr;
  margin-top:10px;
`;

const TitleBox = styled.div`
  text-align:left;
  font-weight:300;
  font-size:13px;
`;

const EditExplain = styled.div`
  text-align:right;
  font-weight:300;
  font-size:13px;
`;

const EditTemplate = ({history}) => {
    const db = firebase.firestore();

    const [uid, setUid] = useState();
    const [theData, setTheData] = useState([]);

    useEffect(() => {
        //Assign UID
        let info;
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            setUid(user.uid);
            const dbb = db.collection("izgym");
            info = dbb.doc(user.uid).onSnapshot(snapshot => {
              setTheData(snapshot.data());  
            });       
          }else {
            console.log('no user, need to login properly');
          }
          
        }); 
      return () => info();


      }, []); // [] 이게 있으면, 실행을 한번만 한다    

      let myArray = [
        {day: "sunday"},
        {day: "monday"},
        {day: "tuesday"},
        {day: "wednesday"},
        {day: "thursday"},
        {day: "friday"},
        {day: "saturday"},
      ];


    const updateGogo = () => {
      history.push('/updating');
    }

    return (
        <Wrap>
          <Mobile>
            <MobileComp>
              <img src={thelogo} width={100} height={100} />
              <p>PROMISE</p>
              <p>PLEASE DOWNLOAD MOBILE APP</p>
            </MobileComp>
          </Mobile>

        <Header current={2} />

        <TitleWrap>
          <TitleBox>EDIT TEMPLATE</TitleBox>
          <EditExplain>
            You can modify weekly task template here.<br />
            Task template will be assigned to the schedule automatically.
          </EditExplain>
        </TitleWrap>
        <WeekWrap>
        {
            myArray.map((day, i) => (
              <DayWrap key={day.day}>
                <TemplateTask
                    theData={theData} day={day.day} uid={uid} dayIndex={i} updateGogo={updateGogo}
                />
              </DayWrap>
            ))
        }
        </WeekWrap>
        <Footer />
        </Wrap>
    )
}

export default EditTemplate;