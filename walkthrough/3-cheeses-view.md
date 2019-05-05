# The Cheeses View

- [previous: `2-categories-view.md`](./2-categories-view.md)
- [next: `4-menus-view.md`](./4-menus-view.md)
- topics
  - conditional props
  - complex component interactions
- components
  - `<CheesesView>`
  - `<CheeseForm>`
  - `<CheeseCategorySelector>`
  - `<CheesesList>`

Now that we have completed the Categories View it's time to implement the next piece of our dependency chain - the Cheeses View. It will have a form to add a new cheese and a table of cheeses with the ability to view cheeses per category. This is the most complex set of components for this project. The good news is that you will learn a lot implementing it!

Our Cheese View will be made up of three sub-components. The `<CheesesList>` component will render a table of cheeses with their name, category (name), and description. The `<CheeseCategorySelector>` component will provide a dropdown menu for selecting a category. When the dropdown menu changes we will use the `onChange` event to fetch cheeses for the chosen category. Finally, the `<CheeseForm>` component will be responsible for receiving user input of the name, category, and description and submitting this data to the backend for Cheese creation.

## The `<CheesesView>` Component

The Cheeses View component is responsible for:

- rendering a form component for creating a new cheese
- rendering a table component for listing cheeses
- rendering a category dropdown menu for displaying all cheeses or for a specific category
- requesting a list (collection) of cheeses from the API
- updating the list of cheeses when a new one is created from the form
  - **note that this data and several others throughout the application would normally be handled by an application state manager to prevent repeated fetching of resources**
    - React Context
    - Redux

With these requirements in mind lets begin with the **Declaration** step of the cycle.

- state
  - `cheeses`: an array of cheese objects
    - initial value: `[]` empty array
  - `categories`: an array of category objects
    - initial value: `[]` empty array
  - `selectedCategoryID`: the ID of the currently selected category
    - initial value: `''`: empty string
      - indicates that no category has been selected, show all cheeses
- methods
  - lifecycle
    - `componentDidMount`: where we will make an API request
      - for the current state of the cheeses collection
      - for the current state of the categories collection
  - handlers
    - `addToCheeses`: receives a new cheese to add to its cheeses list
    - `deleteCheese`: receives a cheese ID
      - sends a delete request
      - removes the cheese from its cheeses list
    - `changeCategory`: receives a category ID and fetches the cheese collection for that category
      - uses the `getCategoryCheeses` utility function
- utility functions
  - `getCategoryCheeses`: receives a category ID and fetches the cheeses for that category
    - if the category ID is `''` then it fetches all the cheeses
- rendering
  - grid `<Container>`: to hold and position its children
    - `<CheeseForm>`
      - data props
        - `categories` list
      - handler props
        - `addCheese` to use the `addToCategories` method
          - will be called when the form is submitted and new cheese is received from the API
    - `<CheeseCategorySelector>`
      - data props
        - `categories` list
      - handler props
        - `handleChange` to use the `changeCategory` method
    - `<CheesesList>`
      - data props
        - `cheeses` list
      - handler props
        - `removeCheese` to use the `deleteCheese` method
          - should only be passed in if the `categoryID` is `""` meaning "all cheeses"
            - there is only a `DELETE /cheeses/:cheeseID` endpoint
            - cheeses can not be deleted within a category since the `category_id` column has a `NOT NULL` constraint

Your tasks

- create the files listed below
- copy the starter code to its file
- complete the TODOs in the snippet

directory structure

```sh
src/
  index.js
  App.js
  Routes.js
  utilities/
  components/
    category/
*   cheese/
*     CheeseForm.js
*     CheesesList.js
*     CheeseCategorySelector.js
    CheeseNav.js
    Footer.js
  views/
    HomeView.js
*   CheesesView.js <--- copy and complete starter code
    CategoriesView.js
    MenusView.js
```

`src/views/CheesesView.js`

```js
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import request from "../utilities/api-request";
import CheesesList from "../components/Cheese/CheesesList";
import CheeseForm from "../components/Cheese/CheeseForm";
import CheeseCategorySelector from "../components/Cheese/CheeseCategorySelector";

const getCategoryCheeses = async categoryID => {
  // selects the "all cheeses" or "cheeses by category" endpoint depending on the category ID
  const endpoint = categoryID === "" ? "/cheeses" : `/cheeses/category/${categoryID}`;

  // requests the data and returns it
  const res = await request.get(endpoint);
  return res.data;
};

class CheesesView extends Component {
	state = {
    // TODO: implement the initial state
	};

	async componentDidMount() {
    const cheeseRes = // TODO: implement a request to the cheeses collection
    const cheeses = cheeseRes.data;

    const categoriesRes = // TODO: implement a request to the categories collection
    const categories = categoriesRes.data;

		this.setState({ cheeses, categories });
	}

	addToCheeses = cheese =>
		this.setState(state => {
			const { cheeses } = state;
			// TODO: return the new state that merges the cheeses list with the new cheese
		});

	removeFromCheeses = async cheeseID => {
		const res = // TODO: implement a request to the correct endpoint to delete the cheese (be mindful of the HTTP method you need)

    // if the DELETE request was unsuccessful exit early
    if (res.status !== 204) {
      return;
    }

    // otherwise update state by removing the cheese
		this.setState(state => {
			const cheeses = state.cheeses.filter(cheese => cheese.id !== cheeseID);
			return { cheeses };
		});
	};

	changeCategory = async categoryID => {
    // exit early if the same category ID is chosen
		if (categoryID === this.state.categoryID) return;


    // TODO: fetch the cheeses using the getCategoryCheeses utility
    // TODO: update state with the new cheeses for the category returned by getCategoryCheeses
	};

	render() {
		const { cheeses, categories, showForm, categoryID } = this.state;

		return (
			<Container>
				<Row>
          <CheeseForm
            {/* TODO: complete the props for this component */}
          />
				</Row>
				<hr />
				<Row>
					<Col xs={12} md={8} lg={4}>
						<CheeseCategorySelector
              {/* TODO: complete the props for this component */}
						/>
					</Col>
				</Row>
				<br />
        <CheesesList
          {/* TODO: complete the props for this component */}
					// only show [remove] button if in 'All' category
					removeCheese={categoryID === "" && this.deleteCheese}
				/>
			</Container>
		);
	}
}

export default CheesesView;
```

### Conditional Props

You may be confused by this line `removeCheese={categoryID === "" && this.deleteCheese}`. This technique, [called the short circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation) is often used in React projects because of its simplicity and ability to be used in expression blocks.

Remember that `{}` blocks in JSX may only contain expressions. You can't use `if/else if/else` blocks in them! When you need to perform boolean logic you may use the [conditional operator (ternary expression)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to evaluate if / else scenarios. But the "short circuit" in-line if can be used when the else condition only needs to return a falsey value.

Check out these links if you need a refresher on [truthy values](https://developer.mozilla.org/en-US/docs/Glossary/truthy) and [falsy values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).

This techniques is useful for times when you want to conditionally pass a prop or render content. To wrap your head around how it works open up `node` on the command line and try pasting in some of these examples:

```js
// if the operand on the left is true (or a truthy value)
// then the operand on the right will be returned after evaluation
true && "i got returned from the evaluation";

// a non-empty string is a "truthy" value
"non empty string" && "i got returned from the evaluation";

// if  the operand on the left is false (or a falsy value)
// then it will be returned after evaluation
false && "i did not get returned from the evaluation";
// false is returned

undefined && "i did not get returned from the evaluation";
// undefined is returned
```

In our case we are saying "if the category ID is truthy (not an empty string)" then pass the handler prop. Otherwise pass the "falsy" value that caused the expression to short circuit. Inside the `<CheesesList>` component we will check if the (optional) handler prop is a function (a truthy value).

If it is then we will use it by rendering a remove button next to each cheese. If its value is `false` then we know we must be in a specific category of cheeses (since `cheeseID === ""` will evaluate to `false`) and should not render the remove button.

You can simulate this in `node` with the following code

```js
// try changing the categoryID from an empty string to a number greater than 1 (simulating a category ID)
categoryID = "";

// then rerun the following expression with different values to see the result
categoryID === "" && "the handler method was provided";

// categoryID is not an empty string: returns false
// categoryID is an empty string: returns 'the handler method was provided'
```

Let's evaluate the dependency chain across the Child components we need to implement:

- `<CheesesList>`
  - depends on the `<CheeseForm>` that creates cheeses to display in the table
    - indirectly depends on the `<CheeseCategorySelector>`
- `<CheeseForm>
  - depends on the `<CheeseCategorySelector>` since each cheese will need to have a category chosen before submitting
- `<CheeseCategorySelector>`
  - no dependencies

Given this order in the component dependency chain we should implement them in the following order:

- `<CheeseCategorySelector>`
- `<CheeseForm>
- `<CheesesList>`

## The `<CheeseCategorySelector>` Component
