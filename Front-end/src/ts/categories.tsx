import { sendRequest } from './communication';
import React from 'react';

export function extractCategories(categories) {
  const x: JSX.Element[] = [];

  categories.forEach((category) => {
    const liEl = <li>{category.name}</li>;
    const subCategories = extractCategories(category.subCategory);

    const element = (
      <ul key={category.name}>
        {liEl}
        {subCategories}
      </ul>
    );
    x.push(element);
  });
  return x;
}

export async function fetchCategories() {
  return await sendRequest('/categories', 'GET');
}
