import React from "react";
import Timer from "../Timer";
import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
    cleanup();
});

it('renders Timer component ', function () {
    const {getByTestId} = render(<Timer/>);
    const TimerElement = getByTestId('Timer');
    expect(TimerElement).toBeInTheDocument();

});

it('renders time button correctly ', function () {
    render(<Timer/>);
    const id = 1;
    const timeButton = screen.getByTestId(`time-${id}`);
    expect(timeButton).toHaveTextContent(`${id} min`);
});

it('renders input correctly ', function () {
    render(<Timer/>);
    const inputEl = screen.getByTestId(`enter-time`);
    expect(inputEl.value).toBe(``);
});

it('change Input value works correctly', function () {
    render(<Timer/>);
    const inputEl = screen.getByTestId(`enter-time`);
    expect(inputEl.value).toBe(``);

    fireEvent.change(inputEl, {
        target : {
            value: '4'
        }
    });
    expect(inputEl.value).toBe('4');

});

