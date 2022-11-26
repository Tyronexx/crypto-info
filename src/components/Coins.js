import React from 'react'
import Coinitem from './Coinitem';
import { Link } from 'react-router-dom';
import './Coins.css';

import Coin from '../routes/Coin';


const Coins = ( props ) => {
  return (
    <div className='container'>
        <div>
            <div className='heading'>
                <p>#</p>
                <p className='coin-name'>Coins</p>
                <p>Price</p>
                <p>24h Change</p>
                <p className='hide-mobile'>Volume</p>
                <p className='hide-mobile'>Mkt Cap</p>
            </div>

            {props.coins.map(coins => {    //THIS IS TO TAKE THE ARRAY OF COINS AND PASS IT TO "COINITEM" PAGE
              return(

                <Link to={`/coin/${coins.id}`} element={ <Coin/> } key={coins.id}>   {/*WE DO THIS CAUSE WE WANT EACH ROW TO BE A 'DYNAMIC' LINK SO WE CAN VIEW DETAILS OF EACH ELEMENT*/}
                  <Coinitem coins={coins} />
                </Link>
                
              )
            })}

        </div>
    </div>
  )
}

export default Coins