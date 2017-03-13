import React from 'react';

export function renderSpecs(specs) {
  for (var item in specs) {
    if (specs.hasOwnProperty(item)) {
      console.log(item, specs[item])
    }
  }
}
