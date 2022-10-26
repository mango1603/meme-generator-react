import React from "react";

export default function Main() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function getNewMeme() {
    const memeUrl =
      allMemeImages[Math.floor(Math.random() * allMemeImages.length)]["url"];
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: memeUrl,
    }));
  }

  function handleData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main className='main'>
      <div className='form'>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Top text'
            value={meme.topText}
            onChange={handleData}
            name='topText'
          />
          <input
            type='text'
            placeholder='Bottom text'
            value={meme.bottomText}
            onChange={handleData}
            name='bottomText'
          />
        </div>
        <button
          onClick={getNewMeme}
          className='get-img--btn'
        >
          Get a new meme image
        </button>
      </div>

      <div className='meme'>
        <img
          src={meme.randomImage}
          className='meme-img'
        />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  );
}
