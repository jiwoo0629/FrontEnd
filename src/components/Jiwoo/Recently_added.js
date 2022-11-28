import React from 'react';
import styled from 'styled-components';
import EachRecent from './EachRecent';

const List = styled.div`
    display:flex; justify-content: center; 
    background-color:white; font-size:15px;
`

const RecentList = styled.div`
    display: grid; flex-direction: row; justify-content: center; align-items: center; 
    position:absolute; top:15px; width:450px;
    border-top:2px solid gray;
    background-color:white; color:black;
    grid-template-columns : repeat(1, 1fr);
  @media screen and (max-width : 800px){
    grid-template-columns : repeat(1, 1fr);
  }
  @media screen and (max-width : 1350px) and (min-width : 800px){
    grid-template-columns : repeat(2, 1fr);
  }
`

const dummyData = [
    {name: "기업1", endprice : 1, diff : 1, diffrate: 1, date:"2022-11-15"},
    {name: "기업2", endprice : 2, diff : 2, diffrate: 2, date:"2022-11-14"},
    {name: "기업3", endprice : 3, diff : 3, diffrate: 3, date:"2022-11-14"},
    {name: "기업4", endprice : 4, diff : 4, diffrate: 4, date:"2022-11-13"},
    {name: "기업5", endprice : 5, diff : 5, diffrate: 5, date:"2022-11-12"},
    {name: "기업6", endprice : 6, diff : 6, diffrate: 6, date:"2022-11-11"},
    {name: "기업7", endprice : 7, diff : 1, diffrate: -1, date:"2022-11-11"},
    {name: "기업8", endprice : 8, diff : 2, diffrate: -2, date:"2022-11-10"},
    {name: "기업9", endprice : 9, diff : 3, diffrate: -3, date:"2022-11-09"},
    {name: "기업10", endprice : 10, diff : 4, diffrate: -4, date:"2022-11-09"},
    {name: "기업11", endprice : 11, diff : 5, diffrate: -5, date:"2022-11-08"},
    {name: "기업12", endprice : 12, diff : 6, diffrate: -6, date:"2022-11-08"}
  ];

function Recently_added_table () {
    dummyData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })   
    
    var i = 0;
    let eachRecent = dummyData.filter((val)=>{
        if(i < 10) {
            i++;
            return val;
        }
    }).map((v) => (<EachRecent key={v.name}
        name={v.name} endprice={v.endprice} diff={v.diff} diffrate={v.diffrate} date={v.date}
    />));
    
    return (
        <List>
            <RecentList>
                {eachRecent}
            </RecentList>
        </List>
    );
}

export default Recently_added_table;