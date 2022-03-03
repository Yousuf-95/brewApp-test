import React, { useState, useEffect } from 'react';
import styles from './styles/firstPage.module.css';
import Card from './card';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { GiByzantinTemple, GiWhirlwind, GiGorilla } from 'react-icons/gi';
import { AiFillFire } from 'react-icons/ai';


const FirstPage = () => {

    let [myCards, setmyCards] = useState([]);
    let [activeTab, setactiveTab] = useState(0);

    useEffect(() => {
        const getCards = async () => {
            const fetchResult = await fetch('https://fierce-bastion-54100.herokuapp.com/api/getCards');
            const cards = await fetchResult.json();
            // console.table(cards);
            setmyCards(cards)
        }
        getCards();
    }, []);

    const handleClick = async (sortby) => {
        const fetchResult = await fetch('https://fierce-bastion-54100.herokuapp.com/api/getCards/?sortby=' + sortby);
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
                    <li className={(activeTab === 0) ? `${styles.active}` : ''} onClick={() => setactiveTab(0)}><span><AiFillFire /></span>24h Trending</li>
                    <li className={(activeTab === 1) ? `${styles.active}` : ''} onClick={() => {setactiveTab(1); handleClick('latest');}} >Latest Shows </li>
                    <li className={(activeTab === 2) ? `${styles.active}` : ''} onClick={() => {setactiveTab(2); handleClick('popular');}}>Most Popular </li>
                    <li className={(activeTab === 3) ? `${styles.active}` : ''} onClick={() => setactiveTab(3)}><span><IoDiamond /></span> In Genesis </li>
                    <li className={(activeTab === 4) ? `${styles.active}` : ''} onClick={() => setactiveTab(4)}><span><GiByzantinTemple /></span>In Temple </li>
                    <li className={(activeTab === 5) ? `${styles.active}` : ''} onClick={() => setactiveTab(5)}><span><GiWhirlwind /></span>In Void</li>
                    <li className={(activeTab === 6) ? `${styles.active}` : ''} onClick={() => setactiveTab(6)}><span><GiGorilla /></span>#BAYC</li>  
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