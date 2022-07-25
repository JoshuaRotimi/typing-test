import React, {useState} from 'react';

const Timer = ({status, reset, setTimer}) => {
    const chooseTime = [1, 2, 5];
    const [selectTime, setSelectTime] = useState('');

    return (
        <div data-testid={'Timer'}>
            {
                status === 'started' && (
                    <div>
                        <button
                            className="button is-info"
                            onClick={reset} >
                            Give Up!
                        </button>
                    </div>
                )
            }
            {
                status !== 'started' && (
                    <div style={{display: 'flex',float: 'right', alignItems: 'center', flexFlow: 'wrap'}}>
                        Set Time : {' '}
                        {chooseTime.map((item) => (
                            <button
                                key={item} style={{margin: '10px'}}
                                className="button is-info"
                                onClick={() => setTimer(item)}
                                data-testid={`time-${item}`}
                            >
                                {item} min
                            </button>
                        ))}
                        <input type="number"
                               className={'input'}
                               style={{width: '30%', margin: '10px', textAlign: 'center'}}
                               value={selectTime}
                               data-testid={`enter-time`}
                               onChange={(e) => setSelectTime(parseInt(e.target.value))}/>
                        <button
                            style={{margin: '10px'}}
                            data-testid={`set-mins`}
                            className="button is-info" onClick={() => {
                            setTimer(selectTime);
                            setSelectTime('')
                        }}>
                            Set
                        </button>


                    </div>
                )
            }
        </div>
    )
};

export default Timer;