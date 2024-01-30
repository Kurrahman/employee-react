import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import FileInput from "../components/FileInput";

const FILE_INPUT_TEST_ID = 'fileInput'

afterEach(() => {
  cleanup()
})

test('FileInput renders', () => {
  const document = render(
    <FileInput />
  )
  const component = document.getByTestId(FILE_INPUT_TEST_ID)
  expect(component).toBeInTheDocument()
})

test('FileInput render label', () => {
  const document = render(
    <FileInput label="Employee File" />
  )
  const component = document.getByTestId(FILE_INPUT_TEST_ID)
  expect(component).toHaveTextContent('Employee File')
})

test('FileInput load file', async () => {
  var output = {}
  function handleUploadFile(file) {
    output = file[0]
  }
  const document = render(
    <FileInput onChange={handleUploadFile} />
  )
  const inputComponent = document.getByTestId(FILE_INPUT_TEST_ID + '-input')
  
  const file = new File(['test file content'], 'employee.json');
  act(()=>{
    userEvent.upload(inputComponent, file)
  })
  expect(output).toStrictEqual(file)
})