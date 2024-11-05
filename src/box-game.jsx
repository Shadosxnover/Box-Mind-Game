import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const BoxMain = () => {
    const [iteration, setIteration] = useState(3);
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
    const [isGameActive, setIsGameActive] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const [activeBox, setActiveBox] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const [boxTime, setBoxTime] = useState(1000);
    const speed = [1000, 700, 400, 200];

    const [boxes, setBoxes] = useState({
        1: 'bg-gray-200',
        2: 'bg-gray-200',
        3: 'bg-gray-200',
        4: 'bg-gray-200',
        5: 'bg-gray-200',
        6: 'bg-gray-200',
        7: 'bg-gray-200',
        8: 'bg-gray-200',
        9: 'bg-gray-200',
    });

    useEffect(() => {
        if (isDisplayingSequence && sequence.length > 0) {
            let index = 0;
            const intervalId = setInterval(() => {
                if (index < sequence.length) {
                    const currentBox = sequence[index];
                    highlightBox(currentBox);
                    index++;
                } else {
                    clearInterval(intervalId);
                    setIsDisplayingSequence(false);
                    setIsGameActive(true);
                }
            }, boxTime);
        }
    }, [isDisplayingSequence, sequence]);

    const highlightBox = (boxNumber) => {
        setActiveBox(boxNumber);
        setTimeout(() => setActiveBox(null), 500);
    };

    const handleIncrement = () => {
        setIteration(prev => Math.min(prev + 1, 10));
    };

    const handleDecrement = () => {
        setIteration(prev => Math.max(prev - 1, 1));
    };

    const handleStart = () => {
        const newSequence = Array.from({ length: iteration }, () => Math.floor(Math.random() * 9) + 1);
        setSequence(newSequence);
        setUserSequence([]);
        setGameResult(null);
        setIsDisplayingSequence(true);
        setIsGameActive(false);
    };

    const handleBoxClick = (boxNumber) => {
        if (isGameActive) {
            const newUserSequence = [...userSequence, boxNumber];
            setUserSequence(newUserSequence);
            highlightBox(boxNumber);

            const currentStep = newUserSequence.length - 1;
            if (sequence[currentStep] === boxNumber) {
                if (newUserSequence.length === sequence.length) {
                    setGameResult('won');
                    setIsGameActive(false);
                }
            } else {
                setGameResult('lost');
                setIsGameActive(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            {showInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black p-8 rounded-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Box Mind Game!</h2>
                        <p className="mb-4">Instructions:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Set the number of boxes to remember</li>
                            <li>Click 'Start' to begin</li>
                            <li>Watch the sequence of highlighted boxes</li>
                            <li>Repeat the sequence by clicking the boxes</li>
                            <li>Win by correctly repeating the entire sequence</li>
                        </ul>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowInstructions(false)}
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}
            <h1 className="text-4xl font-bold mb-8">Box Mind Game</h1>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.keys(boxes).map((boxNumber) => (
                    <div
                        key={boxNumber}
                        className={`w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded cursor-pointer transition-colors duration-200 ${activeBox == boxNumber ? 'bg-blue-500' : boxes[boxNumber]}`}
                        onClick={() => handleBoxClick(Number(boxNumber))}
                    />
                ))}
            </div>

            <div className="flex mt-4 items-center gap-2 sm:gap-4">
                <button
                    onClick={handleDecrement}
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-1.5 sm:p-2 transition-colors"
                    disabled={iteration <= 1}
                >
                    <Minus size={20} />
                </button>
                <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
                    <div className="text-sm sm:text-lg font-semibold text-gray-300">Iterations</div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{iteration}</div>
                </div>
                <button
                    onClick={handleIncrement}
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-1.5 sm:p-2 transition-colors"
                    disabled={iteration >= 10}
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <label className="text-lg">Speed:</label>
                <select
                    className="w-20 h-8 pl-2 border border-gray-400 rounded bg-gray-800 text-white"
                    onChange={(e) => setBoxTime(e.target.value)}
                >
                    {speed.map((curSpeed, index) => (
                        <option key={index} value={curSpeed}>
                            {curSpeed}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleStart}
            >
                Start Game
            </button>

            {gameResult && (
                <div className={`mt-6 text-xl font-bold ${gameResult === 'won' ? 'text-green-500' : 'text-red-500'}`}>
                    {gameResult === 'won' ? 'Congratulations! You won!' : 'Oops! You lost!'}
                </div>
            )}
        </div>
    );
};

export default BoxMain;
