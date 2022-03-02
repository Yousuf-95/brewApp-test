import React from 'react';
import styles from './styles/card.module.css';


const Card = (props) => {
    const {myKey,title,imageLink,tags} = props;
    // console.log(myKey);


    return (
        <>
            <div className={`${styles.cardContainer}`} key={myKey}>
                <div className={`${styles.imageContainer}`}>
                    <img src={`${imageLink}`} alt="" />
                </div>
                <div className={`${styles.cardContent}`}>

                    <div className={`${styles.cardTitle}`}>
                        <h3>{title}</h3>
                    </div>

                    <div className={`${styles.cardTag}`}>
                        <div>
                            <p>{tags}</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Card;