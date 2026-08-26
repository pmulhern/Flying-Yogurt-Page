/* Renders the venue/song accordion on performances.html.
 * Runs as a deferred script, so it executes after the DOM is parsed but
 * before DOMContentLoaded fires — main.js's accordion + icon init (which
 * listens for DOMContentLoaded) then picks up the markup rendered here. */
(function () {
  "use strict";

  var VENUES = [
    {
      name: "Barrel Splitters in Philadelphia, PA",
      songs: [
        { title: "Eruption / Heartbreaker / Living Loving Maid", url: "https://www.youtube.com/watch?v=35wDzF__PI0" },
        { title: "Lonely Is the Night", url: "https://www.youtube.com/watch?v=98rfswN_Fts" },
        { title: "Gimme Some Lovin'", url: "https://www.youtube.com/watch?v=pQ9GsOaC3fk" },
        { title: "Holiday", url: "https://www.youtube.com/watch?v=JURjBqVglag" },
        { title: "Money for Nothing", url: "https://www.youtube.com/watch?v=S6iyMFboNoA" },
        { title: "Bad Moon Rising", url: "https://www.youtube.com/watch?v=vdnCit6CUhY" },
      ],
    },
    {
      name: "Broken Goblet in Bensalem, PA",
      songs: [
        { title: "Crazy Train", url: "https://www.youtube.com/watch?v=uVPg92oYJuk" },
        { title: "Ballroom Blitz", url: "https://www.youtube.com/watch?v=QLXr6TqxLsU" },
        { title: "Classic Rock Medley", url: "https://www.youtube.com/watch?v=vFQftjqE9L0" },
        { title: "White Rabbit", url: "https://www.youtube.com/watch?v=EZSy9-a7hsA" },
        { title: "Sultans of Swing", url: "https://www.youtube.com/watch?v=fERLpwVpRVo" },
      ],
    },
    {
      name: "First Fridays in Ambler (Summer Festival), Ambler, PA",
      songs: [
        { title: "Green River", url: "https://www.youtube.com/watch?v=fqlO-8FU9Wo" },
        { title: "Mr. Soul", url: "https://www.youtube.com/watch?v=fqlO-8FU9Wo" },
        { title: "Iron Man", url: "https://www.youtube.com/watch?v=8TrqqPGW0-c" },
        { title: "Heartbreaker / Living Loving Maid", url: "https://www.youtube.com/watch?v=eUlwIVJTPXg" },
        { title: "Born to Be Wild", url: "https://www.youtube.com/watch?v=kOkf7nr3N1k" },
        { title: "Santeria", url: "https://www.youtube.com/watch?v=ivxqCvh_7Lg" },
        { title: "Long Cool Woman", url: "https://www.youtube.com/watch?v=NaBucYO0AEo" },
      ],
    },
    {
      name: "Founding Fathers in Bensalem, PA",
      songs: [
        { title: "Born to Be Wild", url: "https://www.youtube.com/watch?v=C8_4jPxWNsg" },
        { title: "Sultans of Swing", url: "https://www.youtube.com/watch?v=xUrSIBq5Orw" },
        { title: "Basket Case", url: "https://www.youtube.com/watch?v=LpkaZ4gJ2jo" },
        { title: "Lonely Is the Night", url: "https://www.youtube.com/watch?v=q8utdNGBL7g" },
      ],
    },
    {
      name: "Celtic Cross in Philadelphia, PA",
      songs: [
        { title: "Ohio", url: "https://www.youtube.com/watch?v=BPZdgeN4WzU" },
        { title: "Mr. Soul", url: "https://www.youtube.com/watch?v=5XZae8Dxo5E" },
        { title: "Can't Get Enough", url: "https://www.youtube.com/watch?v=Ka2IhimkwIs" },
      ],
    },
    {
      name: "Founding Fathers in Bensalem, PA (Set Two)",
      songs: [
        { title: "Ohio", url: "https://www.youtube.com/watch?v=3uPb421chno" },
        { title: "Santeria", url: "https://www.youtube.com/watch?v=r3rOGfEb__A" },
        { title: "Old Man Down the Road", url: "https://www.youtube.com/watch?v=Hjd5MsvuPe4" },
        { title: "Iron Man", url: "https://www.youtube.com/watch?v=d7i35nrgMAY" },
      ],
    },
    {
      name: "Founding Fathers in Bensalem, PA (Set Three)",
      songs: [
        { title: "War Pigs", url: "https://www.youtube.com/watch?v=yFqET3zebLk" },
        { title: "Green River", url: "https://www.youtube.com/watch?v=3pp35lJQZOU" },
        { title: "Back in the U.S.S.R.", url: "https://www.youtube.com/watch?v=HfirNbWpStc" },
        { title: "Born on the Bayou", url: "https://www.youtube.com/watch?v=A8BsUEy-7u8" },
        { title: "Doorbell Dixie", url: "https://www.youtube.com/watch?v=p6p4SDZcH_k" },
        { title: "Brown Eyed Girl", url: "https://www.youtube.com/watch?v=qk_QKIYId9s" },
        { title: "It's So Easy", url: "https://www.youtube.com/watch?v=3hESovXqYJA" },
        { title: "Paranoid", url: "https://www.youtube.com/watch?v=KmvvdnbUJYU" },
        { title: "Mr. Soul", url: "https://www.youtube.com/watch?v=K-o3SxU_yc0" },
        { title: "Long Cool Woman", url: "https://www.youtube.com/watch?v=JTjib5Exf1M" },
        { title: "Mary Jane's Last Dance", url: "https://www.youtube.com/watch?v=o7uv7rQZWp8" },
        { title: "Tin Man", url: "https://www.youtube.com/watch?v=cCTNTtq0PyU" },
        { title: "Good Riddance", url: "https://www.youtube.com/watch?v=brB0rUtt2xA" },
        { title: "Old Man", url: "https://www.youtube.com/watch?v=AjttC8v4DlM" },
      ],
    },
    {
      name: "Cheshire Brewing in Elkins Park, PA",
      songs: [
        { title: "Green River", url: "https://www.youtube.com/watch?v=1ljn1Rx4wlc" },
        { title: "Born on the Bayou", url: "https://www.youtube.com/watch?v=s1GW3TuUJ0A" },
        { title: "Born to Be Wild", url: "https://www.youtube.com/watch?v=7Qu15Hp_Y4I" },
        { title: "Back in the U.S.S.R.", url: "https://www.youtube.com/watch?v=zSgOTpjWelQ" },
      ],
    },
  ];

  var YT_ICON =
    '<svg class="icon-yt" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.4-.43-5.03a2.87 2.87 0 0 0-2-2.03C18.94 4.5 12 4.5 12 4.5s-6.94 0-8.57.44a2.87 2.87 0 0 0-2 2.03C1 8.6 1 12 1 12s0 3.4.43 5.03a2.87 2.87 0 0 0 2 2.03C5.06 19.5 12 19.5 12 19.5s6.94 0 8.57-.44a2.87 2.87 0 0 0 2-2.03C23 15.4 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z"/></svg>';
  var EXT_ICON =
    '<svg class="icon-ext" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';

  function songLink(song) {
    return (
      '<a class="song-link" href="' +
      song.url +
      '" target="_blank" rel="noopener">' +
      YT_ICON +
      '<span class="song-title">' +
      song.title +
      "</span>" +
      EXT_ICON +
      "</a>"
    );
  }

  function venueBlock(venue) {
    return (
      '<div class="accordion-item">' +
      '<button class="accordion-toggle" aria-expanded="false">' +
      venue.name +
      "</button>" +
      '<div class="accordion-panel">' +
      '<div class="accordion-panel-inner song-grid">' +
      venue.songs.map(songLink).join("") +
      "</div></div></div>"
    );
  }

  var target = document.getElementById("venues");
  if (target) {
    target.innerHTML = VENUES.map(venueBlock).join("");
  }

  var SETLIST = [
    { song: "Across the Universe", artist: "The Beatles" },
    { song: "Back in the U.S.S.R.", artist: "The Beatles" },
    { song: "Ballroom Blitz", artist: "Sweet" },
    { song: "Basket Case", artist: "Green Day" },
    { song: "Beat It", artist: "Michael Jackson" },
    { song: "Born to Be Wild", artist: "Steppenwolf" },
    { song: "Can't Get Enough", artist: "Original" },
    { song: "Closing Time", artist: "Semisonic" },
    { song: "Crazy Train", artist: "Ozzy Osbourne" },
    { song: "Day Tripper", artist: "The Beatles" },
    { song: "Don't You (Forget About Me)", artist: "Simple Minds" },
    { song: "Doorbell Dixie", artist: "Original" },
    { song: "Dream On", artist: "Aerosmith" },
    { song: "Enter Sandman", artist: "Metallica" },
    { song: "Eruption", artist: "Van Halen" },
    { song: "Gimme Some Lovin'", artist: "Spencer Davis Group" },
    { song: "Girls on Film", artist: "Duran Duran" },
    { song: "Good Riddance", artist: "Green Day" },
    { song: "Green Onions", artist: "Booker T. & the M.G.'s" },
    { song: "Green River", artist: "Creedence Clearwater Revival" },
    { song: "Heartbreaker", artist: "Led Zeppelin" },
    { song: "Hey Jude", artist: "The Beatles" },
    { song: "Holiday", artist: "Green Day" },
    { song: "I've Just Seen a Face", artist: "The Beatles" },
    { song: "Iron Man", artist: "Black Sabbath" },
    { song: "It's So Easy", artist: "Guns N' Roses" },
    { song: "Jet Airliner", artist: "Steve Miller Band" },
    { song: "Joker and the Thief", artist: "Wolfmother" },
    { song: "La Grange", artist: "ZZ Top" },
    { song: "Let It Be", artist: "The Beatles" },
    { song: "Living Loving Maid", artist: "Led Zeppelin" },
    { song: "Lonely Is the Night", artist: "Billy Squier" },
    { song: "Lookin' Out My Back Door", artist: "Creedence Clearwater Revival" },
    { song: "Love Shack", artist: "The B-52's" },
    { song: "Money for Nothing", artist: "Dire Straits" },
    { song: "Mr. Soul", artist: "Buffalo Springfield" },
    { song: "No Rain", artist: "Blind Melon" },
    { song: "Ohio", artist: "Crosby, Stills, Nash & Young" },
    { song: "Old Man Down the Road", artist: "John Fogerty" },
    { song: "Paranoid", artist: "Black Sabbath" },
    { song: "Pump It Up", artist: "Elvis Costello" },
    { song: "Rock'n Me", artist: "Steve Miller Band" },
    { song: "Run Through the Jungle", artist: "Creedence Clearwater Revival" },
    { song: "Santeria", artist: "Sublime" },
    { song: "(I Can't Get No) Satisfaction", artist: "The Rolling Stones" },
    { song: "Seek and Destroy", artist: "Metallica" },
    { song: "She's So High", artist: "Tal Bachman" },
    { song: "Stranglehold", artist: "Ted Nugent" },
    { song: "The Middle", artist: "Jimmy Eat World" },
    { song: "Thunderstruck", artist: "AC/DC" },
    { song: "War Pigs", artist: "Black Sabbath" },
    { song: "What I Like About You", artist: "The Romantics" },
    { song: "Your Love", artist: "The Outfield" },
  ];

  function repertoireItem(entry) {
    return (
      '<div class="repertoire-item"><span class="song">' +
      entry.song +
      '</span><span class="artist">' +
      entry.artist +
      "</span></div>"
    );
  }

  var setlistTarget = document.getElementById("setlist");
  if (setlistTarget) {
    setlistTarget.innerHTML =
      SETLIST.map(repertoireItem).join("") +
      '<div class="repertoire-item repertoire-item--more">&amp; Many More</div>';
  }
})();
