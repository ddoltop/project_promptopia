'use client'

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';
import { use } from 'bcrypt/promises';

const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post, index) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  //Search
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // const [posts, setPosts] = useState([]);
  // const {data: session} = useSession();
  // console.log('Feed called>>>>>>>>>>>>>', session);


  const fetchPosts = async () => {
    const response = await fetch('api/prompt',{cache: 'no-store'});
    if(response.status !== 200) {
      console.log('api/prompt Error >>>>>>>>>>>>>', response);
    } else {
      const data = await response.json();
      setAllPosts(data);
      setSearchResults(data);
      console.log('Feed useEffect called>>>>>>>>>>>>>', data.length);
    }
  }

  useEffect(() => {
    fetchPosts();
  },[])

  const filterPrompts = (text) => {
    const regex = new RegExp(text, "i");
    return allPosts.filter(
      (item) => 
        regex.test(item.creator.username) || 
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }
  

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      },500)
    );
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchResults(searchResult);
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchResults.length > 0 && (
      <PromptCardList 
        data={searchResults}
        handleTagClick={handleTagClick}
      />)}
    </section>
  )
}

export default Feed