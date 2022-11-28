import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Joinform = styled.div`
    position: absolute; width: 440px; height: 560px; left: 550px; top: 50px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Join_write = styled.input`
    width:400px; height:35px; font-size:15px; 
    border:1px solid black; border-radius:5px;
`

const Join_select = styled.select`
    width:150px; height:35px; font-size:15px; 
    border:1px solid black; border-radius:5px; font-color:solid gray;
`

const Sign_up = styled.input`
    width: 200px; height: 35px; 
    border:1px solid black; border-radius:10px; background-color:skyblue;   
`

function JoinForm () {
    const [Inputs, setInputs] = useState({
        ID: '',
        PW: '',
        confirmPW: '',
        Name: '',
        Age: '',
        Email: '',
        PhoneNum: '',
        Sex: ''
    });

    const { ID, PW, confirmPW, Name, Age, Email, PhoneNum, Sex } = Inputs;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...Inputs,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        if(ID === '')
            alert("아이디를 입력하세요.");
        else if(PW === '')
            alert("비밀번호를 입력하세요.");
        else if(confirmPW === '')
            alert("비밀번호를 다시 입력하세요.");
        else if(confirmPW !== PW)
            alert("입력한 비밀번호가 서로 일치하지 않습니다.")
        else if(Name === '')
            alert("이름을 입력하세요.");
        else if(Age === '')
            alert("나이를 입력하세요.");
        else if(Email === '')
            alert("이메일을 입력하세요.");
        else if(PhoneNum === '' || PhoneNum.length !== 13 || (PhoneNum[3] !== '-' && PhoneNum[8] !== '-'))
            alert("올바른 형식의 전화번호를 입력하세요.");
        else if(Sex === '')
            alert("성별을 선택하세요.");
        else {
            alert("회원가입이 완료되었습니다.");
            e.preventDefault();
            //DB에 넣는 코드 추가
        }
    }
    
    return (
        <Joinform>
            <h1>&nbsp;&nbsp;회원가입</h1><p />
            <Join_write type="text" name="ID" value={ID} placeholder="Enter ID" onChange={handleChange} />
            <p />
            <Join_write type="password" name="PW" value={PW} placeholder="Password" onChange={handleChange} />
            <p />
            <Join_write type="password" name="confirmPW" value={confirmPW} placeholder="Confirm Password" onChange={handleChange} />
            <p />
            <Join_write type="text" name="Name" value={Name} placeholder="Your Name" onChange={handleChange} />
            <p />
            <Join_write type="text" name="Age" value={Age} placeholder="Your Age (숫자만)" onChange={handleChange} />
            <p />
            <Join_write type="text" name="Email" value={Email} placeholder="Your Email Address" onChange={handleChange} />
            <p />
            <Join_write type="text" name="PhoneNum" value={PhoneNum} placeholder="Enter Your Phone Number ( ex) 010-xxxx-xxxx )" onChange={handleChange} />
            <p />
            <Join_select name="Sex" value={Sex}  onChange={handleChange}>
                <option value="">Your Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Join_select>
            <p />
            <Sign_up type="submit" value="SIGN UP" id="sign-up" onClick={handleSubmit} />
            <p />
            <br />
            Already have an Account? <Link to='/login'>Sign In</Link>    
        </Joinform> 
    );
}

export default JoinForm;