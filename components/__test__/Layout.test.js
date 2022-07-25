import React from "react";
import Result from "../Result";
import Layout from "../Layout/Layout";
import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
    cleanup();
});

it('renders Layout component ', function () {
    const {getByTestId} = render(<Layout/>);
    const LayoutElement = getByTestId('layout');
    expect(LayoutElement).toBeInTheDocument();

});

it('Set Time button works correctly ', function () {
    const {getByTestId} = render(<Layout/>);
    const timeInMin = getByTestId('time-header');
    const setBtn = screen.getByTestId(`set-mins`);
    const inputEl = screen.getByTestId(`enter-time`);
    expect(setBtn).toHaveTextContent(`Set`);
    const chosenTime = 8;

    expect(timeInMin).toHaveTextContent(`01 : 00`);

    fireEvent.change(inputEl, {
        target : {
            value: chosenTime
        }
    });

    fireEvent.click(setBtn);

    expect(timeInMin).toHaveTextContent(`0${chosenTime} : 00`)

});

it('renders Custom text button correctly', function () {
    const {getByTestId} = render(<Layout/>);
    const customBtn = getByTestId('custom-text');
    const startBtn = getByTestId('start');
    const randomText = getByTestId('words');

    expect(customBtn).toBeInTheDocument();
    expect(randomText).toBeInTheDocument();

    fireEvent.click(startBtn);

    expect(customBtn).not.toBeInTheDocument();
});

it('track input change as user types', function () {
    const {getByTestId} = render(<Layout/>);
    render(<Result/>);
    const typeInput = getByTestId('keyChange');
    const correctWords = screen.getByTestId('correct');
    const startBtn = getByTestId('start');

    expect(correctWords).toHaveTextContent(0);

    fireEvent.click(startBtn);

    fireEvent.change(typeInput, {
        target: {
            value: 'throw'
        }
    });

    fireEvent.keyDown(typeInput, {
        keyCode: 32
    });

    expect(correctWords).toHaveTextContent(0);

});