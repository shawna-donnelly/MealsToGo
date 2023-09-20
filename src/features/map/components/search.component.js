import { Searchbar } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";

export const Search = () => {
  const { keyword, search, error: locationError } = useContext(LocationContext);
  const [searchVal, setSearchVal] = useState(keyword);

  useEffect(() => {
    setSearchVal(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={"map"}
        mode="bar"
        value={searchVal}
        placeholder="Search for a location"
        onSubmitEditing={() => {
          search(searchVal);
        }}
        onChangeText={(text) => setSearchVal(text)}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.small};
  position: absolute;
  z-index: 999;
  top: 50px;
  width: 100%;
`;
