import { IFindWinnerInfo } from './types';

export const createFilledTable = (rowAndColumnAmount: number): string[][] => {
  return [...Array(rowAndColumnAmount)].map(() => Array(rowAndColumnAmount).fill(' '));
};

export const findWinner = (table: string[][]): IFindWinnerInfo => {
  const size = table.length;
  const stringToCheckFirstPlayer = createCheckStringForPlayer('x', table.length);

  const stringToCheckSecondPlayer = createCheckStringForPlayer('0', table.length);

  // this formula for finding of index of row to start compare diagonal
  const repeats = table.length === 3 ? 0 : table.length > 8 ? table.length - 5 : table.length - 4;

  // check vertical and horizontal lines
  for (let i = 0; i < size; i++) {
    const row = table[i].join('');
    const column = table.map((row) => row[i]).join('');

    if (row.includes(stringToCheckFirstPlayer) || column.includes(stringToCheckFirstPlayer)) {
      return {
        winner: 1,
        coordinates: getCoordinatesForRawsAndColumns(table, i, row, column, stringToCheckFirstPlayer),
      };
    } else if (row.includes(stringToCheckSecondPlayer) || column.includes(stringToCheckSecondPlayer)) {
      return {
        winner: 2,
        coordinates: getCoordinatesForRawsAndColumns(table, i, row, column, stringToCheckSecondPlayer),
      };
    }
  }

  //check main diagonal
  for (let newRepeats = repeats; newRepeats >= 0; newRepeats--) {
    let firstDiagonal = '';
    const firstDiagonalCoordinates = [];

    let secondDiagonal = '';
    const secondDiagonalCoordinates = [];

    let counter = 0;

    for (let rowIndex = newRepeats; rowIndex <= table.length - 1; rowIndex++) {
      firstDiagonal += table[rowIndex][counter];
      firstDiagonalCoordinates.push([rowIndex, counter]);

      secondDiagonal += table[counter][rowIndex];
      secondDiagonalCoordinates.push([counter, rowIndex]);

      counter++;
    }

    if (firstDiagonal.includes(stringToCheckFirstPlayer) || secondDiagonal.includes(stringToCheckFirstPlayer)) {
      return {
        winner: 1,
        coordinates: getCoordinatesForDiagonal(
          firstDiagonal,
          secondDiagonal,
          firstDiagonalCoordinates,
          secondDiagonalCoordinates,
          stringToCheckFirstPlayer,
        ),
      };
    } else if (
      secondDiagonal.includes(stringToCheckSecondPlayer) ||
      firstDiagonal.includes(stringToCheckSecondPlayer)
    ) {
      return {
        winner: 2,
        coordinates: getCoordinatesForDiagonal(
          firstDiagonal,
          secondDiagonal,
          firstDiagonalCoordinates,
          secondDiagonalCoordinates,
          stringToCheckSecondPlayer,
        ),
      };
    }
  }

  //check secondary diagonal
  for (let newRepeats = repeats; newRepeats >= 0; newRepeats--) {
    let firstDiagonal = '';
    const firstDiagonalCoordinates = [];
    let counter = table.length - 1;
    let secondDiagonal = '';
    const secondDiagonalCoordinates = [];
    let secondCounter = 0;

    for (let rowIndex = newRepeats; rowIndex <= table.length - 1; rowIndex++) {
      firstDiagonal += table[rowIndex][counter];
      firstDiagonalCoordinates.push([rowIndex, counter]);
      counter--;
    }

    for (let valueIndex = table.length - 1 - newRepeats; valueIndex >= 0; valueIndex--) {
      secondDiagonal += table[secondCounter][valueIndex];
      secondDiagonalCoordinates.push([secondCounter, valueIndex]);
      secondCounter++;
    }

    if (firstDiagonal.includes(stringToCheckFirstPlayer) || secondDiagonal.includes(stringToCheckFirstPlayer)) {
      return {
        winner: 1,
        coordinates: getCoordinatesForDiagonal(
          firstDiagonal,
          secondDiagonal,
          firstDiagonalCoordinates,
          secondDiagonalCoordinates,
          stringToCheckFirstPlayer,
        ),
      };
    } else if (
      secondDiagonal.includes(stringToCheckSecondPlayer) ||
      firstDiagonal.includes(stringToCheckSecondPlayer)
    ) {
      return {
        winner: 2,
        coordinates: getCoordinatesForDiagonal(
          firstDiagonal,
          secondDiagonal,
          firstDiagonalCoordinates,
          secondDiagonalCoordinates,
          stringToCheckSecondPlayer,
        ),
      };
    }
  }

  if (table.every((array) => array.every((value) => value !== ' '))) {
    return { winner: 0, coordinates: null };
  }

  return { winner: null, coordinates: null };
};

function createCheckStringForPlayer(symbol: 'x' | '0', tableLength: number) {
  return tableLength === 3 ? ''.padStart(3, symbol) : tableLength > 8 ? ''.padStart(5, symbol) : ''.padStart(4, symbol);
}

function getCoordinatesForRawsAndColumns(
  table: string[][],
  i: number,
  row: string,
  column: string,
  stringToCheckPlayer: string,
) {
  const coordinatesOfSymbolsInRow: number[][] = table[i].map((_value: string, indexOfValue: number) => [
    i,
    indexOfValue,
  ]);
  const coordinatesOfSymbolsInColumn: number[][] = table.map((_row, indexOfRow) => [indexOfRow, i]);

  const indexOfPatternInRow = row.indexOf(stringToCheckPlayer);
  const indexOfPatternColumn = column.indexOf(stringToCheckPlayer);

  return indexOfPatternColumn === -1
    ? coordinatesOfSymbolsInRow.splice(indexOfPatternInRow, stringToCheckPlayer.length)
    : coordinatesOfSymbolsInColumn.splice(indexOfPatternColumn, stringToCheckPlayer.length);
}

function getCoordinatesForDiagonal(
  firstDiagonal: string,
  secondDiagonal: string,
  firstDiagonalCoordinates: number[][],
  secondDiagonalCoordinates: number[][],
  stringToCheckPlayer: string,
) {
  const indexOfPatternInFirstDiagonal = firstDiagonal.indexOf(stringToCheckPlayer);
  const indexOfPatternInSecondDiagonal = secondDiagonal.indexOf(stringToCheckPlayer);

  return indexOfPatternInFirstDiagonal !== -1
    ? firstDiagonalCoordinates.splice(indexOfPatternInFirstDiagonal, stringToCheckPlayer.length)
    : secondDiagonalCoordinates.splice(indexOfPatternInSecondDiagonal, stringToCheckPlayer.length);
}
