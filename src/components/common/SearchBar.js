'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

const SEARCH_TERMS = ['bedsheets', 'mattress', 'blankets', 'cushions', 'curtains'];

export default function SearchBar() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let wordIndex = 0;
    let timer;

    function tick() {
      const currentWord = SEARCH_TERMS[wordIndex];
      
      if (isDeleting) {
        i--;
        setText(currentWord.substring(0, i));

        if (i === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % SEARCH_TERMS.length;
          timer = setTimeout(tick, 500); // Wait before typing next
        } else {
          timer = setTimeout(tick, 50); // backspace speed
        }
      } else {
        i++;
        setText(currentWord.substring(0, i));

        if (i === currentWord.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2000); // 2 seconds delay on full word
        } else {
          timer = setTimeout(tick, 100); // typing speed
        }
      }
    }

    timer = setTimeout(tick, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder={`Search for ${text}|`} 
        className={styles.searchInput} 
      />
      <button aria-label="Search Submit" className={styles.searchSubmit} onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
    </div>
  );
}
