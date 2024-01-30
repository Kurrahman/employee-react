import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchBar from "../components/SearchBar";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const SEARCH_BAR_TEST_ID = 'searchBar'

afterEach(() => {
  cleanup()
})

test('SearchBar renders', ()=>{
  const document = render(
    <SearchBar/>
  )
  const component = document.getByTestId(SEARCH_BAR_TEST_ID)
  expect(component).toBeInTheDocument();
})

test('SearchBar renders disabled', ()=>{
  act(() =>{
    render(<SearchBar disabled/>)
  })
  const component = screen.getByTestId(SEARCH_BAR_TEST_ID)
  expect(component).toBeDisabled();
})

test('SearchBar renders placeholder', ()=>{
  const document = render(
    <SearchBar placeholder="Test"/>
    )
  const component = document.getByTestId(SEARCH_BAR_TEST_ID)
  expect(component).toHaveAttribute('placeholder', 'Test')
})

test('SearchBar fill', ()=>{
  var query = ''
  function handleFillSearchBar(s){
    query = s
  }
  const document = render(
    <SearchBar onChange={handleFillSearchBar}/>
    )
  const component = document.getByTestId(SEARCH_BAR_TEST_ID)
  userEvent.type(component, 'test')
  expect(component).toHaveValue('test')
})

test('SearchBar submit', ()=>{
  var query = ''
  function handleSubmitSearchBar(s){
    query = s
  }
  const document = render(
    <SearchBar onSubmit={handleSubmitSearchBar}/>
    )
  const component = document.getByTestId(SEARCH_BAR_TEST_ID)
  userEvent.type(component, 'test{enter}')
  expect(query).toEqual('test')
})
