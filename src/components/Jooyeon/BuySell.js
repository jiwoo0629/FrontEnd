import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Price_info from '../../Json/BuySell.json';

const InputLayer = styled.div`
    position: absolute; width:450px; height:150px; left:50px; top:20px;
    align-items: center; text-align:left; 
    font-size:20px; background-color:white;
    font-family: 'Pretendard-Regular';
`

const Input = styled.input`
    width:200px; height:30px; font-size:20px; margin-left:10px; margin-top:5px;
    border:0; border-bottom:1px solid black; text-align:center;
    font-family: 'Pretendard-Regular';
`

const BuyButton = styled.button`
    position:absolute; width:120px; height:30px; left:700px; top:160px;
    display:flex; justify-content:center; background-color:skyblue;
    font-size:15px; font-weight:600;
    border:0; border-radius:20px; box-shadow:2px 2px lightgray;
    font-family: 'Pretendard-Regular';
`

const SellButton = styled.button`
    position:absolute; width:120px; height:30px; left:850px; top:160px;
    display:flex; justify-content:center; background-color:red;
    font-size:15px; font-weight:600;
    border:0; border-radius:20px; box-shadow:2px 2px lightgray;
    font-family: 'Pretendard-Regular';
`

const OptionButton = styled.button`
    position: absolute; left:440px; top:55px;
    width:70px; height:30px; font-size:15px; margin-left:10px; margin-top:5px;
    border:0; border-radius:5px; text-align:center; background-color:lightgreen;
    box-shadow:2px 2px lightgray;
    font-family: 'Pretendard-Regular';
`

const BuyInfoLayer = styled.div`
    position: absolute; width:220px; height:150px; left:700px; top:20px;
    align-items: center; text-align:left; 
    font-size:15px; background-color:white;
    font-family: 'Pretendard-Regular';
`

const Input2 = styled.input`
    width:100px; height:30px; font-size:15px; margin-left:10px; margin-top:5px;
    border:0; border-bottom:1px solid black; text-align:center;
    font-family: 'Pretendard-Regular';
`

function BuySell ({Data, UserID}) {  
    const navigate = useNavigate();
    const [purchase, setpurchase] = useState({
        count: 0, price: 0
    })
    const {count, price} = purchase;
    function pos_sell (itemcode) {
        var count = 0;
        var i;
        for(i=0; i<Data.holdings.length; i++) {
            if(Data.holdings[i].itemCode === itemcode)
                count = Data.holdings[i].itemNumber;
        }
        return count;
    }

    const HandleChange = (e) => {
        const { value, name } = e.target;
        setpurchase({
            ...purchase,
            [name]: value
        })
    }

    var total;
    if (price == 0 || count == 0)
        total = 0;
    else
        total = count * price;

    var possible_buy;
    if (price == 0)
        possible_buy = 0;
    else {
        possible_buy = Math.floor(Data.myWalletInfo.cash / price);
    }
        

    const HandlePrice = () => {
        setpurchase({
            ...purchase,
            price: Data.curPrice
        })
    }

    const HandleBuy = () => {
        console.log(total)
        console.log(possible_buy)      
        if(count == 0 ) {
            alert("수량을 올바르게 입력하세요.")
        } else if(price == 0 ) {
            alert("가격을 올바르게 입력하세요.")
        } else if(total > Data.myWalletInfo.cash) {
            alert("보유한 현금보다 더 많은 양을 구매할 수 없습니다. 수량과 금액을 다시 입력하세요.")
        } else if(price > Math.floor(Data.curPrice * 1.3).toLocaleString('en-AU') || price < Math.floor(Data.curPrice * 0.7).toLocaleString('en-AU')) {
            alert("가격이 상한가 또는 하한가를 벗어났습니다. 금액을 다시 입력하세요.")
        } else {
            alert("매수가 완료되었습니다.")
            axios.post('/exchange/buy', {
                id: UserID,
                itemCode: Data.companyInfo.itemCode,
                itemNumber : count,
                price : price
            }).then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
        }
    }

    const HandleSell = () => {
        if(count == 0) {
            alert("수량을 올바르게 입력하세요.");  
        } else if(price == 0 ) {
            alert("가격을 올바르게 입력하세요.");
        } else if(count > pos_sell(Data.holderAge[0].itemCode)) {
            alert("보유한 주식보다 많은 양을 판매할 수 없습니다. 수량을 다시 입력하세요.");
        } else if(price > Math.floor(Data.curPrice * 1.3).toLocaleString('en-AU') || price < Math.floor(Data.curPrice * 0.7).toLocaleString('en-AU')) {
            alert("가격이 상한가 또는 하한가를 벗어났습니다. 금액을 다시 입력하세요.")
        } else {
            alert("매도가 완료되었습니다.")
            axios.post('/exchange/sell', {
                id: UserID,
                itemCode: Data.companyInfo.itemCode,
                itemNumber : count,
                price : price
            }).then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
        }
    }

    return(
        <div>
            <InputLayer>
                거래수량&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="text" name="count" value={count} onChange={HandleChange} /> 주<br />
                거래금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="text" name="price" value={price} onChange={HandleChange} /> 원<br />
                거래총금액&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input type="text" name="total" value={total.toLocaleString('en-AU')} disabled /> 원<br />
                주문가능수량&nbsp;&nbsp;<Input type="text" name="possible_buy" value={possible_buy.toLocaleString('en-AU')} disabled /> 주<br />
                판매가능수량&nbsp;&nbsp;<Input type="text" name="possible_sell" value={pos_sell(Data.holderAge[0].itemCode).toLocaleString('en-AU')} disabled /> 주
            </InputLayer>
            <OptionButton onClick = {HandlePrice}>시장가</OptionButton>
            <BuyInfoLayer>
                상한가&nbsp;<Input2 type="text" name="BuyHighest" value={Math.floor(Data.curPrice * 1.3).toLocaleString('en-AU')} disabled /> 원 <p />
                하한가&nbsp;<Input2 type="text" name="BuyLowest" value={Math.floor(Data.curPrice * 0.7).toLocaleString('en-AU')} disabled /> 원 <p />
            </BuyInfoLayer>
            <BuyButton onClick = {HandleBuy}>매수</BuyButton> 
            <SellButton onClick = {HandleSell}>매도</SellButton>
        </div>
    );
}

export default BuySell;