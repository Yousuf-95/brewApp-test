import React, { useState, useEffect } from 'react';
import styles from './styles/firstPage.module.css';
// import Card from './card';
import Card from './card';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { GiByzantinTemple, GiWhirlwind, GiGorilla } from 'react-icons/gi';
import { AiFillFire } from 'react-icons/ai';


const FirstPage = () => {

    let [myCards, setmyCards] = useState([]);

    // useEffect(() => {
    //     const getCards = async () => {
    //         const fetchResult = await fetch('/api/getCards');
    //         const cards = await fetchResult.json();
    //         setmyCards(cards);
    //     };
    //     getCards();
    // }, []);

    useEffect(() => {
        const getCards = async () => {
            const fetchResult = await fetch('api/getCards');
            const cards = await fetchResult.json();
            // console.table(cards);
            setmyCards(cards)
        }
        getCards();
    }, []);

    const handleClick = async (e, sortby) => {

        const fetchResult = await fetch('api/getCards/?sortby=' + sortby);
        const cards = await fetchResult.json();
        setmyCards(cards);
    };


    return (
        
            <section className={`${styles.container}`}>
                <div className={`${styles.intro}`}>
                    <h2>Live Spaces </h2>
                    <p><span><BsFillCheckCircleFill /></span> <strong>All NFTs on Cyber either belong to or were minted by their space creator.</strong></p>
                </div>

                <ul>
                    <li><span><AiFillFire /></span>24h Trending</li>
                    <li onClick={(e) => handleClick(e,'latest')} >Latest Shows </li>
                    <li onClick={(e) => handleClick(e,'popular')}>Most Popular </li>
                    <li><span><IoDiamond /></span> In Genesis </li>
                    <li><span><GiByzantinTemple /></span>In Temple </li>
                    <li><span><GiWhirlwind /></span>In Void</li>
                    <li><span><GiGorilla /></span>#BAYC</li>  
                </ul>
                

                <div className={`${styles.cards}`}>
                    {
                        myCards.map((item, index) => {
                            if(item.title.length>30)
                                item.title = item.title.substr(0,30) + '...';

                            return <Card
                                myKey={index}
                                title={item.title}
                                imageLink={item.imageLink}
                                tags={item.tags}
                            />
                        }
                        )
                    }
                </div>
            </section>
    );
}

export default FirstPage;