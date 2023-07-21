import { useState, useRef, useEffect } from 'react';
import Card from "../card/Card";
import axios from "axios";
import { AppBar, Toolbar, Typography, Box, styled, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, BookmarkAdd, Clear } from '@mui/icons-material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import './Header.css'
import MovieDetail from "../movieDetail/MovieDetail";
import LiveSearchResults from "../search/LiveSearchResults";

const StyledToolBar = styled(Toolbar)`
  background: #121212;
  min-height: 50px !important;
  padding: 0 px !important;
  padding-left: 0 10 ;

  
  & > * {
    padding: 0 20px;
  }
  & > div {
    display: flex;
 
    & > p {
      font-weight: 600;
      font-size: 14px;
    }
  }
  & > p {
    font-weight: 600;
    font-size: 14px;
  }
  
`;


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef();
  const [openSuggestions, setOpenSuggestions] = useState(false); // Separate state for suggestions dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setLiveSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${value}`
      );
      console.log("search", searchTerm)
      setMovies(response.data.results);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }

  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.length >= 3) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${inputValue}`)
        .then((response) => {
          setSuggestions(response.data.results);
          setOpenSuggestions(true); // Open the suggestions dropdown
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
      setOpenSuggestions(false); // Close the suggestions dropdown
    }
    const handleChange = async (event) => {
      setSearchTerm(event.target.value);
      if (event.target.value.trim() === "") {
        setLiveSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${event.target.value}`
        );
        setLiveSearchResults(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const handleResultClick = (movie) => {
      setSearchTerm(movie.title);
      setLiveSearchResults([]);
      navigate(`/movie/${movie.id}`);
    };

    const handleToggleMenu = () => {
      setOpenMenu(prev => !prev);
    };

    const handleClearSearch = (event) => {
      event.preventDefault();
      setValue('');
    };
    return (
      <div>
        {/* <div className="row p-2 pt-3 pb-3 d-flex align-items-center"> */}
        <AppBar style={{ minHeight: 30 }} position='static'>
          <StyledToolBar>

            <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                width="80" height="30" alt="Logo" />
            </Link>


            <Box style={{ cursor: 'pointer' }} ref={anchorRef} onClick={handleToggleMenu}>
              <MenuIcon />
              <Typography>Menu</Typography>
            </Box>

            <Menu anchorEl={anchorRef.current} open={openMenu} onClose={() => setOpenMenu(false)}>
              <MenuItem onClick={() => navigate("/movies/popular")}>Popular</MenuItem>
              <MenuItem onClick={() => navigate("/movies/upcoming")}>Upcoming</MenuItem>
              <MenuItem onClick={() => navigate("/movies/top_rated")}>Top_Rated</MenuItem>
            </Menu>


            <div ref={searchInputRef} className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for..."
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                  endAdornment: value && (
                    <Clear className="clear-icon" onMouseDown={(event) => handleClearSearch(event)} />
                  ),
                }}
              />
              <span>
                <button
                  className="form-control"
                  style={{
                    backgroundColor: "#ffcc00",

                    color: "#121212",

                    fontWeight: "bold",

                    borderRadius: "0px 10px 10px 0px",

                    height: "40px",

                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor: "#ffc400",
                    },
                  }}
                  type="button"
                  onClick={handleSearch}

                >
                  <i className="fa fa-search fa-fw"></i> Search
                </button>
                {liveSearchResults.length > 0 && (
                  <LiveSearchResults
                    results={liveSearchResults}
                    onClick={handleResultClick}
                  />
                )}
              </span>
            </div>

            <Box style={{ cursor: 'pointer' }}>
              <BookmarkAdd />
              <Typography>Watchlist</Typography>
            </Box>
          </StyledToolBar>
        </AppBar>
        {/* </div> */}



        <Routes>
          <Route path="/search" element={<SearchResults movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div >
    );
  };

  const SearchResults = ({ movies }) => {
    return (
      <div>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    );
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
      setOpenSuggestions(false); // Close the suggestions dropdown when clicking outside
    }
  };

  const handleClearSearch = (event) => {
    event.preventDefault();
    setValue('');
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div >
        <AppBar style={{ minHeight: 56 }} position='static'>
          <StyledToolBar>
            <Link to="/">
              <img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                width="80" height="30" alt="Logo" />
            </Link>

            <Box ref={anchorRef} onClick={handleToggleMenu}>
              <MenuIcon />
              <Typography>Menu</Typography>
            </Box>

            <Menu anchorEl={anchorRef.current} open={openMenu} onClose={() => setOpenMenu(false)}>
              <MenuItem onClick={() => navigate("/movies/popular")}>Popular</MenuItem>
              <MenuItem onClick={() => navigate("/movies/upcoming")}>Upcoming</MenuItem>
              <MenuItem onClick={() => navigate("/movies/top_rated")}>Top_Rated</MenuItem>
            </Menu>


            <TextField
              type="text"
              className="searchBox"
              placeholder="Search for..."
              value={value}
              onChange={handleChange}
              InputProps={{
                endAdornment: value && (
                  <Clear className="clear-icon" onMouseDown={(event) => handleClearSearch} />
                ),
              }}
            />


            <Button variant="contained" onClick={handleSearch} style={{
              backgroundColor: '#ffcc00',
              color: '#121212',
              fontWeight: 'bold',
              borderRadius: '0px 10px 10px 0px',
              height: '40px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#ffc400',
              },
            }}>
              Search
            </Button>

            {suggestions.length > 0 && (
              <Menu
                className='dropdown'

                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSuggestions} // Use openSuggestions state for the suggestions dropdown
                onClose={() => setOpenSuggestions(false)}
              >
                {suggestions.map((suggestion) => (
                  <MenuItem
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="dropdown-row"
                  >
                    {suggestion.title}
                  </MenuItem>
                ))}
              </Menu>
            )}


            <Box>
              <BookmarkAdd />
              <Typography>Watchlist</Typography>
            </Box>
          </StyledToolBar>
        </AppBar>

        <Routes>
          <Route path="/search" element={<SearchResults movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default Navbar;

