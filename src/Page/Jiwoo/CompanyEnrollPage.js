import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import UpperLayer from '../../components/Jiwoo/UpperLayer';
import CompanyEnroll from '../../components/Jiwoo/CompanyEnroll';

const Title = styled.div`
    position: absolute; width: 560px; left:520px; height: 80px; top: 20px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

function CompanyEnrollPage () {
    const location = useLocation();
    return(
        <div className="Page">
            <UpperLayer />
            <div className="Background">
                <Title>회사 등록</Title>
                <CompanyEnroll UserID={location.state.UserID}/>
            </div>
        </div>
    );  
}

export default CompanyEnrollPage;