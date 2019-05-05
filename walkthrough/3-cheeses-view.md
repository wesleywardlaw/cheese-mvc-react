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
    - `getCategoryCheeses`: receives a category change event object
      - gets the category ID from the value of the chosen category from the event object
      - updates the cheeses list with cheeses for that category
      - if the category ID is an empty string, `""`, then it fetches all the cheeses
      - otherwise it fetches the cheeses with the chosen category ID
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
        - `firstOption` the user facing text, `"All Cheeses"` of the first option in the select menu
        - `categoryID` value of the chosen category from component state
      - handler props
        - `handleChange` to use the `getCategoryCheeses` method
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

  getCategoryCheeses = async categoryChangeEvent => {
    // extract the chosen option value from the event object
    const categoryID = categoryChangeEvent.target.value;

    // exit early if the same category ID is chosen
		if (categoryID === this.state.categoryID) return;

    // selects the "all cheeses" or "cheeses by category" endpoint depending on the category ID
    const endpoint = categoryID === "" ? "/cheeses" : `/cheeses/category/${categoryID}`;

    const res = // TODO: fetch the cheeses using the endpoint
    const cheeses = res.data;

    // TODO: update state with the cheese list from the response
  };

	render() {
		const { cheeses, categories, categoryID } = this.state;

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
					// only show [remove] button if in 'All' category (categoryID is an empty string)
					removeCheese={categoryID === "" && this.deleteCheese}
				/>
			</Container>
		);
	}
}

export default CheesesView;
```

### Conditional Props

You may be confused by this line `removeCheese={categoryID === "" && this.deleteCheese}`. This technique, [called the short circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation) is often used in React ([the official docs refer to it as the in-line if](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)) projects because of its simplicity and ability to be used in expression blocks.

Remember that `{}` blocks in JSX may only contain expressions. You can't use `if/else if/else` blocks in them! When you need to perform boolean logic you may use the [conditional operator (ternary expression)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to evaluate if / else scenarios. But the in-line if is even simpler to use.

The name itself, short circuit evaluation, describes how it can be used. When evaluated it will either:

- "short circuit" by returning the first value
  - if the first value / expression (what is on the left) evaluates to a falsy value
  - falsy values are `false` and other values that JavaScript considers "false-like"
    - [full list of falsy values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- "complete the circuit" by returning the last value
  - if the first value / expression evaluates to a truthy value
  - truthy values are `true` and other values JavaScript considers "true-like"
    - [full list of truthy values](https://developer.mozilla.org/en-US/docs/Glossary/truthy)

In our case:

- the first value will be what is returned from evaluating the expression `categoryID === ""`
  - `true`: if the category is "all cheeses" then the categoryID is an empty `""`
  - `false`: if the category is a specific category then the categoryID will be a positive number not an empty string
- the second value is the `deleteCheese` method

So our behavior will be:

- if we are in a specific category then
  - the `cheeseID` field is not an empty string
  - the expression "short circuits" and returns the first value, `false`
  - our `<CheeseList>` component
  - will receive `false` in its `removeCheese` handler prop
  - will not render the remove button next to each cheese
- if we are in the "all cheeses" category then
  - the `cheeseID` field is an empty string
  - the expression "completes the circuit" and returns the second value, the `deleteCheese` method
  - our `<CheesesList>` component
    - receives the `deleteCheese` method in its `removeCheese` handler prop
    - will render a remove button next to each cheese

To further wrap your head around how it works open up `node` in your terminal and try pasting in some of these examples:

```js
// if the value on the left is true (or a truthy value)
// the circuit is completed
// the value on the right will be returned after evaluation
true && "i got returned from the evaluation";
// "i got returned from the evaluation" is returned

// if first value is false (or a falsy value)
// the circuit is short circuited
// the first value will be returned after evaluation
false && "i did not get returned from the evaluation";
// false is returned
```

You can simulate our example in `node` with the following code

```js
categoryID = "";
categoryID === "" && "the handler method was provided";

// categoryID is not an empty string: returns false
// categoryID is an empty string: returns 'the handler method was provided'
```

## Child Component Dependencies

Let's evaluate the dependency chain across the Child components we need to implement:

- `<CheesesList>`
  - depends on the `<CheeseForm>` that creates cheeses to display them in the table
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

The Cheese Category Selector component is actually pretty simple because its purpose is just rendering and reporting. What's interesting is that this component will be our first dynamic component. It needs to be used by two Parent components that have very different behaviors - one of which we haven't even created yet! Let's explore the two uses cases.

It will be used by the `<CheesesView>` component to trigger a request for cheeses whenever a new category is chosen. It passes `"All Cheeses"` for the `firstOption` prop so that the first option in the select menu satisfies its use case of fetching all the cheeses. 

We expect the`<CheeseForm>` component to use it for updating the form state for the `categoryID` field of the cheese that is being created. It should pass `"Select a Category"` as its `firstOption` prop to enforce the user selecting a category before submitting the form.  

What both of these components have in common is that they hold the `categoryID` in their own state and change this state by handling the `onChange` event when the select menu is used. Because they each have different ways of handling this event we chose to name the prop more generically as `handleChange` and `categoryID`. This way the prop is used make sense both to the Parent component passing it and the `<CheeseCategorySelector>` that uses it. If it was confusing you, this also explains why the prop names themself are generic but the names of the state fields and methods that each Parent assigns to it are specific to their use case.

The Cheese Selector component is responsible for:

- rendering a select menu with the list of categories
- creating options for the menu using the `firstOption` and list of categories
- handling the `onChange` event of the select element by calling its `handleChange` prop handler method
- should have minimal positional style components around it since it will be used in different components
  - for multi-use components we defer the positional styling to the Parent component that renders it

Since this component is only responsible for rendering and reporting (through its prop handler method) we can create it as a functional component:

- props
  - `firstOption`: (optional) the user facing text for the first option in the menu
  - `categories`: an array of category objects
  - 2-way binding with the Parent component
    - `handleChange`: the handler prop method provided by the Parent
    - `categoryID`: from the Parent which controls option is considered "selected"
- utility functions
  - `createCategoryOption`: transforms a category into a JSX select option
- rendering
  - a `<Form.Control>` component used as a `<select>` element
  - adding a first option element
    - its value should be an empty string (indicating it is an "empty" option)
    - its inner text (user facing) should use the `firstOption` data prop
  - iterating over the categories list and transforming it into select options

Your tasks

- copy the starter code to its file
- complete the TODOs in the snippet

`src/components/cheese/CheeseCategorySelector`

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { categoryPropType } from "../../utilities/prop-types";

export const createCategoryOption = category => (
	// TODO: return a JSX option using the category id and name
);

const CheeseCategorySelector = props => {
	const { categoryID, categories, firstOption, handleChange } = props;

	return (
		<Form.Control
			as="select"
			name="categoryID"
			value={categoryID}
			onChange={handleChange}
    >
      {/* TODO: implement the first option */}
			{/* TODO: transform the categories into options */}
		</Form.Control>
	);
};

CheeseCategorySelector.propTypes = {
	// TODO: implement the prop types
};

CheeseCategorySelector.defaultProps = {
  // makes the firstOption prop optional
  firstOption: "Select a Category",
};

export default CheeseCategorySelector;
```
