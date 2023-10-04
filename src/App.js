import React, { useEffect, useState } from 'react';

import useHelloWorld from './custom-hooks/useHelloWorld.js';

import './style.css';

const useDate = () => {
  const date = new Date();

  const getDay = () => {
    return date.getDate();
  };

  const getMonth = () => {
    return date.getMonth();
  };

  const addDay = (numberOfDays) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + numberOfDays);

    // Check if the new date exceeds the number of days in the current month
    if (newDate.getMonth() !== date.getMonth()) {
      newDate.setDate(1); // Set the date to the 1st day of the new month
    }

    return newDate;
  };

  const addMonth = (numberOfMonths) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + numberOfMonths);

    // Check if the new date exceeds December (month index 11)
    if (newDate.getMonth() !== (date.getMonth() + numberOfMonths) % 12) {
      newDate.setMonth(0); // Set the month to January (month index 0) of the new year
      newDate.setFullYear(
        date.getFullYear() + Math.floor((date.getMonth() + numberOfMonths) / 12)
      );
    }

    return newDate;
  };

  return { date, getDay, getMonth, addDay, addMonth };
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const { value, setValue } = useHelloWorld();

  const { date, getDay, getMonth } = useDate();

  console.log('----->', value);

  // when a component mounts
  // when a component's state or props changes
  // when a component unmounts
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?limit=5'
        );

        const data = await response.json();

        console.log(data);
        setPosts(data);
        return () => {
          console.log('I am unmounting...');
        };
      } catch (error) {
        console.log(error);
      }
    })(); //iife
  }, []);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  useEffect(() => {
    console.log('Input changed');
  }, [input]);

  return (
    <div>
      {/* {posts.map((post) => (
        <div
          style={{ border: '1px dashed', marginBottom: '5px' }}
          key={post.id}
        >
          {post.title}
        </div>
      ))} */}
      {value}
      <br />
      Date: {date.toString()}
      <br />
      Day: {getDay()}
      <br />
      Month: {getMonth()}
      <br />
      <input type="text" onChange={handleChange} />
      <button
        onClick={() => {
          setValue(input);
        }}
      >
        Change The World
      </button>
    </div>
  );
}
