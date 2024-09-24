import { useState, useEffect } from 'react'
import styled from "styled-components";
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL = "http://localhost:9000";

function App() {

    // const data = [
    //   {
    //     name: "Boilded Egg",
    //     price: 10,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/egg.png",
    //     type: "breakfast",
    //   },
    //   {
    //     name: "RAMEN",
    //     price: 25,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/ramen.png",
    //     type: "lunch",
    //   },
    //   {
    //     name: "GRILLED CHICKEN",
    //     price: 45,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/chicken.png",
    //     type: "dinner",
    //   },
    //   {
    //     name: "CAKE",
    //     price: 18,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/cake.png",
    //     type: "breakfast",
    //   },
    //   {
    //     name: "BURGER",
    //     price: 23,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/burger.png",
    //     type: "lunch",
    //   },
    //   {
    //     name: "PANCAKE",
    //     price: 25,
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //     image: "/images/pancake.png",
    //     type: "dinner",
    //   },
    // ];

  const [data, setdata] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [slectedBtn, setSlectedBtn] = useState('all')
  
  //here useeffect hook used for fetching data from api when the ap load 
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setdata(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        seterror("Unable to fetch data",error);
      }
    }
    fetchFoodData();
  }, [])
  
  
  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  }

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSlectedBtn("all");
      return;
    }

    const filter = data?.filter((food) => 
      food.type.toLowerCase().includes(type.toLowerCase())
    )
    setFilteredData(filter);
    setSlectedBtn(type);
  }

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input onChange={searchFood} placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((value) => (
          <Button
            isSelected={slectedBtn === value.type}
            key={value.name}
            onClick={() => filterFood(value.type)}
          >
            {value.name}
          </Button>
        ))}

      </FilterContainer>
      <SearchResult data={filteredData} />
    </Container>
  );
}

export default App

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
  
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;