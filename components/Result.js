import React from 'react';

const Result = ({correct, inCorrect, totalWords, seconds}) => {
    return (
        <>
            <div className="section">
                <div className="columns">
                    <div className="column has-text-centered">
                        <p className="is-size-5">Words Per Minute: </p>
                        <p className="has-text-primary is-size-1">{correct ? (correct / (seconds / 60)) : 0}</p>
                    </div>
                    <div className="column has-text-centered">
                        <p className="is-size-5">Accuracy: </p>
                        <p className="has-text-info is-size-1">{correct ? Math.round((correct / (correct + inCorrect)) * 100) : 0} %</p>
                    </div>
                    <div className="column">
                        <p className="is-size-5">Points: </p>
                        <p className="has-text-info is-size-1"
                           data-testid={'correct'}>
                             {correct} / {totalWords}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Result;