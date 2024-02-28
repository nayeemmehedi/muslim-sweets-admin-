export const message = [
  {
    label: "English",
    name: "englishName",
    message: "Please Add Here English Name!",
  },
  {
    label: "Bangla",
    name: "banglaName",
    message: "Please Add Here Bangla Name!",
  },
  {
    label: "Description",
    name: "description",
    message: "Please add here Description!!",
  },
];

export const numberMessage = [
  {
    label: "price",
    name: "price",
    message: "Please Add Here Price!",
    pattern: new RegExp(/^[0-9]+$/),
  },
  {
    label: "rating",
    name: "rating",
    message: "Please Add Here  Rating: 1-5!",
    pattern: new RegExp(/^(?:[1-4](?:\.[0-9]*)?|5(?:\.0*)?)$/),
  },
];
