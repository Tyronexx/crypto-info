import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'         //DOMPURIFY IS USED TO PREVENT SCRIPTING IN OUR TAGS i.e WILL REMOVE TAGS FROM OUR DISPLAYED HTML TAGS 

import './Coin.css'

const Coin = () => {
  const params = useParams()                         //WE USE THIS IN ORDER TO MAKE THE LINK CONNECTING TO THE API DYNAMIC. THIS IS SO WE CAN GET DIFFERENT DATA
  const [coin, setCoin] = useState({})

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoin(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])




  return (
    <div>
      <div className='coin-container'>
        <div className='content'>
          <h1>{coin.name}</h1>
        </div>
        <div className='content'>
          <div className='rank'>
            <span className='rank-btn'> Rank # {coin.market_cap_rank} </span>
          </div>

          <div className='info'>
            <div className='coin-heading'>
              {coin.image ? <img src={coin.image.small} alt='' /> : null}      {/*THIS IS TO CHECK IF THE COIN IMAGE IS THERE AND DISPLAY IT ELSE MOVE TO THE NEXT OBJECT    !!NB: WE NEED TO DO THIS ON ANYTHING THAT ISNT THE FIRST CHILD ELSE WE'LL GET AN ERROR*/}
              <p>{coin.name}</p>
              {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
            </div>
            <div className='coin-price'>
              {coin.market_data?.current_price ? <h2> Price: ${coin.market_data.current_price.usd.toLocaleString()}</h2> : null}    {/*THIS IS TO CHECK IF THE COIN MARKET_DATA IS THERE AND DISPLAY THE NEXT OBJECT REQUIRED ELSE DISPLAY NOTHING            !!NB: WE NEED TO DO THIS ON ANYTHING THAT ISNT THE FIRST CHILD ELSE WE'LL GET AN ERROR**/}

            </div>
          </div>
        </div>

        <div className='content'>
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>2d</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null} </td>
                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null} </td>
                <td>{coin.market_data?.price_change_percentage_7d_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null} </td>
                <td>{coin.market_data?.price_change_percentage_14d_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null} </td>
                <td>{coin.market_data?.price_change_percentage_30d_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null} </td>
                <td>{coin.market_data?.price_change_percentage_1y_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null} </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='content'>
          <div className='stats'>
            <div className='left'>
              <div className='row'>
                <h4>24 Hour Low</h4>
                {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
              </div>
              <div className='row'>
                <h4>24 Hour High</h4>
                {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
              </div>

            </div>
            <div className='right'>
              <div className='row'>
                <h4>Market Cap</h4>
                {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
              </div>
              <div className='row'>
                <h4>Circulating Supply</h4>
                {coin.market_data?.circulating_supply ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : null}
              </div>
            </div>
          </div>
        </div>

        <div className='content'>
          <div className='about'>
            <p>About</p>
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description ? coin.description.en : '')             /*THIS IS WHERE WE IMPORT THE DOMPurify IMPORTED ABOVE*/
            }}>

            </p>
            <br/>
            <a href='https://accounts.binance.com/en/register' > <h4>Sign up  here to trade {coin.name} </h4> </a>

          </div>
        </div>
      </div>
      <a  href='https://coingecko.com/'></a><p>Data Fetched from  <a href='https://coingecko.com/'>coingecko.com</a> </p>
    </div>
    
  )
}

export default Coin