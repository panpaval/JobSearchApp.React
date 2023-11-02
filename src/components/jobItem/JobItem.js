
import { useState, useCallback } from 'react';
import './jobItem.css'


function Item({data, onClick}) {
    
const [activeStar, setActiveStar] = useState(false)
 

const handleClick = () => {
   setActiveStar((prevState) => !prevState)
}


    return (
        <div style={{ padding: '24px',marginTop: '16px', backgroundColor: 'white', borderRadius: '10px', height: '101px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}} onClick={onClick}>
                <div style={{fontSize: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: 'normal',
                            color: '#5E96FC'}}> {data.profession} </div>
                <div className={activeStar ? 'activeStar' : 'star'}
                onClick={handleClick}
                > <svg width="24" height="24" viewBox="0 0 24 24" className='star-icon'  xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" strokeWidth="1.5"/>
                  </svg>
                </div>
            </div>
            <div style={{display: 'flex', paddingTop: '12.5px', paddingBottom: '12.5px'}}>
                <div style={{fontSize: '16px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: '20px'}}>от {data.payment_from} </div>
                <div style={{textAlign: 'center',
                            fontSize: '20px',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '21px',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            color:"#ACADB9"
                            }}>•</div>
                <div style={{fontSize: '16px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal'}}>{data.type_of_work}</div>
            </div>
            <div style={{ display: 'flex', paddingRight: '4px'}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.714 13.8807C13.9335 14.6612 12.3013 16.2935 11.1781 17.4166C10.5273 18.0675 9.47304 18.0678 8.82217 17.4169C7.7186 16.3134 6.11797 14.7127 5.28593 13.8807C2.68244 11.2772 2.68244 7.05612 5.28593 4.45262C7.88943 1.84913 12.1105 1.84913 14.714 4.45262C17.3175 7.05612 17.3175 11.2772 14.714 13.8807Z" stroke="#ACADB9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 9.16667C12.5 10.5474 11.3807 11.6667 9.99998 11.6667C8.61927 11.6667 7.49998 10.5474 7.49998 9.16667C7.49998 7.78595 8.61927 6.66667 9.99998 6.66667C11.3807 6.66667 12.5 7.78595 12.5 9.16667Z" stroke="#ACADB9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <div style={{fontSize: '16px',
                            paddingLeft: '4px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: 'normal'}}>{data.town}</div>
            </div>
        </div>
    );
}

export default Item;