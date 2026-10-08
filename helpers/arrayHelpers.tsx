import { FilmType } from '../types/DataTypes'
import moment from 'moment'

export const sortByImdbRating = (arr: FilmType[]): FilmType[] => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i]?.imdbRating < pivot?.imdbRating) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sortByImdbRating(leftArr), pivot, ...sortByImdbRating(rightArr)];
};

export const sortByDateReleaseDate = (arr: FilmType[]): FilmType[] => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareDate(arr[i].Released, pivot.Released)) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sortByImdbRating(leftArr), pivot, ...sortByImdbRating(rightArr)];
};

const compareDate = (date1: string, date2: string): number => {
  const firstDate = moment(date1);
  const secondDate = moment(date2);
  if (firstDate > secondDate) return 1;
  else if (firstDate < secondDate) return -1;
  else return 0;
}