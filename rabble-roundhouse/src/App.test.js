import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const numTestableItems = 5;

test("Check that data table view can render and display download selected", () => {
  render(<App />);
  const downloadSelected = screen.getByText(/Download Selected/i);
  expect(downloadSelected).toBeInTheDocument();
});

test("Check that clicking selectSwitch results in selectSwitch being in checked state", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).toBeChecked();
});

test("Check that double clicking selectSwitch results in selectSwitch being in unchecked state", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).not.toBeChecked();
});

test("Check that after selectSwitch is checked, clicking all item checkboxes results in selectSwitch being in unchecked state", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  for (var i = 0; i < numTestableItems; i++) {
    const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
    let currCheckbox = itemCheckboxes[i];
    fireEvent.click(currCheckbox);
  }
  expect(selectAllCheckbox).not.toBeChecked();
});

test("Check selectAll switch updates selected count to the max number of testable items", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).toBeChecked();
  const selectedAllText = "Selected " + numTestableItems;
  const selectedAll = screen.getByText(selectedAllText);
  expect(selectedAll).toBeInTheDocument();

  // Execute the click event again
  userEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).not.toBeChecked();
  const noneSelected = screen.getByText(/None Selected/);
  expect(noneSelected).toBeInTheDocument();
});

test("Check selectAll switch updates selected count back to None Selected after initial double click", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  // Execute the click event again
  userEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).not.toBeChecked();
  const noneSelected = screen.getByText(/None Selected/);
  expect(noneSelected).toBeInTheDocument();
});

test("Check that selectAll switch updates all item checkboxes to checked", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
  // All checkboxes should be checked
  for (var i = 0; i < numTestableItems; i++) {
    expect(itemCheckboxes[i]).toBeChecked();
  }
  // Execute the click event again and all should NOT be checked
  fireEvent.click(selectAllCheckbox);
  for (var i = 0; i < numTestableItems; i++) {
    expect(itemCheckboxes[i]).not.toBeChecked();
  }
});

test("Check that clicking each item checkbox once increments the selected count", () => {
  render(<App />);
  for (var i = 0; i < numTestableItems; i++) {
    const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
    let currCheckbox = itemCheckboxes[i];
    fireEvent.click(currCheckbox);
    let desiredString = "Selected " + (i + 1);
    let desiredSelectedText = screen.getByText(desiredString);
    expect(desiredSelectedText).toBeInTheDocument();
  }
});

test("Check that inputs can decrement total selected from All to None Selected ", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  const selectedAllText = "Selected " + numTestableItems;
  const selectedAll = screen.getByText(selectedAllText);
  expect(selectedAll).toBeInTheDocument();
  for (var i = 0; i < numTestableItems; i++) {
    const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
    let currCheckbox = itemCheckboxes[i];
    fireEvent.click(currCheckbox);
    // have to account for loop starting at zero
    if (i !== numTestableItems - 1) {
      let desiredString = "Selected " + (numTestableItems - i - 1);
      let desiredSelectedText = screen.getByText(desiredString);
      expect(desiredSelectedText).toBeInTheDocument();
    } else if (i === numTestableItems - 1) {
      let desiredString = "None Selected";
      let desiredSelectedText = screen.getByText(desiredString);
      expect(desiredSelectedText).toBeInTheDocument();
    }
  }
});

test("Check that clicking all item checkboxes results in selectSwitch being in checked state", () => {
  render(<App />);
  for (var i = 0; i < numTestableItems; i++) {
    const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
    let currCheckbox = itemCheckboxes[i];
    fireEvent.click(currCheckbox);
  }
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  expect(selectAllCheckbox).toBeChecked();
});

test("Check that after selectSwitch is checked, clicking all item checkboxes results in selectSwitch being in unchecked state", () => {
  render(<App />);
  const selectAllCheckbox = screen.getByTestId("selectAllCheckbox");
  fireEvent.click(selectAllCheckbox);
  for (var i = 0; i < numTestableItems; i++) {
    const itemCheckboxes = screen.getAllByTestId("itemCheckbox");
    let currCheckbox = itemCheckboxes[i];
    fireEvent.click(currCheckbox);
  }
  expect(selectAllCheckbox).not.toBeChecked();
});

test("Check that download selected can be clicked and fires an alert ", () => {
  render(<App />);
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  const download = screen.getByText("⤓ Download Selected");
  fireEvent.click(download);
  expect(alertMock).toHaveBeenCalledTimes(1);
});
