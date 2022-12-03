import React from 'react';
import { extractCategories } from '../ts/categories';

const Categories = (prop: { categoryState }) => {
  let elements;
  let elementsLoaded = false;

  if (prop.categoryState != 'error' && prop.categoryState != 'loading') {
    elements = extractCategories(prop.categoryState);
    elementsLoaded = true;
  } else {
    elements = prop.categoryState;
  }

  return (
    <div>
      {elementsLoaded
        ? elements.map((x) => {
            return x;
          })
        : elements}
    </div>
  );
};

export default Categories;
